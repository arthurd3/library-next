import pool from './connection/db';
import { Fine } from '@/src/models/FineModel';

export class FineService {
  static async getAllFines(): Promise<Fine[]> {
    try {
      const query = 'SELECT * FROM fines ORDER BY created_at DESC';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar multas:', error);
      throw error;
    }
  }

  static async getFinesByUser(userId: number): Promise<Fine[]> {
    try {
      const query = 'SELECT * FROM fines WHERE user_id = $1 ORDER BY created_at DESC';
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar multas do usuário:', error);
      throw error;
    }
  }

  static async getPendingFinesByUser(userId: number): Promise<Fine[]> {
    try {
      const query = 'SELECT * FROM fines WHERE user_id = $1 AND status = $2 ORDER BY due_date';
      const result = await pool.query(query, [userId, 'pending']);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar multas pendentes do usuário:', error);
      throw error;
    }
  }

  static async createFine(userId: number, bookId: number, amount: number, dueDate: Date): Promise<Fine> {
    try {
      const query = 'INSERT INTO fines (user_id, book_id, amount, due_date) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await pool.query(query, [userId, bookId, amount, dueDate]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar multa:', error);
      throw error;
    }
  }

  static async payFine(fineId: number): Promise<Fine | null> {
    try {
      const query = 'UPDATE fines SET status = $1 WHERE id = $2 RETURNING *';
      const result = await pool.query(query, ['paid', fineId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao pagar multa:', error);
      throw error;
    }
  }

  static async getTotalPendingFines(userId: number): Promise<number> {
    try {
      const query = 'SELECT SUM(amount) as total FROM fines WHERE user_id = $1 AND status = $2';
      const result = await pool.query(query, [userId, 'pending']);
      return parseFloat(result.rows[0]?.total || '0');
    } catch (error) {
      console.error('Erro ao calcular total de multas pendentes:', error);
      throw error;
    }
  }

  static async deleteFine(fineId: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM fines WHERE id = $1';
      const result = await pool.query(query, [fineId]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao deletar multa:', error);
      throw error;
    }
  }
}