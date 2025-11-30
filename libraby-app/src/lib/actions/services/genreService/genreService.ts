'use server';

import { GenreDao } from '@/src/db/genredb';

export interface Genre {
  id: number;
  name: string;
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const genres = await GenreDao.getAllGenres();
    return genres.map(genre => ({
      id: genre.id,
      name: genre.name,
    }));
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    throw error;
  }
}