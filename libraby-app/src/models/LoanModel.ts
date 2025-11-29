export interface Loan {
  id: number;
  user_id: number;
  book_id: number;
  loan_date: Date;
  due_date: Date;
  return_date?: Date;
  status: 'active' | 'overdue' | 'returned';
  created_at: Date;
}