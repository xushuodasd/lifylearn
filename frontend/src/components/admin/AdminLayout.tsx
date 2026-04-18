/**
 * 管理员布局组件
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <AdminHeader />
      
      {/* 主内容区 */}
      <div className="flex">
        {/* 侧边导航栏 */}
        <AdminSidebar />
        
        {/* 子路由内容 */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
