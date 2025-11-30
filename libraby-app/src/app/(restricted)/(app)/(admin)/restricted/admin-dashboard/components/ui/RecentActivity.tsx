import { Clock, UserPlus, BookOpen, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'user_registered',
    message: 'Novo usuário registrado: Maria Silva',
    time: '2 minutos atrás',
    icon: UserPlus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 2,
    type: 'book_loaned',
    message: 'Livro emprestado: "Dom Casmurro" para João Santos',
    time: '15 minutos atrás',
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 3,
    type: 'book_returned',
    message: 'Livro devolvido: "1984" por Ana Costa',
    time: '1 hora atrás',
    icon: BookOpen,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 4,
    type: 'fine_created',
    message: 'Multa gerada para Pedro Lima (atraso)',
    time: '2 horas atrás',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 5,
    type: 'user_registered',
    message: 'Novo usuário registrado: Carlos Eduardo',
    time: '3 horas atrás',
    icon: UserPlus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
];

export const RecentActivity = () => (
  <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">Atividades Recentes</h3>
      <Clock className="w-5 h-5 text-stone-400" />
    </div>

    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors">
          <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
            <activity.icon className={`w-4 h-4 ${activity.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-900 leading-tight">
              {activity.message}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>

    <button className="w-full mt-4 py-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
      Ver todas as atividades
    </button>
  </div>
);