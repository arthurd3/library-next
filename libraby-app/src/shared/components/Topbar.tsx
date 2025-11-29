import { Search, Bell, Menu, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface TopbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Topbar = ({ sidebarOpen, onToggleSidebar }: TopbarProps) => {
  const pathname = usePathname();

  let pageName = 'Dashboard';
  if (pathname === '/collection') pageName = 'Acervo';
  else if (pathname === '/mybooks') pageName = 'Meus Livros';
  else if (pathname === '/profile') pageName = 'Perfil';
  else if (pathname === '/fines') pageName = 'Multas';

  return (
  <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 flex items-center justify-between px-8 shadow-sm z-10 flex-shrink-0 sticky top-0">
    <div className="flex items-center gap-5">
      <button onClick={onToggleSidebar} className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-50 rounded-xl transition-colors">
        <Menu size={20} />
      </button>
      <div className="hidden md:flex items-center text-xs font-bold tracking-wide text-stone-400 uppercase">
        <span>Biblioteca</span>
        <ChevronRight size={12} className="mx-2 text-stone-300" />
        <span className="text-stone-800 bg-stone-50 px-2.5 py-1 rounded border border-stone-100">{pageName}</span>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="relative hidden lg:block group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-600 transition-colors" size={16} />
        <input 
          type="text" 
          placeholder="Buscar livros..." 
          className="pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-full text-sm w-64 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-100 focus:border-stone-300 transition-all duration-200 font-medium placeholder-stone-400"
        />
      </div>
      <div className="flex items-center gap-4 pl-4 border-l border-stone-100">
        <button className="relative p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-50 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>
        <div className="h-10 w-10 bg-gradient-to-br from-stone-100 to-stone-200 rounded-full flex items-center justify-center text-stone-700 font-bold text-xs border border-white shadow-md">
          AS
        </div>
      </div>
    </div>
  </header>
  );
};