import { UserService } from '@/src/db';

export async function findUserById(id: number) {
  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      return { success: false, error: 'Usuário não encontrado' };
    }
    return { success: true, user };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return { success: false, error: 'Usuário não encontrado' };
    }
    return { success: true, user };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function findUserByRegistration(registration: string) {
  try {
    const user = await UserService.getUserByRegistration(registration);
    if (!user) {
      return { success: false, error: 'Usuário não encontrado' };
    }
    return { success: true, user };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function findAllUsers() {
  try {
    const users = await UserService.getAllUsers();
    return { success: true, users };
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}