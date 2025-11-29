'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from './models/authContextType';
import { User } from '../models/UserModel';
import { AuthProviderProps } from './models/authProviderProps';

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


  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email === 'admin@gmail.com' && password === '123456') {
        const mockUser: User = {
          id: 1,
          name: 'Arthur Silva',
          email: 'admin@gmail.com',
          registration: '2023001',
          role: 'user',
          created_at: new Date(),
        };
        setUser(mockUser);
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
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};