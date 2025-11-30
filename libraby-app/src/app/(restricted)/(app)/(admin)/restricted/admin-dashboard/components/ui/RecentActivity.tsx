import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getRecentActivities, Activity } from '@/src/lib/actions/services/adminService/recentActivities';

export const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getRecentActivities(5);
        setActivities(data);
      } catch (error) {
        console.error('Erro ao buscar atividades recentes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">Atividades Recentes</h3>
          <Clock className="w-5 h-5 text-stone-400" />
        </div>
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl">
              <div className="w-8 h-8 bg-stone-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-stone-200 rounded mb-2"></div>
                <div className="h-3 bg-stone-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
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
};