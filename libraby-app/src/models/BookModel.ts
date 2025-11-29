interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: number;
  cover_url?: string;
  available: boolean;
  created_at: Date;
}

export type { Book };