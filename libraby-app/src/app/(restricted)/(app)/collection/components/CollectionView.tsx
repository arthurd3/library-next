interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  available: boolean;
}

const books: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    genre: 'Romance',
    coverUrl: 'https://via.placeholder.com/200x300/8B5A3C/FFFFFF?text=Dom+Casmurro',
    available: true,
  },
  {
    id: '2',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    genre: 'Tecnologia',
    coverUrl: 'https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=Clean+Architecture',
    available: false,
  },
  {
    id: '3',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasia',
    coverUrl: 'https://via.placeholder.com/200x300/7B68EE/FFFFFF?text=O+Hobbit',
    available: true,
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    genre: 'Distopia',
    coverUrl: 'https://via.placeholder.com/200x300/DC143C/FFFFFF?text=1984',
    available: true,
  },
  {
    id: '5',
    title: 'Pense e Enriqueça',
    author: 'Napoleon Hill',
    genre: 'Autoajuda',
    coverUrl: 'https://via.placeholder.com/200x300/FFD700/000000?text=Pense+e+Enriqueça',
    available: true,
  },
  {
    id: '6',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    genre: 'Fábula',
    coverUrl: 'https://via.placeholder.com/200x300/32CD32/FFFFFF?text=A+Revolução+dos+Bichos',
    available: false,
  },
];

const BookCard = ({ book }: { book: Book }) => (
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
        disabled={!book.available}
        className={`w-full py-2 px-4 text-xs font-bold rounded-lg transition-all ${
          book.available
            ? 'bg-stone-800 hover:bg-stone-900 text-white shadow-md hover:shadow-lg'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        {book.available ? 'Emprestar' : 'Indisponível'}
      </button>
    </div>
  </div>
);

export const CollectionView = () => (
  <>
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold text-stone-900 tracking-tighter">Acervo Digital</h1>
      <p className="text-stone-500 text-sm mt-1 font-medium tracking-normal">Explore nossa coleção de livros</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  </>
);