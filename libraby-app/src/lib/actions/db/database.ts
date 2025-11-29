import { User } from '@/src/models/UserModel';
import pool from './db';
import { Book } from '@/src/models/BookModel';

export class DatabaseService {
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  // Buscar todos os livros disponíveis
  static async getAvailableBooks(): Promise<Book[]> {
    try {
      const query = 'SELECT * FROM books WHERE available = true ORDER BY title';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw error;
    }
  }

  // Buscar livros por gênero
  static async getBooksByGenre(genreId: number): Promise<Book[]> {
    try {
      const query = 'SELECT * FROM books WHERE genre_id = $1 AND available = true';
      const result = await pool.query(query, [genreId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar livros por gênero:', error);
      throw error;
    }
  }

  // Testar conexão
  static async testConnection(): Promise<void> {
    try {
      const result = await pool.query('SELECT NOW()');
      console.log('Conexão com PostgreSQL funcionando:', result.rows[0]);
    } catch (error) {
      console.error('Erro na conexão:', error);
      throw error;
    }
  }
}