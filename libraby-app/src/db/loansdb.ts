import pool from './connection/db';
import { Loan } from '@/src/models/LoanModel';

export class LoanDao {
  static async getAllLoans(): Promise<Loan[]> {
    try {
      const query = 'SELECT * FROM loans ORDER BY loan_date DESC';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      throw error;
    }
  }

  static async getLoansByUser(userId: number): Promise<Loan[]> {
    try {
      const query = 'SELECT * FROM loans WHERE user_id = $1 ORDER BY loan_date DESC';
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar empréstimos do usuário:', error);
      throw error;
    }
  }

  static async getActiveLoansByUser(userId: number): Promise<Loan[]> {
    try {
      const query = 'SELECT * FROM loans WHERE user_id = $1 AND status = $2 ORDER BY loan_date DESC';
      const result = await pool.query(query, [userId, 'active']);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar empréstimos ativos do usuário:', error);
      throw error;
    }
  }

  static async getOverdueLoans(): Promise<Loan[]> {
    try {
      const query = 'SELECT * FROM loans WHERE status = $1 AND due_date < CURRENT_DATE ORDER BY due_date';
      const result = await pool.query(query, ['active']);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar empréstimos atrasados:', error);
      throw error;
    }
  }

  static async createLoan(userId: number, bookId: number, dueDate: Date): Promise<Loan> {
    try {
      const query = 'INSERT INTO loans (user_id, book_id, loan_date, due_date) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *';
      const result = await pool.query(query, [userId, bookId, dueDate]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      throw error;
    }
  }

  static async returnBook(loanId: number): Promise<Loan | null> {
    try {
      const query = 'UPDATE loans SET return_date = CURRENT_DATE, status = $1 WHERE id = $2 RETURNING *';
      const result = await pool.query(query, ['returned', loanId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao devolver livro:', error);
      throw error;
    }
  }

  static async updateLoanStatus(loanId: number, status: 'active' | 'overdue' | 'returned'): Promise<Loan | null> {
    try {
      const query = 'UPDATE loans SET status = $1 WHERE id = $2 RETURNING *';
      const result = await pool.query(query, [status, loanId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar status do empréstimo:', error);
      throw error;
    }
  }
}