export interface Category {
  id: number;
  name: string;
  description?: string;
  module: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategory {
  name: string;
  description?: string;
  module: string;
}

export interface UpdateCategory {
  name?: string;
  description?: string;
  module?: string;
}
