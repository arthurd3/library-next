type LoanStatus = 'active' | 'overdue' | 'returned';

interface StatusBadgeProps {
  status: LoanStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
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