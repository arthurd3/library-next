import { UserService } from '@/src/db';

export async function removeUser(id: number) {
  try {
    // Verificar se usuário existe
    const existingUser = await UserService.getUserById(id);
    if (!existingUser) {
      return { success: false, error: 'Usuário não encontrado' };
    }

    // Remover usuário
    const deleted = await UserService.deleteUser(id);

    if (!deleted) {
      return { success: false, error: 'Falha ao remover usuário' };
    }

    return { success: true, message: 'Usuário removido com sucesso' };
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}