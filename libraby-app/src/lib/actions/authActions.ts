'use server';

import { UserDao } from '@/src/db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function loginAction(email: string, password: string) {
  try {
    const user = await UserDao.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Usuário não encontrado' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Senha incorreta' };
    }

    const { password: _, ...userWithoutPassword } = user;

    // Set cookies for session management
    const cookieStore = await cookies();
    cookieStore.set('user_role', user.role);
    cookieStore.set('user_name', user.name);
    cookieStore.set('user_id', user.id.toString());
    cookieStore.set('user_email', user.email);

    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, message: 'Erro interno do servidor' };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('user_role');
    cookieStore.delete('user_name');
    cookieStore.delete('user_id');
    cookieStore.delete('user_email');
  } catch (error) {
    console.error('Erro no logout:', error);
  }
  redirect('/');
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value;

    if (!userId) {
      return null;
    }

    const user = await UserDao.getUserById(parseInt(userId));
    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    return null;
  }
}