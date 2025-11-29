import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface LayoutProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  children: ReactNode;
}

export const Layout = ({ sidebarOpen, onToggleSidebar, children }: LayoutProps) => (
  <div className="min-h-screen bg-[#FAFAF9] flex font-sans text-stone-800">
    <Sidebar sidebarOpen={sidebarOpen} />

    <main className="flex-1 flex flex-col max-w-full overflow-hidden h-screen">
      <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar} />

      <div className="flex-1 overflow-auto p-6 lg:p-10">
        {children}
      </div>
    </main>
  </div>
);