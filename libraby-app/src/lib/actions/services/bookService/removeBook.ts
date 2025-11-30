'use server';

import { BookDao } from '@/src/db';

export async function removeBook(id: number) {
  try {
    // Verificar se livro existe
    const existingBook = await BookDao.getBookById(id);
    if (!existingBook) {
      return { success: false, error: 'Livro não encontrado' };
    }

    // Remover livro
    const deleted = await BookDao.deleteBook(id);

    if (!deleted) {
      return { success: false, error: 'Falha ao remover livro' };
    }

    return { success: true, message: 'Livro removido com sucesso' };
  } catch (error) {
    console.error('Erro ao remover livro:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}