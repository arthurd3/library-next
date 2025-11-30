import { UserDao } from '@/src/db';

interface RegisterUserParams {
  name: string;
  email: string;
  registration: string;
  password: string;
  phone?: string;
  address?: string;
}

export async function registerUser(params: RegisterUserParams) {
  try {
    
    const existingUser = await UserDao.getUserByEmail(params.email);
    if (existingUser) {
      return { success: false, error: 'Usuário com este email já existe' };
    }

    const existingRegistration = await UserDao.getUserByRegistration(params.registration);
    if (existingRegistration) {
      return { success: false, error: 'Usuário com esta matrícula já existe' };
    }

    const newUser = await UserDao.createUser(
      params.name,
      params.email,
      params.registration,
      params.password,
      params.phone,
      params.address
    );

    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Erro no registro:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}