'use server';

import { UserDao } from '@/src/db';
import { BookDao } from '@/src/db/bookdb';
import { LoanDao } from '@/src/db/loansdb';
import { revalidatePath } from 'next/cache';

export async function returnBook(formData: FormData) {
  try {
    const loanId = parseInt(formData.get('loanId') as string);
    const userId = parseInt(formData.get('userId') as string);

    // Verificar se o empréstimo existe e pertence ao usuário
    const loan = await LoanDao.getLoanById(loanId);
    if (!loan) {
      return { success: false, message: 'Empréstimo não encontrado' };
    }

    if (loan.user_id !== userId) {
      return { success: false, message: 'Este empréstimo não pertence ao usuário' };
    }

    if (loan.status === 'returned') {
      return { success: false, message: 'Este livro já foi devolvido' };
    }

    // Devolver o livro
    await LoanDao.returnBook(loanId);

    // Atualizar disponibilidade do livro
    await BookDao.updateBookAvailability(loan.book_id, true);

    revalidatePath('/dashboard');
    revalidatePath('/collection');

    return { success: true, message: 'Livro devolvido com sucesso!' };
  } catch (error) {
    console.error('Erro ao devolver livro:', error);
    return { success: false, message: 'Erro ao processar devolução' };
  }
}