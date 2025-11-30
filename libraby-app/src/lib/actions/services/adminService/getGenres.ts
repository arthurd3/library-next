'use server';

import { GenreDao } from '@/src/db/genredb';
import { Genre } from '@/src/models/GenreModel';

export async function getAllGenres(): Promise<Genre[]> {
  try {
    return await GenreDao.getAllGenres();
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    throw error;
  }
}