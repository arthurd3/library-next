import { BookService } from '@/src/db';

interface CreateBookParams {
  title: string;
  author: string;
  description?: string;
  genreId?: number;
  coverUrl?: string;
}

export async function createBook(params: CreateBookParams) {
  try {
    const newBook = await BookService.createBook(
      params.title,
      params.author,
      params.description,
      params.genreId,
      params.coverUrl
    );

    return { success: true, book: newBook };
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}