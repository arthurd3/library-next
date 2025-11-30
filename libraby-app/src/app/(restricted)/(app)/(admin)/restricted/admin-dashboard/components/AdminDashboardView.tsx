import { AdminStatsGrid } from './ui/AdminStatsGrid';
import { RecentActivity } from './ui/RecentActivity';
import { UserManagement } from './ui/UserManagement';
import { BookManagement } from './ui/BookManagement';

export const AdminDashboardView = () => (
  <>
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Painel Administrativo</h1>
        <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Gerencie usuários, livros e empréstimos</p>
      </div>
      <div className="flex gap-3">
        <button className="hidden sm:block px-5 py-2.5 bg-stone-700 text-white text-[13px] font-bold tracking-wide rounded-xl hover:bg-stone-600 transition-all shadow-xl shadow-stone-900/10 hover:-translate-y-0.5">
          Exportar Dados
        </button>
        <button className="hidden sm:block px-5 py-2.5 bg-stone-900 text-white text-[13px] font-bold tracking-wide rounded-xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 hover:-translate-y-0.5">
          Gerar Relatório
        </button>
      </div>
    </div>

    <AdminStatsGrid />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <RecentActivity />
      <UserManagement />
    </div>
    <BookManagement />
  </>
);