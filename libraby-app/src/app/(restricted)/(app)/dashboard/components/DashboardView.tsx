import { StatsGrid } from './ui/StatsGrid';
import { LoansTable } from './ui/LoansTable';

export const DashboardView = () => (
  <>
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
  </>
);