import pool from './connection/db';
import { Book } from '@/src/models/BookModel';

export class BookService {
  static async getAllBooks(): Promise<Book[]> {
    try {
      const query = 'SELECT * FROM books ORDER BY title';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw error;
    }
  }

  static async getBookById(id: number): Promise<Book | null> {
    try {
      const query = 'SELECT * FROM books WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar livro por ID:', error);
      throw error;
    }
  }

  static async getAvailableBooks(): Promise<Book[]> {
    try {
      const query = 'SELECT * FROM books WHERE available = true ORDER BY title';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar livros disponíveis:', error);
      throw error;
    }
  }

  static async getBooksByGenre(genreId: number): Promise<Book[]> {
    try {
      const query = 'SELECT * FROM books WHERE genre_id = $1 AND available = true ORDER BY title';
      const result = await pool.query(query, [genreId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar livros por gênero:', error);
      throw error;
    }
  }

  static async searchBooksByTitle(title: string): Promise<Book[]> {
    try {
      const query = 'SELECT * FROM books WHERE title ILIKE $1 ORDER BY title';
      const result = await pool.query(query, [`%${title}%`]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar livros por título:', error);
      throw error;
    }
  }

  static async searchBooksByAuthor(author: string): Promise<Book[]> {
    try {
      const query = 'SELECT * FROM books WHERE author ILIKE $1 ORDER BY author, title';
      const result = await pool.query(query, [`%${author}%`]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar livros por autor:', error);
      throw error;
    }
  }

  static async createBook(title: string, author: string, description?: string, genreId?: number, coverUrl?: string): Promise<Book> {
    try {
      const query = 'INSERT INTO books (title, author, description, genre_id, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await pool.query(query, [title, author, description, genreId, coverUrl]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw error;
    }
  }

  static async updateBook(id: number, title: string, author: string, description?: string, genreId?: number, coverUrl?: string, available?: boolean): Promise<Book | null> {
    try {
      const query = 'UPDATE books SET title = $1, author = $2, description = $3, genre_id = $4, cover_url = $5, available = $6 WHERE id = $7 RETURNING *';
      const result = await pool.query(query, [title, author, description, genreId, coverUrl, available, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      throw error;
    }
  }

  static async updateBookAvailability(id: number, available: boolean): Promise<Book | null> {
    try {
      const query = 'UPDATE books SET available = $1 WHERE id = $2 RETURNING *';
      const result = await pool.query(query, [available, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade do livro:', error);
      throw error;
    }
  }

  static async deleteBook(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM books WHERE id = $1';
      const result = await pool.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      throw error;
    }
  }
}