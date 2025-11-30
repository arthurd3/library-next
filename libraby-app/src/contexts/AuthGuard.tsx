'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string | string[];
}

const fallbackPath = '/';

export const AuthGuard = ({ 
  children, 
  allowedRoles = ['admin', 'librarian', 'user']
}: AuthGuardProps) => {

  const { user , logout} = useAuth();
  const router = useRouter();

  const hasAccess = () => {
    if (!user) return false;
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    return roles.includes(user.role);
  };

  useEffect(() => {

    if (user === null) {
      return;
    }

    if (!hasAccess()) {
      logout();
      router.push(fallbackPath);
    }

  }, [user, router, allowedRoles]);


  //SETA UM LOADING ENQUANTO VERIFICA AS PERMISSOES
  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Carregando...</p>
        </div>
      </div>
    );
  }

  //SE NAO TEM ACESSO NAO RENDERIZA NADA
  if (!hasAccess()) {
    return null;
  }

  return <>{children}</>;
};



