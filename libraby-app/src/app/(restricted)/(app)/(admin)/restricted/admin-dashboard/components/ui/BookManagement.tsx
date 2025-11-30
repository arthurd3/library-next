import { BookOpen, Plus, Search, Edit, Trash2 } from 'lucide-react';

const books = [
  {
    id: 1,
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    genre: 'Romance',
    available: true,
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: 2,
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    genre: 'Tecnologia',
    available: false,
    totalCopies: 3,
    availableCopies: 0,
  },
  {
    id: 3,
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasia',
    available: true,
    totalCopies: 4,
    availableCopies: 4,
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    genre: 'Distopia',
    available: true,
    totalCopies: 6,
    availableCopies: 2,
  },
];

export const BookManagement = () => (
  <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6 mt-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">Gerenciamento de Livros</h3>
      <BookOpen className="w-5 h-5 text-stone-400" />
    </div>

    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar livros..."
          className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all">
        <Plus className="w-4 h-4" />
        Adicionar Livro
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="text-left py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Livro</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Autor</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Gênero</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Disponibilidade</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Exemplares</th>
            <th className="text-center py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
              <td className="py-4 px-4">
                <div>
                  <p className="text-sm font-bold text-stone-900">{book.title}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm text-stone-600">{book.author}</p>
              </td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 text-xs font-bold bg-stone-100 text-stone-700 rounded-full">
                  {book.genre}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  book.available
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {book.available ? 'Disponível' : 'Indisponível'}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <span className="text-sm font-bold text-stone-900">
                  {book.availableCopies}/{book.totalCopies}
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button className="p-1 hover:bg-stone-200 rounded transition-colors">
                    <Edit className="w-4 h-4 text-stone-400" />
                  </button>
                  <button className="p-1 hover:bg-stone-200 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-stone-500">
        Mostrando 4 de 3.492 livros
      </p>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Anterior
        </button>
        <button className="px-3 py-1 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors">
          Próximo
        </button>
      </div>
    </div>
  </div>
);