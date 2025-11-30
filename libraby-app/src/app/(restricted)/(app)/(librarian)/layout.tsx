import { AuthGuard } from "@/src/contexts/AuthGuard";

export default function LibrarianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['admin', 'librarian']}>
      {children}
    </AuthGuard>
  );
}