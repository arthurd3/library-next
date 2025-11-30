import { AuthGuard } from '../../../contexts/AuthGuard';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard> {children} </AuthGuard>;
}