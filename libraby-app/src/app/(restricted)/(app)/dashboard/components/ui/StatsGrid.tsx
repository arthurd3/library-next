import { BookOpen, Clock, AlertCircle, Book } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { getUserStats, UserStats } from '@/src/lib/actions/services/userStats';

interface StatsGridProps {
  userId?: number;
}

export const StatsGrid = ({ userId }: StatsGridProps) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserStats(userId);
        setStats(data);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-stone-200 rounded w-24"></div>
                <div className="h-8 w-8 bg-stone-200 rounded"></div>
              </div>
              <div className="h-8 bg-stone-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-stone-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return <div>Erro ao carregar estatísticas</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      <StatCard title="Meus Empréstimos Ativos" value={stats.activeLoans.toString()} icon={Clock} trend="Em andamento" />
      <StatCard title="Livros Já Lidos" value={stats.booksAcquired.toString()} icon={Book} trend="Histórico completo" />
      <StatCard title="Empréstimos Atrasados" value={stats.overdueLoans.toString()} icon={AlertCircle} trend={stats.overdueLoans > 0 ? "Ação necessária" : "Tudo em dia"} />
      <StatCard title="Disponíveis para Empréstimo" value={stats.totalBooks.toString()} icon={BookOpen} trend="No acervo" />
    </div>
  );
};