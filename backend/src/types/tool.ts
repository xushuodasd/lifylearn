export interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  category?: string;
  created_at: string;
}

export interface CreateTool {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export interface UpdateTool {
  name?: string;
  description?: string;
  url?: string;
  category?: string;
}
