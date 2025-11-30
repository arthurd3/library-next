
import { UserDao } from '@/src/db';
import { User } from '@/src/models/UserModel';

export async function loginFunction(email: string, password: string): Promise<{ success: boolean; user?: Omit<User, 'password'>; message?: string }> {
  try {

    const user = await UserDao.getUserByEmail(email);
    
    if (!user) {
      return { success: false, message: 'Usuário não encontrado' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Senha incorreta' };
    }

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };

  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, message: 'Erro interno do servidor' };
  }
}