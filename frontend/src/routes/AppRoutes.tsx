import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from '../components/common/Navbar';
import { AdminProvider, useAdminContext } from '../context/AdminContext';
import { LoginPageComponent, DashboardPage, BlogManagementPage, TutorialManagementPage, ToolManagementPage, CategoryManagementPage, RedirectToLogin } from './AdminRoutes';

// 懒加载组件
const HomePage = lazy(() => import('../pages/HomePage'));
const KnowledgePage = lazy(() => import('../pages/KnowledgePage'));
const ToolPage = lazy(() => import('../pages/ToolPage'));
const TutorialPage = lazy(() => import('../pages/TutorialPage'));
const TestMdPage = lazy(() => import('../pages/TestMdPage'));
const KnowledgeList = lazy(() => import('../components/knowledge/KnowledgeList'));
const KnowledgeDetail = lazy(() => import('../components/knowledge/KnowledgeDetail'));
const ToolList = lazy(() => import('../components/tool/ToolList'));
const ToolDetail = lazy(() => import('../components/tool/ToolDetail'));

const TutorialList = lazy(() => import('../components/tutorial/TutorialList'));
const TutorialDetail = lazy(() => import('../components/tutorial/TutorialDetail'));

// 加载状态组件
const LoadingFallback = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
};

// Main Layout with Top Navbar
const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <main className="relative">
         {children || <Outlet />}
      </main>
    </div>
  );
};

// 认证路由组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdminContext();
  
  if (!isAuthenticated) {
    return <RedirectToLogin />;
  }
  
  return children;
};

const router = createBrowserRouter(
  [
  {
    element: (
      <AppLayout />
    ),
    path: '/',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'knowledge',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <KnowledgePage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <KnowledgeList />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <KnowledgeDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'tools',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ToolPage />
          </Suspense>
        ),
        children: [
          {
             index: true,
             element: <ToolList />
          },
          {
             path: ':id',
             element: <ToolDetail />
          }
        ]
      },
      {
        path: 'tutorials',
        element: (
           <Suspense fallback={<LoadingFallback />}>
             <TutorialPage />
           </Suspense>
        ),
        children: [
          {
             index: true,
             element: <TutorialList />
          },
          {
             path: ':id',
             element: <TutorialDetail />
          }
        ]
      },
      {
        path: 'test-md',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TestMdPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <LoginPageComponent />,
      },
      {
        path: '',
        element: <ProtectedRoute children={<DashboardPage />} />,
      },
      {
        path: 'blogs',
        element: <ProtectedRoute children={<BlogManagementPage />} />,
      },
      {
        path: 'tutorials',
        element: <ProtectedRoute children={<TutorialManagementPage />} />,
      },
      {
        path: 'tools',
        element: <ProtectedRoute children={<ToolManagementPage />} />,
      },
      {
        path: 'categories',
        element: <ProtectedRoute children={<CategoryManagementPage />} />,
      },
      {
        path: '*',
        element: <RedirectToLogin />,
      },
    ],
  }
],
  {
    future: {
      v7_startTransition: true
    }
  }
);

const AppRoutes = () => {
  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
};

export default AppRoutes;
