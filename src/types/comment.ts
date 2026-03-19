export interface Comment {
  id: number;
  slug: string;
  author: string;
  content: string;
  password?: string;
  created_at: string;
  updated_at?: string;
  reply_to?: number;
}
