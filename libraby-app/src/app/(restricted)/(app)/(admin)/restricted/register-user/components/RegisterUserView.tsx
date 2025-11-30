import { RegisterUserForm } from './ui/RegisterUserForm';

export const RegisterUserView = () => (
  <>
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Cadastrar Novo Usuário</h1>
      <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Adicione um novo usuário ao sistema da biblioteca</p>
    </div>

    <div className="max-w-2xl">
      <RegisterUserForm />
    </div>
  </>
);