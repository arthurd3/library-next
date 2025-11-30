'use server';

import { BookDao } from '@/src/db/bookdb';
import { LoanDao } from '@/src/db/loansdb';
import pool from '@/src/db/connection/db';

export interface UserStats {
  totalBooks: number;
  activeLoans: number;
  booksAcquired: number; // Livros que o usuário já pegou emprestado
  overdueLoans: number;
}

export async function getUserStats(userId?: number): Promise<UserStats> {
  try {
    // Total de livros no acervo
    const allBooks = await BookDao.getAllBooks();
    const totalBooks = allBooks.length;

    // Empréstimos ativos do usuário (se userId fornecido)
    let activeLoans = 0;
    let overdueLoans = 0;
    let booksAcquired = 0;

    if (userId) {
      const userLoans = await LoanDao.getLoansByUser(userId);
      activeLoans = userLoans.filter(loan => loan.status === 'active').length;
      overdueLoans = userLoans.filter(loan => {
        if (loan.status !== 'active') return false;
        return new Date(loan.due_date) < new Date();
      }).length;
      booksAcquired = userLoans.length;
    } else {
      // Estatísticas gerais se não houver userId
      const allLoans = await LoanDao.getAllLoans();
      activeLoans = allLoans.filter(loan => loan.status === 'active').length;
      overdueLoans = allLoans.filter(loan => {
        if (loan.status !== 'active') return false;
        return new Date(loan.due_date) < new Date();
      }).length;
      booksAcquired = allLoans.length;
    }

    return {
      totalBooks,
      activeLoans,
      booksAcquired,
      overdueLoans,
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas do usuário:', error);
    throw error;
  }
}