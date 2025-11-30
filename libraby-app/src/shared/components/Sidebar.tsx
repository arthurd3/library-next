'use client';

import { BookOpen, Clock, Users, AlertCircle, LogOut, LayoutDashboard, UserSearch, UserSquare2Icon, UserPlus2, BookmarkCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  sidebarOpen: boolean;
}

export const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const userRole = useAuth().user?.role;

  function containsPermissionAdmin(){
      if(userRole === 'admin'){
        return true;
      }
      return false;
  }

  function containsPermissionLibrarian(){
      if(userRole === 'librarian' || userRole === 'admin'){
        return true;
      }
      return false;
  }


  return (
  <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-stone-900 text-stone-400 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] flex-shrink-0 flex flex-col shadow-2xl z-20`}>
    <div className="h-24 flex items-center justify-center border-b border-stone-800/40">
      {sidebarOpen ? (
        <span className="text-lg font-bold text-white tracking-widest uppercase">Acervo Digital</span>
      ) : (
        <BookOpen className="text-white opacity-90" size={24} />
      )}
    </div>

    <nav className="flex-1 py-8 space-y-1.5 px-3">
      {[
        { icon: BookOpen, label: 'Acervo', href: '/collection' },
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: Clock, label: 'Empréstimos', href: '/mybooks' },
        { icon: AlertCircle, label: 'Multas', href: '/fines' },
        
        { icon: Users, label: 'Perfil', href: '/profile' },
        
        // Librarian Links
        ...(containsPermissionLibrarian() ? [
          { icon: BookmarkCheckIcon, label: 'Gerenciar Livros', href: '/manage-books' }
        ] : []),
        
        // Admin Links
        ...(containsPermissionAdmin() ? [
          { icon: UserSquare2Icon, label: 'Painel Admin', href: '/restricted/admin-dashboard' } , 
          { icon: UserPlus2, label: 'Register User', href: '/restricted/register-user' }
        ] : []),
        
        
      ].map((item, idx) => {
        const active = pathname === item.href;
        return (
        <Link key={idx} href={item.href}>
          <button
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
              active 
                ? 'bg-stone-800 text-white shadow-lg shadow-stone-950/30' 
                : 'hover:bg-stone-800/40 hover:text-stone-200'
            }`}
          >
            <item.icon size={20} className={active ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'} />
            {sidebarOpen && <span className="text-[13px] font-bold tracking-wide">{item.label}</span>}
          </button>
        </Link>
        );
      })}
    </nav>

    <div className="p-4 border-t border-stone-800/40">
       <button 
         onClick={() => { logout(); router.push('/login'); }}
         className="w-full flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-white hover:bg-stone-800 rounded-2xl transition-all"
       >
          <LogOut size={18} />
          {sidebarOpen && <span className="text-[13px] font-bold">Sair</span>}
       </button>
    </div>
  </aside>
  );
};