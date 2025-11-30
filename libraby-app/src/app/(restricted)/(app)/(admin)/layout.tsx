import { AuthGuard } from "@/src/contexts/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles="admin">
      {children}
    </AuthGuard>
  );
}