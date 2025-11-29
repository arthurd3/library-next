import { BookOpen, Users, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from './StatCard';

export const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
    <StatCard title="Total no Acervo" value="12,450" icon={BookOpen} trend="+15 novos" />
    <StatCard title="Empréstimos Ativos" value="342" icon={Clock} trend="85% no prazo" />
    <StatCard title="Leitores" value="2,890" icon={Users} trend="+5 hoje" />
    <StatCard title="Atrasos Críticos" value="18" icon={AlertCircle} trend="Ação necessária" />
  </div>
);