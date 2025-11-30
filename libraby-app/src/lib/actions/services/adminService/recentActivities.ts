'use server';

import { UserDao } from '@/src/db/userdb';
import { LoanDao } from '@/src/db/loansdb';
import { FineDao } from '@/src/db/finesdb';
import { BookDao } from '@/src/db/bookdb';
import pool from '@/src/db/connection/db';
import { UserPlus, BookOpen, AlertCircle } from 'lucide-react';
import { ComponentType } from 'react';

export interface Activity {
  id: string;
  type: 'user_registered' | 'book_loaned' | 'book_returned' | 'fine_created';
  message: string;
  time: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  timestamp: Date;
}

export async function getRecentActivities(limit: number = 10): Promise<Activity[]> {
  try {
    const activities: Activity[] = [];

    // Buscar usuários recentes
    const recentUsers = await UserDao.getAllUsers();
    const sortedUsers = recentUsers
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    sortedUsers.forEach(user => {
      activities.push({
        id: `user_${user.id}`,
        type: 'user_registered',
        message: `Novo usuário registrado: ${user.name}`,
        time: formatTimeAgo(user.created_at),
        icon: UserPlus,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        timestamp: new Date(user.created_at),
      });
    });

    // Buscar empréstimos recentes
    const allLoansQuery = await pool.query('SELECT * FROM loans ORDER BY created_at DESC');
    const allLoans = allLoansQuery.rows;
    const recentLoans = allLoans.slice(0, 5);

    // Buscar nomes dos usuários e livros para os empréstimos
    const userMap = new Map(recentUsers.map(u => [u.id, u.name]));
    const bookMap = new Map();
    const books = await BookDao.getAllBooks();
    books.forEach(book => bookMap.set(book.id, book.title));

    recentLoans.forEach(loan => {
      const userName = userMap.get(loan.user_id) || 'Usuário desconhecido';
      const bookTitle = bookMap.get(loan.book_id) || 'Livro desconhecido';

      if (loan.status === 'active') {
        activities.push({
          id: `loan_${loan.id}`,
          type: 'book_loaned',
          message: `Livro emprestado: "${bookTitle}" para ${userName}`,
          time: formatTimeAgo(loan.created_at),
          icon: BookOpen,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          timestamp: new Date(loan.created_at),
        });
      } else if (loan.status === 'returned') {
        activities.push({
          id: `return_${loan.id}`,
          type: 'book_returned',
          message: `Livro devolvido: "${bookTitle}" por ${userName}`,
          time: formatTimeAgo(loan.return_date || loan.created_at),
          icon: BookOpen,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          timestamp: new Date(loan.return_date || loan.created_at),
        });
      }
    });

    // Buscar multas recentes
    const allFines = await FineDao.getAllFines();
    const recentFines = allFines
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    recentFines.forEach(fine => {
      const userName = userMap.get(fine.user_id) || 'Usuário desconhecido';
      activities.push({
        id: `fine_${fine.id}`,
        type: 'fine_created',
        message: `Multa gerada para ${userName} (R$ ${fine.amount})`,
        time: formatTimeAgo(fine.created_at),
        icon: AlertCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        timestamp: new Date(fine.created_at),
      });
    });

    // Ordenar todas as atividades por timestamp (mais recentes primeiro) e limitar
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

  } catch (error) {
    console.error('Erro ao buscar atividades recentes:', error);
    throw error;
  }
}

function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''} atrás`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hora${diffInHours !== 1 ? 's' : ''} atrás`;
  } else {
    return `${diffInDays} dia${diffInDays !== 1 ? 's' : ''} atrás`;
  }
}