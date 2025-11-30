import { StatsGrid } from './ui/StatsGrid';
import { LoansTable } from './ui/LoansTable';
import { useAuth } from '@/src/contexts/AuthContext';

export const DashboardView = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Meu Dashboard</h1>
          <p className="text-stone-500 text-sm mt-1">Bem-vindo de volta, {user?.name}!</p>
        </div>
        <button className="hidden sm:block px-5 py-2.5 bg-stone-900 text-white text-[13px] font-bold tracking-wide rounded-xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 hover:-translate-y-0.5">
          Gerar Relatório
        </button>
      </div>

      <StatsGrid userId={user?.id} />
      <LoansTable userId={user?.id} />
    </>
  );
};