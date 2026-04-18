/**
 * 管理员上下文
 */

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { loginAdmin } from '../services/adminService';
import { AdminContextType, AdminState, AdminAction } from '../types/admin';

// 初始状态
const initialState: AdminState = {
  isAuthenticated: false,
};

// 创建上下文
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Reducer函数
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { isAuthenticated: true };
    case 'LOGOUT':
      return { isAuthenticated: false };
    default:
      return state;
  }
}

// 上下文提供者Props
interface AdminProviderProps {
  children: ReactNode;
}

// 上下文提供者组件
export function AdminProvider({ children }: AdminProviderProps) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // 检查本地存储中的认证状态
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
      if (isAuthenticated) {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }
    };

    checkAuth();
  }, []);

  // 登录方法
  const login = async (password: string) => {
    try {
      await loginAdmin(password);
      dispatch({ type: 'LOGIN_SUCCESS' });
      localStorage.setItem('admin_authenticated', 'true');
    } catch (error) {
      throw error;
    }
  };

  // 登出方法
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('admin_authenticated');
  };

  // 上下文值
  const value: AdminContextType = {
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

// 自定义Hook，用于访问管理员上下文
export function useAdminContext() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
}
