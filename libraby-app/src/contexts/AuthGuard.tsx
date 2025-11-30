'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const AuthGuard = ({ 
  children, 
  allowedRoles = ['admin', 'librarian', 'user']
}: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // 1. Cálculos lógicos (instantâneos)
  const isUserLoggedIn = !!user;
  // Se user for null, assumimos false para role check para evitar erro de acesso a propriedade
  const hasPermission = user && allowedRoles.includes(user.role);
  
  // Combinação final: Está pronto E tem acesso?
  const canRender = !isLoading && isUserLoggedIn && hasPermission;

  // 2. Efeito colateral: Redirecionamento
  useEffect(() => {
    // Só tomamos decisão quando o loading terminar
    if (!isLoading) {
      if (!isUserLoggedIn) {
        router.replace('/login'); // Redireciona para login
      } else if (!hasPermission) {
        router.replace('/unauthorized'); // Redireciona para erro 403
      }
    }
  }, [isLoading, isUserLoggedIn, hasPermission, router]);

  // 3. BLOQUEIO DE RENDERIZAÇÃO (Aqui resolve o seu problema)
  
  // Se ainda estiver carregando, mostre um Spinner ou nada.
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>; 
    // ou return null;
  }

  // Se terminou de carregar MAS não tem permissão:
  // Retornamos NULL. Isso segura a tela em branco pelos milissegundos
  // que o router.replace demora para acontecer.
  if (!canRender) {
    return null;
  }

  // Só renderiza o conteúdo se tiver CERTEZA ABSOLUTA que pode.
  return <>{children}</>;
};