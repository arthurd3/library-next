'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">Acesso Negado</h1>

        <p className="mt-4 text-lg text-gray-600">
          Você não tem permissão para acessar esta página.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Entre em contato com o administrador se você acredita que isso é um erro.
        </p>

        <div className="mt-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
