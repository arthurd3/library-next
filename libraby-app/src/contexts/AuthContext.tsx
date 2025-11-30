'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from './models/authContextType';
import { User } from '../models/UserModel'; 
import { AuthProviderProps } from './models/authProviderProps';
import { useRouter } from 'next/navigation';

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

        if (hasRoleCookie) {
          const recoveredUser: User = {
            id: 1,
            name: 'Arthur Silva',
            email: 'admin@gmail.com',
            registration: '2023001',
            role: 'user', 
            created_at: new Date(),
          };
          setUser(recoveredUser);
        }
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
      } finally {
       
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true); 
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

        document.cookie = `user_role=${mockUser.role}; path=/; max-age=86400`; 
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
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