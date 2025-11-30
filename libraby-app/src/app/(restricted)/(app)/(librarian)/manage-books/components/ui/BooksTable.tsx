import { BookOpen, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const books = [
  {
    id: 1,
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    genre: 'Romance',
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    isbn: '978-85-1234-5678',
    publicationYear: 1899,
  },
  {
    id: 2,
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    genre: 'Tecnologia',
    available: false,
    totalCopies: 3,
    availableCopies: 0,
    isbn: '978-85-1234-5679',
    publicationYear: 2017,
  },
  {
    id: 3,
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasia',
    available: true,
    totalCopies: 4,
    availableCopies: 4,
    isbn: '978-85-1234-5680',
    publicationYear: 1937,
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    genre: 'Distopia',
    available: true,
    totalCopies: 6,
    availableCopies: 2,
    isbn: '978-85-1234-5681',
    publicationYear: 1949,
  },
];

export const BooksTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = (bookId: number) => {
    // Aqui você implementaria a lógica para alterar disponibilidade
    console.log('Toggle availability for book:', bookId);
  };

  const editBook = (bookId: number) => {
    // Aqui você implementaria a lógica para editar livro
    console.log('Edit book:', bookId);
  };

  const deleteBook = (bookId: number) => {
    // Aqui você implementaria a lógica para deletar livro
    if (confirm('Tem certeza que deseja deletar este livro?')) {
      console.log('Delete book:', bookId);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar livros por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200"
          />
        </div>
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
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-bold text-stone-900">{book.title}</p>
                    <p className="text-xs text-stone-500">ISBN: {book.isbn}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-stone-600">{book.author}</p>
                  <p className="text-xs text-stone-500">{book.publicationYear}</p>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 text-xs font-bold bg-stone-100 text-stone-700 rounded-full">
                    {book.genre}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => toggleAvailability(book.id)}
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full transition-colors ${
                      book.available
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {book.available ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Disponível
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Indisponível
                      </>
                    )}
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm font-bold text-stone-900">
                    {book.availableCopies}/{book.totalCopies}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => editBook(book.id)}
                      className="p-1 hover:bg-stone-200 rounded transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-stone-400" />
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Deletar"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500">Nenhum livro encontrado</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-stone-500">
          Mostrando {filteredBooks.length} de {books.length} livros
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
};