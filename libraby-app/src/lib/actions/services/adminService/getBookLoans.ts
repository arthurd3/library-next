'use server';

import pool from '@/src/db/connection/db';
import { UserDao } from '@/src/db/userdb';

interface LoanWithUser {
  id: number;
  user_id: number;
  book_id: number;
  loan_date: Date;
  due_date: Date;
  return_date: Date | null;
  status: string;
  user?: {
    id: number;
    name: string;
    email: string;
    registration: string;
  };
}

export async function getBookLoans(bookId: number): Promise<LoanWithUser[]> {
  try {
    const loansQuery = await pool.query(
      'SELECT * FROM loans WHERE book_id = $1 AND status = $2 ORDER BY loan_date DESC',
      [bookId, 'active']
    );
    const loans = loansQuery.rows;

    // Buscar informações dos usuários para cada empréstimo
    const loansWithUsers = await Promise.all(
      loans.map(async (loan) => {
        const user = await UserDao.getUserById(loan.user_id);
        return {
          ...loan,
          user: user ? {
            id: user.id,
            name: user.name,
            email: user.email,
            registration: user.registration,
          } : undefined
        };
      })
    );

    return loansWithUsers;
  } catch (error) {
    console.error('Erro ao buscar empréstimos do livro:', error);
    throw error;
  }
}