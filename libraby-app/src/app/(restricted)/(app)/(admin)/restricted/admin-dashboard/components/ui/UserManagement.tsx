import { Users, UserPlus, Search, MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUsersForManagement, UserForManagement } from '@/src/lib/actions/services/adminService/userManagement';

export const UserManagement = () => {
  const [users, setUsers] = useState<UserForManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersForManagement(10);
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.registration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">Gerenciamento de Usuários</h3>
          <Users className="w-5 h-5 text-stone-400" />
        </div>
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-stone-200 rounded mb-1"></div>
                  <div className="h-3 bg-stone-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 bg-stone-200 rounded w-16"></div>
                <div className="h-6 bg-stone-200 rounded w-12"></div>
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
      <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">Gerenciamento de Usuários</h3>
      <Users className="w-5 h-5 text-stone-400" />
    </div>

    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all">
        <UserPlus className="w-4 h-4" />
        Adicionar
      </button>
    </div>

    <div className="space-y-3">
      {filteredUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-stone-600">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">{user.name}</p>
              <p className="text-xs text-stone-500">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
              user.role === 'librarian'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-stone-100 text-stone-700'
            }`}>
              {user.role === 'librarian' ? 'Bibliotecário' : 'Usuário'}
            </span>
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
              user.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {user.status === 'active' ? 'Ativo' : 'Suspenso'}
            </span>
            <button className="p-1 hover:bg-stone-200 rounded">
              <MoreVertical className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>
      ))}
    </div>

    <button className="w-full mt-4 py-2 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
      Ver todos os usuários
    </button>
  </div>
  );
};