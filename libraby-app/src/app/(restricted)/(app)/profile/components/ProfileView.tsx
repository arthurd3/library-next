import { User } from '../../../../../models/UserModel';

interface ProfileViewProps {
  user: Omit<User, 'password'> | null;
}

export const ProfileView = ({ user }: ProfileViewProps) => (
  <>
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Meu Perfil</h1>
      <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Gerencie suas informações pessoais</p>
    </div>

    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-8">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Nome Completo
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Matrícula
            </label>
            <input
              type="text"
              defaultValue={user?.registration}
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Telefone
            </label>
            <input
              type="tel"
              defaultValue="(11) 99999-9999"
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
            Endereço
          </label>
          <textarea
            defaultValue="Rua das Flores, 123 - São Paulo, SP"
            rows={3}
            className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-stone-600"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  </>
);