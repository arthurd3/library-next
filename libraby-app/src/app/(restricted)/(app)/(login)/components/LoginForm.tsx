'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginFunction } from '../../../../../lib/actions/login/loginFunction';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Label } from './ui/Label';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const isAuth = await loginFunction(email, password);

    if (isAuth) {
      setIsLoading(false);
      router.push('/dashboard');
    } else {
      setIsLoading(false);
      setErrorMessage('Credenciais inválidas');
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-stone-200">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-serif font-bold text-stone-800">
          Acervo Digital
        </h1>
      </div>

      {/* FORM */}
      <form onSubmit={submitLogin} className="space-y-6">
        <div className="group">
          <Label htmlFor="login">
            Matrícula ou Email
          </Label>
          <div className="relative flex items-center">
            <div className="absolute left-0 pl-3 pointer-events-none text-stone-400 group-focus-within:text-stone-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <Input
              id="login"
              name="login"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: 2023001"
            />
          </div>
        </div>

        {/* SENHA */}
        <div className="group">
          <Label htmlFor="password">
            Senha de Acesso
          </Label>
          <div className="relative flex items-center">
            <div className="absolute left-0 pl-3 pointer-events-none text-stone-400 group-focus-within:text-stone-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validando...
            </>
          ) : (
            'Consultar Acervo'
          )}
        </Button>
      </form>
    </div>
  );
};