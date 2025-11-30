import { Users, BookOpen, Clock, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Total de Usuários',
    value: '1,247',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Livros no Acervo',
    value: '3,492',
    change: '+8%',
    changeType: 'positive' as const,
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Empréstimos Ativos',
    value: '156',
    change: '+5%',
    changeType: 'positive' as const,
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Multas Pendentes',
    value: '23',
    change: '-15%',
    changeType: 'negative' as const,
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Receita Mensal',
    value: 'R$ 2.847',
    change: '+22%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Taxa de Devolução',
    value: '94.2%',
    change: '+2%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export const AdminStatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {stats.map((stat, index) => (
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