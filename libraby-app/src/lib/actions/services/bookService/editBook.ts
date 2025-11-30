'use server';

import { BookDao } from '@/src/db';

interface EditBookParams {
  id: number;
  title: string;
  author: string;
  description?: string;
  genreId?: number;
  coverUrl?: string;
  available?: boolean;
}

export async function editBook(params: EditBookParams) {
  try {
    // Verificar se livro existe
    const existingBook = await BookDao.getBookById(params.id);
    if (!existingBook) {
      return { success: false, error: 'Livro não encontrado' };
    }

    // Atualizar livro
    const updatedBook = await BookDao.updateBook(
      params.id,
      params.title,
      params.author,
      params.description,
      params.genreId,
      params.coverUrl,
      params.available
    );

    if (!updatedBook) {
      return { success: false, error: 'Falha ao atualizar livro' };
    }

    return { success: true, book: updatedBook };
  } catch (error) {
    console.error('Erro ao editar livro:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function updateBookAvailability(id: number, available: boolean) {
  try {
    const updatedBook = await BookDao.updateBookAvailability(id, available);
    if (!updatedBook) {
      return { success: false, error: 'Livro não encontrado' };
    }
    return { success: true, book: updatedBook };
  } catch (error) {
    console.error('Erro ao atualizar disponibilidade do livro:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}