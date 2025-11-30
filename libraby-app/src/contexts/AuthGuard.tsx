'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const FALLBACK_PATH = '/login';

export const AuthGuard = ({
  children,
  allowedRoles = ['admin', 'librarian', 'user']
}: AuthGuardProps) => {

  const { user, isLoading } = useAuth(); 
  const router = useRouter();

  const hasUser = !!user;

  const hasPermission = user && 
    allowedRoles.includes(user.role) || 
    user?.role !== undefined || 
    user?.role !== null || 
    user?.role !== '' || 
    user?.role !== ' ';

  const canShowContent = !isLoading && hasUser && hasPermission;

  useEffect(() => {
    if (!isLoading) {
      if (!hasUser) {
        router.replace(FALLBACK_PATH);
      } else if (!hasPermission) {
        router.replace('/unauthorized');
      }
    }
  }, [isLoading, hasUser, hasPermission, router]);

  if (isLoading) {
    return null; 
  }

  if (!canShowContent) {
    return null;
  }

  return <>{children}</>;
};