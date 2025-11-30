import { useState, useEffect } from 'react';
import { getBooksForCollection, BookForCollection } from '@/src/lib/actions/services/bookCollection';
import { borrowBook } from '@/src/lib/actions/borrowBook';
import { useAuth } from '@/src/contexts/AuthContext';

const BookCard = ({
  book,
  userId,
  onBorrow
}: {
  book: BookForCollection;
  userId?: number;
  onBorrow: (bookId: number) => Promise<void>;
}) => {
  const [isBorrowing, setIsBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!userId) return;

    setIsBorrowing(true);
    try {
      await onBorrow(book.id);
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-[2/3] bg-stone-100 relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        {!book.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-stone-800 px-3 py-1 rounded-full">
              Indisponível
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-stone-900 text-sm mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-stone-500 text-xs mb-2">{book.author}</p>
        <span className="inline-block px-2 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold rounded-full mb-3">
          {book.genre}
        </span>
        <button
          disabled={!book.available || isBorrowing}
          onClick={handleBorrow}
          className={`w-full py-2 px-4 text-xs font-bold rounded-lg transition-all ${
            book.available && !isBorrowing
              ? 'bg-stone-800 hover:bg-stone-900 text-white shadow-md hover:shadow-lg'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          {isBorrowing ? 'Processando...' : book.available ? 'Emprestar' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
};

export const CollectionView = () => {
  const [books, setBooks] = useState<BookForCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooksForCollection();
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBorrow = async (bookId: number) => {
    if (!user?.id) {
      setMessage({ type: 'error', text: 'Usuário não autenticado' });
      return;
    }

    const formData = new FormData();
    formData.append('userId', user.id.toString());
    formData.append('bookId', bookId.toString());

    const result = await borrowBook(formData);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      const data = await getBooksForCollection();
      setBooks(data);
    } else {
      setMessage({ type: 'error', text: result.message });
    }

    setTimeout(() => setMessage(null), 5000);
  };

  if (loading) {
    return (
      <>
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Acervo Digital</h1>
          <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Explore nossa coleção de livros</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-100 shadow-lg overflow-hidden animate-pulse">
              <div className="aspect-[2/3] bg-stone-200"></div>
              <div className="p-4">
                <div className="h-4 bg-stone-200 rounded mb-2"></div>
                <div className="h-3 bg-stone-200 rounded mb-2 w-2/3"></div>
                <div className="h-6 bg-stone-200 rounded mb-3 w-1/2"></div>
                <div className="h-8 bg-stone-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Acervo Digital</h1>
        <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Explore nossa coleção de livros</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg max-w-4xl ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            userId={user?.id}
            onBorrow={handleBorrow}
          />
        ))}
      </div>
    </>
  );
};