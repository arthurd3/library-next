'use server';

import { UserDao } from '@/src/db/userdb';
import { BookDao } from '@/src/db/bookdb';
import { LoanDao } from '@/src/db/loansdb';
import { FineDao } from '@/src/db/finesdb';

export interface AdminStats {
  totalUsers: number;
  totalBooks: number;
  activeLoans: number;
  pendingFines: number;
  monthlyRevenue: number;
  returnRate: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    // Total de usuários
    const users = await UserDao.getAllUsers();
    const totalUsers = users.length;

    // Total de livros
    const books = await BookDao.getAllBooks();
    const totalBooks = books.length;

    // Empréstimos ativos
    const allLoans = await LoanDao.getAllLoans();
    const activeLoans = allLoans.filter(loan => loan.status === 'active').length;

    // Multas pendentes
    const allFines = await FineDao.getAllFines();
    const pendingFines = allFines.filter(fine => fine.status === 'pending').length;

    // Receita mensal (multas pagas no mês atual)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const paidFinesThisMonth = allFines.filter(fine => {
      if (fine.status !== 'paid') return false;
      const fineDate = new Date(fine.created_at);
      return fineDate.getMonth() === currentMonth && fineDate.getFullYear() === currentYear;
    });
    const monthlyRevenue = paidFinesThisMonth.reduce((sum, fine) => sum + parseFloat(fine.amount.toString()), 0);

    // Taxa de devolução (empréstimos devolvidos / total de empréstimos finalizados)
    const completedLoans = allLoans.filter(loan => loan.status === 'returned');
    const totalCompletedLoans = completedLoans.length;
    const returnedOnTime = completedLoans.filter(loan => {
      const returnDate = new Date(loan.return_date!);
      const dueDate = new Date(loan.due_date);
      return returnDate <= dueDate;
    }).length;
    const returnRate = totalCompletedLoans > 0 ? (returnedOnTime / totalCompletedLoans) * 100 : 100;

    return {
      totalUsers,
      totalBooks,
      activeLoans,
      pendingFines,
      monthlyRevenue,
      returnRate: Math.round(returnRate * 10) / 10, // Arredondar para 1 casa decimal
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas do admin:', error);
    throw error;
  }
}