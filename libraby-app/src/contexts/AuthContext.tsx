'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from './models/authContextType';
import { User } from '../models/UserModel'; 
import { AuthProviderProps } from './models/authProviderProps';
import { useRouter } from 'next/navigation';
import { findUserById, loginFunction } from '../lib/actions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const hasRoleCookie = document.cookie.split(';').some((item) => item.trim().startsWith('user_role='));
        const hasIdCookie = document.cookie.split(';').some((item) => item.trim().startsWith('user_id='));
        if (hasRoleCookie && hasIdCookie) {
            const userId = parseInt(document.cookie.split('; ').find(row => row.startsWith('user_id='))!.split('=')[1]);

            findUserById(userId).then((userData => {
                if(userData.user){
                    setUser(userData.user);
                }
            }));
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true); 
    try {
        loginFunction(email, password).then((response) => {
            if (response.success && response.user) {
            setUser(response.user);

            document.cookie = `user_role=${response.user.role}; path=/`;
            document.cookie = `user_name=${response.user.name}; path=/`;
            document.cookie = `user_id=${response.user.id}; path=/`;
            document.cookie = `user_email=${response.user.email}; path=/`;

            return Promise.resolve(true);
            } 
        });
        return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};