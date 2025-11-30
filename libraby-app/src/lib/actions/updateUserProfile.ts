'use server';

import { UserDao } from '@/src/db';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(formData: FormData) {
  try {
    const userId = parseInt(formData.get('userId') as string);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    // Validações básicas
    if (!name || !email) {
      return { success: false, message: 'Nome e email são obrigatórios' };
    }

    // Buscar usuário atual para obter a registration
    const currentUser = await UserDao.getUserById(userId);
    if (!currentUser) {
      return { success: false, message: 'Usuário não encontrado' };
    }

    // Verificar se o email já existe para outro usuário
    const existingUser = await UserDao.getUserByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      return { success: false, message: 'Este email já está em uso' };
    }

    // Atualizar o usuário (mantendo a registration original)
    await UserDao.updateUser(userId, name, email, currentUser.registration, phone, address);

    revalidatePath('/profile');

    return { success: true, message: 'Perfil atualizado com sucesso!' };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { success: false, message: 'Erro ao atualizar perfil' };
  }
}