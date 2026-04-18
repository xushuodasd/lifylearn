export interface Admin {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLogin {
  password: string;
}

export interface AdminSession {
  id: number;
  admin_id: number;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  expires_at: string;
  admin: {
    id: number;
    username: string;
  };
}
