/**
 * 管理员路由配置
 */

import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';

// 懒加载组件
const LoginPage = lazy(() => import('../pages/admin/LoginPage'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const BlogManagement = lazy(() => import('../pages/admin/BlogManagement'));
const TutorialManagement = lazy(() => import('../pages/admin/TutorialManagement'));
const ToolManagement = lazy(() => import('../pages/admin/ToolManagement'));
const CategoryManagement = lazy(() => import('../pages/admin/CategoryManagement'));
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'));

// 加载状态组件
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-2xl font-semibold text-gray-600">加载中...</div>
  </div>
);

// 认证路由组件
function ProtectedRoute() {
  const { isAuthenticated } = useAdminContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return (
    <Suspense fallback={<Loading />}>
      <AdminLayout />
    </Suspense>
  );
}

// 管理员布局组件（包含子路由）
function AdminLayoutWithOutlet() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminLayout />
    </Suspense>
  );
}

// 仪表盘页面
const DashboardPage = () => (
  <Suspense fallback={<Loading />}>
    <Dashboard />
  </Suspense>
);

// 博客管理页面
const BlogManagementPage = () => (
  <Suspense fallback={<Loading />}>
    <BlogManagement />
  </Suspense>
);

// 教程管理页面
const TutorialManagementPage = () => (
  <Suspense fallback={<Loading />}>
    <TutorialManagement />
  </Suspense>
);

// 工具管理页面
const ToolManagementPage = () => (
  <Suspense fallback={<Loading />}>
    <ToolManagement />
  </Suspense>
);

// 分类管理页面
const CategoryManagementPage = () => (
  <Suspense fallback={<Loading />}>
    <CategoryManagement />
  </Suspense>
);

// 登录页面
const LoginPageComponent = () => (
  <Suspense fallback={<Loading />}>
    <LoginPage />
  </Suspense>
);

// 重定向到登录页
const RedirectToLogin = () => (
  <Navigate to="/admin/login" replace />
);

export {
  ProtectedRoute,
  AdminLayoutWithOutlet,
  DashboardPage,
  BlogManagementPage,
  TutorialManagementPage,
  ToolManagementPage,
  CategoryManagementPage,
  LoginPageComponent,
  RedirectToLogin
};
