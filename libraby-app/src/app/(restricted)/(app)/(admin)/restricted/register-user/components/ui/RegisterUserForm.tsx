'use client';

import { useState } from 'react';
import { UserPlus, Save, X } from 'lucide-react';
import { createUser } from '@/src/lib/actions/services/userService/createUser';

interface UserFormData {
  name: string;
  email: string;
  registration: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'librarian';
}

export const RegisterUserForm = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    registration: '',
    password: '',
    phone: '',
    address: '',
    role: 'user',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const roleId = formData.role === 'librarian' ? 2 : 3;
      const result = await createUser({
        name: formData.name,
        email: formData.email,
        registration: formData.registration,
        password: formData.password,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        roleId,
      });

      if (result.success) {
        setFormData({
          name: '',
          email: '',
          registration: '',
          password: '',
          phone: '',
          address: '',
          role: 'user',
        });
        alert('Usuário cadastrado com sucesso!');
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      registration: '',
      password: '',
      phone: '',
      address: '',
      role: 'user',
    });
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-stone-900 text-white rounded-2xl">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">Dados do Usuário</h2>
          <p className="text-stone-500 text-sm">Preencha todas as informações obrigatórias</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
              placeholder="usuario@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Matrícula *
            </label>
            <input
              type="text"
              name="registration"
              value={formData.registration}
              onChange={handleInputChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
              placeholder="2024001"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Senha *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
              placeholder="Digite a senha"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Tipo de Usuário *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
            >
              <option value="user">Usuário Comum</option>
              <option value="librarian">Bibliotecário</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1">
            Endereço
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm resize-none"
            placeholder="Rua, número, bairro, cidade - UF"
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-stone-100">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 px-6 py-2.5 text-stone-600 hover:text-stone-900 font-bold transition-colors"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Salvando...' : 'Cadastrar Usuário'}
          </button>
        </div>
      </form>
    </div>
  );
};