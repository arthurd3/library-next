export interface Fine {
  id: number;
  user_id: number;
  book_id: number;
  amount: number;
  due_date: Date;
  status: 'pending' | 'paid';
  created_at: Date;
}