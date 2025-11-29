import { User } from "../../models/UserModel";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export type { AuthContextType };