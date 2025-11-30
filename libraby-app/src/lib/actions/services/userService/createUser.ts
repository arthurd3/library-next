'use server';

import { UserDao } from '@/src/db';

interface CreateUserParams {
  name: string;
  email: string;
  registration: string;
  password: string;
  phone?: string;
  address?: string;
  roleId?: number;
}

export async function createUser(params: CreateUserParams) {
  try {

    const existingUser = await UserDao.getUserByEmail(params.email);
    if (existingUser) {
      throw new Error('Usuário com este email já existe');
    }

    const existingRegistration = await UserDao.getUserByRegistration(params.registration);
    if (existingRegistration) {
      throw new Error('Usuário com esta matrícula já existe');
    }

    const newUser = await UserDao.createUser(
      params.name,
      params.email,
      params.password,
      params.registration,
      params.phone,
      params.address,
      params.roleId || 3 
    );

    return { success: true, user: newUser };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}