'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode,
  allowedRoles?: string[];
}

const FALLBACK_PATH = '/login';

export const AuthGuard = ({
  children,
  allowedRoles = ['admin', 'librarian', 'user']
}: AuthGuardProps) => {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (!user) {
      router.replace(FALLBACK_PATH);
      return;
    }

    const hasRole = allowedRoles.includes(user.role);

    if (!hasRole) {
      router.replace('/unauthorized');
      return;
    }
    
  }, [user, router, allowedRoles]);

  return <>{children}</>;
};