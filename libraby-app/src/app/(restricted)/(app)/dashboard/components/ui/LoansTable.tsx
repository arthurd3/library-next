import { MoreVertical } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

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

export const LoansTable = () => (
  <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
    <div className="px-8 py-6 border-b border-stone-50 flex items-center justify-between">
      <h2 className="text-lg font-bold text-stone-900 tracking-tight">Movimentações Recentes</h2>
      <button className="text-xs font-bold text-stone-500 hover:text-stone-900 uppercase tracking-widest hover:underline decoration-stone-300 underline-offset-4 transition-all">Ver histórico</button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-stone-50/80 text-stone-400 text-[11px] font-bold uppercase tracking-widest border-b border-stone-100">
            <th className="px-8 py-5">Livro</th>
            <th className="px-8 py-5">Leitor</th>
            <th className="px-8 py-5">Vencimento</th>
            <th className="px-8 py-5">Status</th>
            <th className="px-8 py-5 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {recentLoans.map((loan) => (
            <tr key={loan.id} className="group hover:bg-stone-50 transition-colors duration-200">
              <td className="px-8 py-5">
                <div className="flex flex-col">
                  <span className="font-bold text-stone-800 text-sm group-hover:text-stone-900">{loan.bookTitle}</span>
                  <span className="text-xs text-stone-400 font-medium mt-1">{loan.author}</span>
                </div>
              </td>
              <td className="px-8 py-5">
                 <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-white border border-stone-100 flex items-center justify-center text-xs font-bold text-stone-600 shadow-sm">
                      {loan.userInitial}
                    </div>
                    <span className="text-sm font-semibold text-stone-600">{loan.userName}</span>
                 </div>
              </td>
              <td className="px-8 py-5">
                <span className="text-sm font-medium text-stone-500 tabular-nums tracking-tight">{loan.dueDate}</span>
              </td>
              <td className="px-8 py-5">
                <StatusBadge status={loan.status} />
              </td>
              <td className="px-8 py-5 text-right">
                <button className="p-2 text-stone-300 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-all">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);