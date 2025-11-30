
import { UserService } from '@/src/db';

export async function loginFunction(email: string, password: string): Promise<{ success: boolean; user?: any; message?: string }> {
  try {
    // Buscar usuário por email
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return { success: false, message: 'Usuário não encontrado' };
    }

    // Verificar senha (em produção, use bcrypt para comparar hash)
    // Por enquanto, verificação simples
    if (user.password !== password) {
      return { success: false, message: 'Senha incorreta' };
    }

    // Retornar sucesso com dados do usuário (sem senha)
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, message: 'Erro interno do servidor' };
  }
}