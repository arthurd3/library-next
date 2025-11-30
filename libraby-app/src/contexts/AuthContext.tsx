'use client';

import { createContext, useContext, useState} from 'react';
import { AuthContextType } from './models/authContextType';
import { User } from '../models/UserModel';
import { AuthProviderProps } from './models/authProviderProps';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//PRECISA PASSAR NO AUTH PROVIDER
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email === 'admin@gmail.com' && password === '123456') {
        const mockUser: User = {
          id: 1,
          name: 'Arthur Silva',
          email: 'admin@gmail.com',
          registration: '2023001',
          role: 'admin',
          created_at: new Date(),
        };
        setUser(mockUser);

        // ROLE NO COOKIE -> 24H
        document.cookie = `user_role=${mockUser.role}; path=/; max-age=86400`; 
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};