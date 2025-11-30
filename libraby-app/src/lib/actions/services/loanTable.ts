'use server';

import { LoanDao } from '@/src/db/loansdb';
import pool from '@/src/db/connection/db';

export interface LoanForTable {
  id: number;
  bookTitle: string;
  author: string;
  userName: string;
  userInitial: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'returned';
}

export async function getLoansForTable(limit: number = 10): Promise<LoanForTable[]> {
  try {
    // Query com joins para buscar empréstimos com informações do livro e usuário
    const query = `
      SELECT
        l.id,
        b.title as book_title,
        b.author,
        u.name as user_name,
        l.due_date,
        l.status,
        l.return_date
      FROM loans l
      LEFT JOIN books b ON l.book_id = b.id
      LEFT JOIN users u ON l.user_id = u.id
      ORDER BY l.created_at DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);

    return result.rows.map(row => {
      // Calcular iniciais do nome do usuário
      const nameParts = row.user_name?.split(' ') || [];
      const userInitial = nameParts.length > 0 ? nameParts[0][0]?.toUpperCase() || 'U' : 'U';

      // Verificar se está atrasado
      let status: 'active' | 'overdue' | 'returned' = row.status;
      if (status === 'active' && new Date(row.due_date) < new Date()) {
        status = 'overdue';
      }

      return {
        id: row.id,
        bookTitle: row.book_title || 'Livro desconhecido',
        author: row.author || 'Autor desconhecido',
        userName: row.user_name || 'Usuário desconhecido',
        userInitial,
        dueDate: new Date(row.due_date).toISOString().split('T')[0],
        status,
      };
    });
  } catch (error) {
    console.error('Erro ao buscar empréstimos para tabela:', error);
    throw error;
  }
}

export async function getLoansForUser(userId: number): Promise<LoanForTable[]> {
  try {
    // Query com joins para buscar empréstimos do usuário específico
    const query = `
      SELECT
        l.id,
        b.title as book_title,
        b.author,
        u.name as user_name,
        l.due_date,
        l.status,
        l.return_date
      FROM loans l
      LEFT JOIN books b ON l.book_id = b.id
      LEFT JOIN users u ON l.user_id = u.id
      WHERE l.user_id = $1 AND l.status IN ('active', 'overdue')
      ORDER BY l.due_date ASC
    `;
    const result = await pool.query(query, [userId]);

    return result.rows.map(row => {
      // Calcular iniciais do nome do usuário
      const nameParts = row.user_name?.split(' ') || [];
      const userInitial = nameParts.length > 0 ? nameParts[0][0]?.toUpperCase() || 'U' : 'U';

      // Verificar se está atrasado
      let status: 'active' | 'overdue' | 'returned' = row.status;
      if (status === 'active' && new Date(row.due_date) < new Date()) {
        status = 'overdue';
      }

      return {
        id: row.id,
        bookTitle: row.book_title || 'Livro desconhecido',
        author: row.author || 'Autor desconhecido',
        userName: row.user_name || 'Usuário desconhecido',
        userInitial,
        dueDate: new Date(row.due_date).toISOString().split('T')[0],
        status,
      };
    });
  } catch (error) {
    console.error('Erro ao buscar empréstimos do usuário:', error);
    throw error;
  }
}