import { BooksTable } from './ui/BooksTable';
import { AddBookModal } from './ui/AddBookModal';
import { useState } from 'react';

export const ManageBooksView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Gerenciar Livros</h1>
          <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Administre o acervo da biblioteca</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-stone-900 text-white text-[13px] font-bold tracking-wide rounded-xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 hover:-translate-y-0.5"
        >
          Adicionar Livro
        </button>
      </div>

      <BooksTable />

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};