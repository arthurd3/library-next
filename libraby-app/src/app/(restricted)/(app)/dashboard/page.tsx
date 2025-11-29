'use client';

import { useState } from 'react';
import { Sidebar } from '../../../../shared/components/Sidebar';
import { Topbar } from '../../../../shared/components/Topbar';
import { StatsGrid } from './components/StatsGrid';
import { LoansTable } from './components/LoansTable';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex font-sans text-stone-800">
      <Sidebar sidebarOpen={sidebarOpen} />

      <main className="flex-1 flex flex-col max-w-full overflow-hidden h-screen">
        <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Visão Geral</h1>
            </div>
            <button className="hidden sm:block px-5 py-2.5 bg-stone-900 text-white text-[13px] font-bold tracking-wide rounded-xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 hover:-translate-y-0.5">
              Gerar Relatório
            </button>
          </div>

          <StatsGrid />
          <LoansTable />
        </div>
      </main>
    </div>
  );
}