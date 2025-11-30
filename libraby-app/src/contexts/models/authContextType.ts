import { User } from "@/src/models/UserModel";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean; // <--- ADICIONE ISSO
}

export type { AuthContextType };