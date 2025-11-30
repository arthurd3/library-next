import { MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { getLoansForTable, LoanForTable } from '@/src/lib/actions/services/loanTable';

export const LoansTable = () => {
  const [loans, setLoans] = useState<LoanForTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getLoansForTable(10);
        setLoans(data);
      } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
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
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="group animate-pulse">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <div className="h-4 bg-stone-200 rounded mb-1"></div>
                      <div className="h-3 bg-stone-200 rounded w-2/3"></div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-stone-200"></div>
                      <div className="h-4 bg-stone-200 rounded w-20"></div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-4 bg-stone-200 rounded w-16"></div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-6 bg-stone-200 rounded w-20"></div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="h-8 w-8 bg-stone-200 rounded ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
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
          {loans.map((loan) => (
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
};