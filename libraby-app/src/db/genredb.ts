import pool from './connection/db';
import { Genre } from '@/src/models/GenreModel';

export class GenreDao {
  static async getAllGenres(): Promise<Genre[]> {
    try {
      const query = 'SELECT * FROM genres ORDER BY name';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      throw error;
    }
  }

  static async getGenreById(id: number): Promise<Genre | null> {
    try {
      const query = 'SELECT * FROM genres WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar gênero:', error);
      throw error;
    }
  }

  static async createGenre(name: string, description?: string): Promise<Genre> {
    try {
      const query = 'INSERT INTO genres (name, description) VALUES ($1, $2) RETURNING *';
      const result = await pool.query(query, [name, description]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar gênero:', error);
      throw error;
    }
  }

  static async updateGenre(id: number, name: string, description?: string): Promise<Genre | null> {
    try {
      const query = 'UPDATE genres SET name = $1, description = $2 WHERE id = $3 RETURNING *';
      const result = await pool.query(query, [name, description, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar gênero:', error);
      throw error;
    }
  }

  static async deleteGenre(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM genres WHERE id = $1';
      const result = await pool.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao deletar gênero:', error);
      throw error;
    }
  }
}