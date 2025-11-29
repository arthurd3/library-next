'use client';

import { useState } from 'react';
import { Sidebar } from '../../../../shared/components/Sidebar';
import { Topbar } from '../../../../shared/components/Topbar';

type LoanStatus = 'active' | 'overdue' | 'returned';

const myBooks = [
  { id: '1', bookTitle: 'Dom Casmurro', author: 'Machado de Assis', dueDate: '2023-11-30', status: 'active' as LoanStatus },
  { id: '2', bookTitle: 'Clean Architecture', author: 'Robert C. Martin', dueDate: '2023-11-25', status: 'overdue' as LoanStatus },
  { id: '3', bookTitle: 'O Hobbit', author: 'J.R.R. Tolkien', dueDate: '2023-12-05', status: 'active' as LoanStatus },
];

const StatusBadge = ({ status }: { status: LoanStatus }) => {
  const styles = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-100',
    overdue: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-100',
    returned: 'bg-stone-100 text-stone-600 border-stone-200 ring-1 ring-stone-200',
  };
  const labels = { active: 'Em dia', overdue: 'Atrasado', returned: 'Devolvido' };

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function MyBooks() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex font-sans text-stone-800">
      <Sidebar sidebarOpen={sidebarOpen} />

      <main className="flex-1 flex flex-col max-w-full overflow-hidden h-screen">
        <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Meus Livros</h1>
            <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Livros emprestados atualmente</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
            <div className="px-8 py-6 border-b border-stone-50">
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">Empréstimos Ativos</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-stone-50/80 text-stone-400 text-[11px] font-bold uppercase tracking-widest border-b border-stone-100">
                    <th className="px-8 py-5">Livro</th>
                    <th className="px-8 py-5">Autor</th>
                    <th className="px-8 py-5">Vencimento</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {myBooks.map((book) => (
                    <tr key={book.id} className="group hover:bg-stone-50 transition-colors duration-200">
                      <td className="px-8 py-5">
                        <span className="font-bold text-stone-800 text-sm group-hover:text-stone-900">{book.bookTitle}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-stone-400 font-medium">{book.author}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-medium text-stone-500 tabular-nums tracking-tight">{book.dueDate}</span>
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={book.status} />
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-lg transition-all">
                          Renovar
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