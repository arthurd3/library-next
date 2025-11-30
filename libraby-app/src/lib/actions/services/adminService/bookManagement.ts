'use server';

import { BookDao } from '@/src/db/bookdb';
import { GenreDao } from '@/src/db/genredb';

export interface BookWithGenre {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  description?: string;
}

export async function getBooksForManagement(): Promise<BookWithGenre[]> {
  try {
    const books = await BookDao.getAllBooks();
    const genres = await GenreDao.getAllGenres();

    const genreMap = new Map(genres.map(g => [g.id, g.name]));

    return books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: genreMap.get(book.genre) || 'Desconhecido',
      available: book.available,
      totalCopies: 1, 
      availableCopies: book.available ? 1 : 0,
      description: book.description,
    }));
  } catch (error) {
    console.error('Erro ao buscar livros para gerenciamento:', error);
    throw error;
  }
}