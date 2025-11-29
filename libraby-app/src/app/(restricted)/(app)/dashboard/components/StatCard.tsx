import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => (
  <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 group">
    <div className="flex justify-between items-start mb-5">
      <div className="p-3 bg-stone-50 rounded-2xl text-stone-500 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${trend.includes('Ação') ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-3xl font-bold text-stone-800 tracking-tight font-sans tabular-nums">{value}</h3>
      <p className="mt-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">{title}</p>
    </div>
  </div>
);