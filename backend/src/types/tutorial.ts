export interface Tutorial {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  category?: string;
  difficulty?: string;
  image?: string;
}

export interface CreateTutorial {
  title: string;
  content: string;
  category?: string;
  difficulty?: string;
  image?: string;
}

export interface UpdateTutorial {
  title?: string;
  content?: string;
  category?: string;
  difficulty?: string;
  image?: string;
}
