import { UserService } from '@/src/db';

interface UpdateUserParams {
  id: number;
  name: string;
  email: string;
  registration: string;
  phone?: string;
  address?: string;
}

export async function updateUser(params: UpdateUserParams) {
  try {
    // Verificar se usuário existe
    const existingUser = await UserService.getUserById(params.id);
    if (!existingUser) {
      return { success: false, error: 'Usuário não encontrado' };
    }

    // Verificar se email já está sendo usado por outro usuário
    if (params.email !== existingUser.email) {
      const userWithEmail = await UserService.getUserByEmail(params.email);
      if (userWithEmail) {
        return { success: false, error: 'Email já está sendo usado por outro usuário' };
      }
    }

    // Verificar se matrícula já está sendo usada por outro usuário
    if (params.registration !== existingUser.registration) {
      const userWithRegistration = await UserService.getUserByRegistration(params.registration);
      if (userWithRegistration) {
        return { success: false, error: 'Matrícula já está sendo usada por outro usuário' };
      }
    }

    // Atualizar usuário
    const updatedUser = await UserService.updateUser(
      params.id,
      params.name,
      params.email,
      params.registration,
      params.phone,
      params.address
    );

    if (!updatedUser) {
      return { success: false, error: 'Falha ao atualizar usuário' };
    }

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}