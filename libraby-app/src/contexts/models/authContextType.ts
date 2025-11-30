import { User } from "@/src/models/UserModel";

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export type { AuthContextType };