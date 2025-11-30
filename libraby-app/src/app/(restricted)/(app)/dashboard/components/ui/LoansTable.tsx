import { MoreVertical, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { getLoansForTable, LoanForTable } from '@/src/lib/actions/services/loanTable';
import { returnBook } from '@/src/lib/actions/returnBook';
import { useAuth } from '@/src/contexts/AuthContext';

interface LoansTableProps {
  userId?: number;
}

export const LoansTable = ({ userId }: LoansTableProps) => {
  const [loans, setLoans] = useState<LoanForTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getLoansForTable(10, userId);
        setLoans(data);
      } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [userId]);

  const handleReturnBook = async (loanId: number) => {
    if (!user?.id) return;

    const formData = new FormData();
    formData.append('loanId', loanId.toString());
    formData.append('userId', user.id.toString());

    const result = await returnBook(formData);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Recarregar empréstimos
      const data = await getLoansForTable(10, userId);
      setLoans(data);
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setOpenDropdown(null);

    // Limpar mensagem após 3 segundos
    setTimeout(() => setMessage(null), 3000);
  };

  const toggleDropdown = (loanId: number) => {
    setOpenDropdown(openDropdown === loanId ? null : loanId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Meus Empréstimos</h2>
          <button className="text-xs font-bold text-stone-500 hover:text-stone-900 uppercase tracking-widest hover:underline decoration-stone-300 underline-offset-4 transition-all">Ver histórico</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/80 text-stone-400 text-[11px] font-bold uppercase tracking-widest border-b border-stone-100">
                <th className="px-8 py-5">Livro</th>
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
    <>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Meus Empréstimos</h2>
          <button className="text-xs font-bold text-stone-500 hover:text-stone-900 uppercase tracking-widest hover:underline decoration-stone-300 underline-offset-4 transition-all">Ver histórico</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/80 text-stone-400 text-[11px] font-bold uppercase tracking-widest border-b border-stone-100">
                <th className="px-8 py-5">Livro</th>
                <th className="px-8 py-5">Vencimento</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {loans.map((loan: LoanForTable) => (
                <tr key={loan.id} className="group hover:bg-stone-50 transition-colors duration-200">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-stone-800 text-sm group-hover:text-stone-900">{loan.bookTitle}</span>
                      <span className="text-xs text-stone-400 font-medium mt-1">{loan.author}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-stone-500 tabular-nums tracking-tight">{loan.dueDate}</span>
                  </td>
                  <td className="px-8 py-5">
                    <StatusBadge status={loan.status} />
                  </td>
                  <td className="px-8 py-5 text-right relative">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(loan.id)}
                        className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-all duration-200"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openDropdown === loan.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-stone-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleReturnBook(loan.id)}
                            disabled={loan.status === 'returned'}
                            className="w-full px-4 py-3 text-left text-sm text-stone-700 hover:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                          >
                            <RotateCcw size={16} />
                            {loan.status === 'returned' ? 'Já devolvido' : 'Devolver livro'}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};