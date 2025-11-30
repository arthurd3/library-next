'use server';

import { FineDao } from '@/src/db/finesdb';
import pool from '@/src/db/connection/db';

export interface FineForTable {
  id: number;
  bookTitle: string;
  amount: string;
  dueDate: string;
  status: 'pending' | 'paid';
}

export async function getFinesForTable(userId: number): Promise<FineForTable[]> {
  try {
    const fines = await FineDao.getFinesByUser(userId);

    // Query para buscar títulos dos livros
    const fineIds = fines.map(fine => fine.id);
    if (fineIds.length === 0) return [];

    const query = `
      SELECT f.id, b.title as book_title, f.amount, f.due_date, f.status
      FROM fines f
      LEFT JOIN loans l ON f.loan_id = l.id
      LEFT JOIN books b ON l.book_id = b.id
      WHERE f.user_id = $1
      ORDER BY f.created_at DESC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows.map(row => ({
      id: row.id,
      bookTitle: row.book_title || 'Livro desconhecido',
      amount: `R$ ${parseFloat(row.amount).toFixed(2).replace('.', ',')}`,
      dueDate: new Date(row.due_date).toISOString().split('T')[0],
      status: row.status,
    }));
  } catch (error) {
    console.error('Erro ao buscar multas para tabela:', error);
    throw error;
  }
}