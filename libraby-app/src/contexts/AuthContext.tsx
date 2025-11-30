'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from './models/authContextType';
import { User } from '../models/UserModel';
import { AuthProviderProps } from './models/authProviderProps';
import { useRouter } from 'next/navigation';
import { loginAction, logoutAction, getCurrentUser } from '../lib/actions/authActions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await loginAction(email, password);
      
      if (response.success && response.user) {
        setUser(response.user);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutAction();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};