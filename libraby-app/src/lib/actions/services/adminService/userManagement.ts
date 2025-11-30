'use server';

import { UserDao } from '@/src/db/userdb';

export interface UserForManagement {
  id: number;
  name: string;
  email: string;
  registration: string;
  role: string;
  joinDate: string;
  status: 'active' | 'suspended';
}

export async function getUsersForManagement(limit: number = 10): Promise<UserForManagement[]> {
  try {
    const users = await UserDao.getUsersWithRoles(limit);

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      registration: user.registration,
      role: user.role_name || 'user',
      joinDate: new Date(user.created_at).toISOString().split('T')[0],
      status: 'active' as const, // Temporário
    }));
  } catch (error) {
    console.error('Erro ao buscar usuários para gerenciamento:', error);
    throw error;
  }
}