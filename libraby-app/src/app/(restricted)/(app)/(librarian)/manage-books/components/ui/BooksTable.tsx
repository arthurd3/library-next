import { Genre, GenreDao } from "@/src/db";
import { editBook } from "@/src/lib/actions/services/bookService/editBook";
import { removeBook } from "@/src/lib/actions/services/bookService/removeBook";
import { BookWithGenre, getBooksForManagement } from "@/src/lib/actions/services/adminService/bookManagement";
import { getBookLoans } from "@/src/lib/actions/services/adminService/getBookLoans";
import { getAllGenres } from "@/src/lib/actions/services/adminService/getGenres";
import { BookOpen, Edit, Eye, EyeOff, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface LoanWithUser {
  id: number;
  user_id: number;
  book_id: number;
  loan_date: Date;
  due_date: Date;
  return_date: Date | null;
  status: string;
  user?: {
    id: number;
    name: string;
    email: string;
    registration: string;
  };
}

export const BooksTable = () => {
  const [books, setBooks] = useState<BookWithGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState<BookWithGenre | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [bookLoans, setBookLoans] = useState<LoanWithUser[]>([]);
  const [editForm, setEditForm] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    available: true,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [booksData, genresData] = await Promise.all([
          getBooksForManagement(),
          getAllGenres()
        ]);
        setBooks(booksData);
        setGenres(genresData);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = async (bookId: number) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    try {
      const result = await editBook({
        id: bookId,
        title: book.title,
        author: book.author,
        description: '', 
        available: !book.available,
      });

      if (result.success) {
        setBooks(prevBooks =>
          prevBooks.map(b =>
            b.id === bookId ? { ...b, available: !b.available } : b
          )
        );
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao alterar disponibilidade:', error);
      alert('Erro ao alterar disponibilidade do livro');
    }
  };

  const editBookHandler = async (bookId: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setEditingBook(book);
      setEditForm({
        title: book.title,
        author: book.author,
        description: book.description || '',
        genre: book.genre,
        available: book.available,
      });

      // Buscar empréstimos ativos do livro
      try {
        const loansWithUsers = await getBookLoans(bookId);
        setBookLoans(loansWithUsers);
      } catch (error) {
        console.error('Erro ao buscar empréstimos do livro:', error);
        setBookLoans([]);
      }
    }
  };

  const saveBookEdit = async () => {
    if (!editingBook) return;

    // Encontrar o ID do gênero selecionado
    const selectedGenre = genres.find(g => g.name === editForm.genre);
    const genreId = selectedGenre ? selectedGenre.id : undefined;

    try {
      const result = await editBook({
        id: editingBook.id,
        title: editForm.title,
        author: editForm.author,
        description: editForm.description,
        genreId,
        available: editForm.available,
      });

      if (result.success) {
        setBooks(prevBooks =>
          prevBooks.map(b =>
            b.id === editingBook.id
              ? { ...b, title: editForm.title, author: editForm.author, description: editForm.description, genre: editForm.genre, available: editForm.available }
              : b
          )
        );
        setEditingBook(null);
        alert('Livro atualizado com sucesso!');
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao editar livro:', error);
      alert('Erro ao editar livro');
    }
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  const deleteBook = async (bookId: number) => {
    if (!confirm('Tem certeza que deseja deletar este livro?')) return;

    try {
      const result = await removeBook(bookId);
      if (result.success) {
        // Remover do estado local
        setBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
        alert('Livro removido com sucesso!');
      } else {
        alert(`Erro: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      alert('Erro ao deletar livro');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-stone-200 rounded animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-stone-200 rounded mb-2"></div>
            <div className="h-3 bg-stone-200 rounded w-1/3"></div>
          </div>
        </div>
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-stone-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

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
              <th className="text-center py-3 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
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
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => editBookHandler(book.id)}
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

      {/* Modal de Edição */}
      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-stone-900">Editar Livro</h3>
              <button
                onClick={cancelEdit}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) => setEditForm(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">
                  Gênero
                </label>
                <select
                  value={editForm.genre}
                  onChange={(e) => setEditForm(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent"
                >
                  <option value="">Selecione um gênero</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={editForm.available}
                  onChange={(e) => setEditForm(prev => ({ ...prev, available: e.target.checked }))}
                  className="w-4 h-4 text-stone-600 bg-stone-100 border-stone-300 rounded focus:ring-stone-500 focus:ring-2"
                />
                <label htmlFor="available" className="text-sm font-bold text-stone-700">
                  Disponível para empréstimo
                </label>
              </div>
            </div>

            {/* Seção de Empréstimos Ativos */}
            {bookLoans.length > 0 && (
              <div className="mt-6 pt-6 border-t border-stone-200">
                <h4 className="text-sm font-bold text-stone-700 mb-3">Empréstimos Ativos</h4>
                <div className="space-y-3">
                  {bookLoans.map((loan) => (
                    <div key={loan.id} className="bg-stone-50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-bold text-stone-600">Nome:</span>
                          <p className="text-stone-800">{loan.user?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-stone-600">Email:</span>
                          <p className="text-stone-800">{loan.user?.email || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-stone-600">ID:</span>
                          <p className="text-stone-800">{loan.user?.id || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-stone-600">Matrícula:</span>
                          <p className="text-stone-800">{loan.user?.registration || 'N/A'}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="font-bold text-stone-600">Vencimento:</span>
                          <p className="text-stone-800">{new Date(loan.due_date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelEdit}
                className="flex-1 px-4 py-2 text-stone-700 font-bold border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveBookEdit}
                className="flex-1 px-4 py-2 bg-stone-800 text-white font-bold rounded-lg hover:bg-stone-900 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};