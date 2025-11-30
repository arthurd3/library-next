'use server';

import { BookDao } from '@/src/db/bookdb';
import { GenreDao } from '@/src/db/genredb';

export interface BookForCollection {
  id: number;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  available: boolean;
}

export async function getBooksForCollection(): Promise<BookForCollection[]> {
  try {
    const books = await BookDao.getAllBooks();
    const genres = await GenreDao.getAllGenres();

    // Criar um mapa de genre_id para nome do gênero
    const genreMap = new Map(genres.map(g => [g.id, g.name]));

    return books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: genreMap.get(book.genre) || 'Desconhecido',
      coverUrl: book.cover_url || 'https://via.placeholder.com/200x300/cccccc/666666?text=Sem+Capa',
      available: book.available,
    }));
  } catch (error) {
    console.error('Erro ao buscar livros para coleção:', error);
    throw error;
  }
}