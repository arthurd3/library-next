import { BookDao } from '@/src/db';

export async function findAllBooks() {
  try {
    const books = await BookDao.getAllBooks();
    return { success: true, books };
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function findBookById(id: number) {
  try {
    const book = await BookDao.getBookById(id);
    if (!book) {
      return { success: false, error: 'Livro não encontrado' };
    }
    return { success: true, book };
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function findAvailableBooks() {
  try {
    const books = await BookDao.getAvailableBooks();
    return { success: true, books };
  } catch (error) {
    console.error('Erro ao buscar livros disponíveis:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function findBooksByGenre(genreId: number) {
  try {
    const books = await BookDao.getBooksByGenre(genreId);
    return { success: true, books };
  } catch (error) {
    console.error('Erro ao buscar livros por gênero:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function searchBooksByTitle(title: string) {
  try {
    const books = await BookDao.searchBooksByTitle(title);
    return { success: true, books };
  } catch (error) {
    console.error('Erro ao buscar livros por título:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}

export async function searchBooksByAuthor(author: string) {
  try {
    const books = await BookDao.searchBooksByAuthor(author);
    return { success: true, books };
  } catch (error) {
    console.error('Erro ao buscar livros por autor:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
}