/**
 * 管理员相关类型定义
 */

/**
 * 管理员登录请求
 */
export interface LoginRequest {
  password: string;
}

/**
 * 管理员登录响应
 */
export interface LoginResponse {
  success: boolean;
  message?: string;
}

/**
 * 管理员上下文类型
 */
export interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

/**
 * 管理员状态
 */
export interface AdminState {
  isAuthenticated: boolean;
}

/**
 * 管理员操作类型
 */
export type AdminAction =
  | { type: 'LOGIN_SUCCESS' }
  | { type: 'LOGOUT' };
