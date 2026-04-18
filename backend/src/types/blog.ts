export interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  category?: string;
  tags?: string;
  author?: string;
  summary?: string;
  readTime?: number;
  imageUrl?: string;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  category?: string;
  tags?: string | string[];
}

export interface UpdateBlogPost {
  title?: string;
  content?: string;
  category?: string;
  tags?: string | string[];
}
