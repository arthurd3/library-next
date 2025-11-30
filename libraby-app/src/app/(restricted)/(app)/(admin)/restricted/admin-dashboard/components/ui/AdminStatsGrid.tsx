import { Users, BookOpen, Clock, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAdminStats, AdminStats } from '@/src/lib/actions/services/adminService/adminStats';

export const AdminStatsGrid = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-3 bg-stone-200 rounded mb-2"></div>
                <div className="h-6 bg-stone-200 rounded mb-2"></div>
                <div className="h-3 bg-stone-200 rounded w-1/2"></div>
              </div>
              <div className="w-12 h-12 bg-stone-200 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return <div>Erro ao carregar estatísticas</div>;
  }

  const statItems = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers.toString(),
      change: '+0%', 
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Livros no Acervo',
      value: stats.totalBooks.toString(),
      change: '+0%',
      changeType: 'positive' as const,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Empréstimos Ativos',
      value: stats.activeLoans.toString(),
      change: '+0%',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Multas Pendentes',
      value: stats.pendingFines.toString(),
      change: '+0%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${stats.monthlyRevenue.toFixed(2)}`,
      change: '+0%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Taxa de Devolução',
      value: `${stats.returnRate}%`,
      change: '+0%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-extrabold text-stone-900 tracking-tight">
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                <span className={`text-xs font-bold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-stone-500 ml-1">vs mês anterior</span>
              </div>
            </div>
            <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};