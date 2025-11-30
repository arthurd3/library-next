import { User } from '../../../../../models/UserModel';
import { useState } from 'react';
import { updateUserProfile } from '../../../../../lib/actions/updateUserProfile';

interface ProfileViewProps {
  user: Omit<User, 'password'> | null;
}

export const ProfileView = ({ user }: ProfileViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.append('userId', user?.id.toString() || '');

    const result = await updateUserProfile(formData);

    setIsLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setIsEditing(false);
      // Recarregar a página para atualizar os dados
      window.location.reload();
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Meu Perfil</h1>
        <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Gerencie suas informações pessoais</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-stone-800">Informações Pessoais</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Editar Perfil
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                disabled={!isEditing}
                required
                className={`w-full pl-4 pr-4 py-3 border rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm ${
                  isEditing
                    ? 'bg-white border-stone-200'
                    : 'bg-stone-50 border-stone-100 cursor-not-allowed'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled={!isEditing}
                required
                className={`w-full pl-4 pr-4 py-3 border rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm ${
                  isEditing
                    ? 'bg-white border-stone-200'
                    : 'bg-stone-50 border-stone-100 cursor-not-allowed'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                Matrícula
              </label>
              <input
                type="text"
                defaultValue={user?.registration}
                disabled
                className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-lg text-stone-400 cursor-not-allowed shadow-sm"
              />
              <p className="text-xs text-stone-400 mt-1">A matrícula não pode ser alterada</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={user?.phone || ''}
                disabled={!isEditing}
                className={`w-full pl-4 pr-4 py-3 border rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm ${
                  isEditing
                    ? 'bg-white border-stone-200'
                    : 'bg-stone-50 border-stone-100 cursor-not-allowed'
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Endereço
            </label>
            <textarea
              name="address"
              defaultValue={user?.address || ''}
              disabled={!isEditing}
              rows={3}
              className={`w-full pl-4 pr-4 py-3 border rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm ${
                isEditing
                  ? 'bg-white border-stone-200'
                  : 'bg-stone-50 border-stone-100 cursor-not-allowed resize-none'
              }`}
            />
          </div>

          {isEditing && (
            <div className="flex gap-4 pt-4 border-t border-stone-100">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-stone-600 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-3 bg-stone-100 hover:bg-stone-200 disabled:bg-stone-50 text-stone-700 disabled:text-stone-400 font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};