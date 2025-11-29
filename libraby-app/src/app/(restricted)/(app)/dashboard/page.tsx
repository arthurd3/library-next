'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Clock, 
  AlertCircle, 
  Search, 
  Bell, 
  Menu,
  LogOut,
  ChevronRight,
  MoreVertical,
  type LucideIcon
} from 'lucide-react';

// --- MOCK DATA (Tipagem e Dados para simulação) ---

type LoanStatus = 'active' | 'overdue' | 'returned';

interface Loan {
  id: string;
  bookTitle: string;
  author: string;
  userName: string;
  userInitial: string;
  dueDate: string;
  status: LoanStatus;
}

const recentLoans: Loan[] = [
  { id: '1', bookTitle: 'Dom Casmurro', author: 'Machado de Assis', userName: 'Arthur Silva', userInitial: 'A', dueDate: '2023-11-30', status: 'active' },
  { id: '2', bookTitle: 'Clean Architecture', author: 'Robert C. Martin', userName: 'Maria Souza', userInitial: 'M', dueDate: '2023-11-25', status: 'overdue' },
  { id: '3', bookTitle: 'O Hobbit', author: 'J.R.R. Tolkien', userName: 'João Paulo', userInitial: 'J', dueDate: '2023-12-05', status: 'active' },
  { id: '4', bookTitle: 'Entendendo Algoritmos', author: 'Aditya Bhargava', userName: 'Ana Clara', userInitial: 'A', dueDate: '2023-11-10', status: 'returned' },
  { id: '5', bookTitle: 'Sapiens', author: 'Yuval Noah Harari', userName: 'Carlos Lima', userInitial: 'C', dueDate: '2023-11-28', status: 'active' },
];

// --- COMPONENTES AUXILIARES ---

const StatusBadge = ({ status }: { status: LoanStatus }) => {
  const styles = {
    active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    overdue: 'bg-rose-100 text-rose-800 border-rose-200',
    returned: 'bg-stone-100 text-stone-600 border-stone-200',
  };

  const labels = {
    active: 'Em dia',
    overdue: 'Atrasado',
    returned: 'Devolvido',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: LucideIcon, trend?: string }) => (
  <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-stone-500 uppercase tracking-wide">{title}</p>
      <h3 className="mt-2 text-3xl font-serif font-bold text-stone-800">{value}</h3>
      {trend && <p className="mt-1 text-xs text-stone-400">{trend}</p>}
    </div>
    <div className="p-3 bg-stone-50 rounded-lg text-stone-600">
      <Icon size={24} />
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-stone-900 text-stone-300 transition-all duration-300 flex-shrink-0 flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-stone-800">
          {sidebarOpen ? (
            <span className="text-xl font-serif font-bold text-white tracking-wider">BIBLIOTECA</span>
          ) : (
            <BookOpen className="text-white" />
          )}
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          {[
            { icon: BookOpen, label: 'Acervo', active: false },
            { icon: Clock, label: 'Empréstimos', active: true },
            { icon: Users, label: 'Leitores', active: false },
            { icon: AlertCircle, label: 'Pendências', active: false },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-stone-800 text-white shadow-lg shadow-stone-900/50 ring-1 ring-stone-700' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
           <button className="w-full flex items-center gap-3 px-3 py-2 text-stone-400 hover:text-white transition-colors">
              <LogOut size={20} />
              {sidebarOpen && <span className="text-sm">Sair</span>}
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col max-w-full overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center text-sm text-stone-400">
              <span>Biblioteca</span>
              <ChevronRight size={14} className="mx-2" />
              <span className="font-medium text-stone-800">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar livros, ISBN..." 
                className="pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 w-64"
              />
            </div>
            <button className="relative text-stone-500 hover:text-stone-800">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 bg-stone-200 rounded-full flex items-center justify-center text-stone-700 font-bold text-xs border border-stone-300">
              AS
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 overflow-auto p-8">
          
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-bold text-stone-800">Visão Geral</h1>
            <p className="text-stone-500 text-sm mt-1">Status do acervo em 29 de Novembro, 2025</p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total no Acervo" value="12,450" icon={BookOpen} trend="+15 novos esta semana" />
            <StatCard title="Empréstimos Ativos" value="342" icon={Clock} trend="85% dentro do prazo" />
            <StatCard title="Leitores Cadastrados" value="2,890" icon={Users} trend="+5 novos hoje" />
            <StatCard title="Atrasos Críticos" value="18" icon={AlertCircle} trend="Ação necessária" />
          </div>

          {/* RECENT LOANS TABLE */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-stone-800">Movimentações Recentes</h2>
              <button className="text-sm font-medium text-stone-600 hover:text-stone-900">Ver todos</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 font-semibold">Livro</th>
                    <th className="px-6 py-3 font-semibold">Leitor</th>
                    <th className="px-6 py-3 font-semibold">Vencimento</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-stone-800">{loan.bookTitle}</span>
                          <span className="text-xs text-stone-500">{loan.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                              {loan.userInitial}
                            </div>
                            <span className="text-sm text-stone-700">{loan.userName}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-stone-600">{loan.dueDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={loan.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-stone-400 hover:text-stone-600">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}