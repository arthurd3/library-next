'use server';

import { UserDao } from '@/src/db';
import { BookDao } from '@/src/db/bookdb';
import { LoanDao } from '@/src/db/loansdb';
import { revalidatePath } from 'next/cache';

export async function borrowBook(formData: FormData) {
  try {
    const userId = parseInt(formData.get('userId') as string);
    const bookId = parseInt(formData.get('bookId') as string);

    // Verificar se o usuário existe
    const user = await UserDao.getUserById(userId);
    if (!user) {
      return { success: false, message: 'Usuário não encontrado' };
    }

    // Verificar se o livro existe e está disponível
    const book = await BookDao.getBookById(bookId);
    if (!book) {
      return { success: false, message: 'Livro não encontrado' };
    }

    if (!book.available) {
      return { success: false, message: 'Este livro não está disponível no momento' };
    }

    // Verificar se o usuário tem empréstimos atrasados
    const userLoans = await LoanDao.getLoansByUser(userId);
    const hasOverdueLoans = userLoans.some(loan => {
      if (loan.status !== 'active') return false;
      return new Date(loan.due_date) < new Date();
    });

    if (hasOverdueLoans) {
      return { success: false, message: 'Você possui empréstimos em atraso. Regularize sua situação antes de fazer novos empréstimos.' };
    }

    // Verificar se o usuário já tem este livro emprestado
    const hasBookLoaned = userLoans.some(loan =>
      loan.book_id === bookId && loan.status === 'active'
    );

    if (hasBookLoaned) {
      return { success: false, message: 'Você já possui este livro emprestado' };
    }

    // Calcular data de vencimento (30 dias a partir de hoje)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    // Criar empréstimo
    await LoanDao.createLoan(userId, bookId, dueDate);

    // Atualizar disponibilidade do livro
    await BookDao.updateBookAvailability(bookId, false);

    revalidatePath('/collection');
    revalidatePath('/dashboard');

    return {
      success: true,
      message: `Empréstimo realizado com sucesso! Devolução até ${dueDate.toLocaleDateString('pt-BR')}.`
    };
  } catch (error) {
    console.error('Erro ao realizar empréstimo:', error);
    return { success: false, message: 'Erro ao processar empréstimo' };
  }
}