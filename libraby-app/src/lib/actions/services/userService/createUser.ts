import { UserService } from '@/src/db';

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
    // Verificar se usuário já existe
    const existingUser = await UserService.getUserByEmail(params.email);
    if (existingUser) {
      throw new Error('Usuário com este email já existe');
    }

    const existingRegistration = await UserService.getUserByRegistration(params.registration);
    if (existingRegistration) {
      throw new Error('Usuário com esta matrícula já existe');
    }

    // Criar usuário
    const newUser = await UserService.createUser(
      params.name,
      params.email,
      params.registration,
      params.password,
      params.phone,
      params.address,
      params.roleId || 3 // Default para usuário comum
    );

    return { success: true, user: newUser };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}