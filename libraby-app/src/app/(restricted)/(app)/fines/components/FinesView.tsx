import { useState, useEffect } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { getFinesForTable, FineForTable } from '@/src/lib/actions/services/finesService';

const StatusBadge = ({ status }: { status: 'pending' | 'paid' }) => {
  const styles = {
    pending: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-100',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-100',
  };
  const labels = { pending: 'Pendente', paid: 'Pago' };

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export const FinesView = () => {
  const { user } = useAuth();
  const [fines, setFines] = useState<FineForTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFines = async () => {
      if (!user?.id) return;

      try {
        const data = await getFinesForTable(user.id);
        setFines(data);
      } catch (error) {
        console.error('Erro ao buscar multas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFines();
  }, [user?.id]);

  if (loading) {
    return (
      <>
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Multas</h1>
          <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Histórico de multas por atraso</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-stone-50">
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">Multas Pendentes e Pagas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50/80 text-stone-400 text-[11px] font-bold uppercase tracking-widest border-b border-stone-100">
                  <th className="px-8 py-5">Livro</th>
                  <th className="px-8 py-5">Valor</th>
                  <th className="px-8 py-5">Data do Atraso</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="group animate-pulse">
                    <td className="px-8 py-5">
                      <div className="h-4 bg-stone-200 rounded"></div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="h-4 bg-stone-200 rounded w-16"></div>
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
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Multas</h1>
        <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Histórico de multas por atraso</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-50">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Multas Pendentes e Pagas</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/80 text-stone-400 text-[11px] font-bold uppercase tracking-widest border-b border-stone-100">
                <th className="px-8 py-5">Livro</th>
                <th className="px-8 py-5">Valor</th>
                <th className="px-8 py-5">Data do Atraso</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {fines.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-stone-500">
                    Nenhuma multa encontrada.
                  </td>
                </tr>
              ) : (
                fines.map((fine) => (
                  <tr key={fine.id} className="group hover:bg-stone-50 transition-colors duration-200">
                    <td className="px-8 py-5">
                      <span className="font-bold text-stone-800 text-sm group-hover:text-stone-900">{fine.bookTitle}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-stone-500 tabular-nums tracking-tight">{fine.amount}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-stone-500 tabular-nums tracking-tight">{fine.dueDate}</span>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={fine.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      {fine.status === 'pending' && (
                        <button className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-lg transition-all">
                          Pagar
                        </button>
                      )}
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