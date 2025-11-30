import { useState, useEffect } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { getLoansForUser, LoanForTable } from '@/src/lib/actions/services/loanTable';

type LoanStatus = 'active' | 'overdue' | 'returned';

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

export const MyBooksView = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<LoanForTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      if (!user?.id) return;

      try {
        const data = await getLoansForUser(user.id);
        setLoans(data);
      } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user?.id]);

  if (loading) {
    return (
      <>
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
                {Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="group animate-pulse">
                    <td className="px-8 py-5">
                      <div className="h-4 bg-stone-200 rounded"></div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="h-3 bg-stone-200 rounded w-2/3"></div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="h-4 bg-stone-200 rounded w-20"></div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="h-6 bg-stone-200 rounded w-16"></div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="h-8 bg-stone-200 rounded w-16 ml-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
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
              {loans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-stone-500">
                    Nenhum empréstimo ativo encontrado.
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.id} className="group hover:bg-stone-50 transition-colors duration-200">
                    <td className="px-8 py-5">
                      <span className="font-bold text-stone-800 text-sm group-hover:text-stone-900">{loan.bookTitle}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-stone-400 font-medium">{loan.author}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-stone-500 tabular-nums tracking-tight">{loan.dueDate}</span>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={loan.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-lg transition-all">
                        Renovar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};