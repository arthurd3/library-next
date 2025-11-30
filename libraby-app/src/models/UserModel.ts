interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  registration: string;
  phone?: string;
  address?: string;
  role: string;
  created_at: Date;
}

export type { User };