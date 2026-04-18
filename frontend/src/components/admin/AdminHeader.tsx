/**
 * 管理员顶部导航栏组件
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../context/AdminContext';

const AdminHeader: React.FC = () => {
  const { logout } = useAdminContext();
  const navigate = useNavigate();

  // 处理登出
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 左侧标题 */}
          <div className="flex items-center">
            <Link to="/admin" className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-900">Lify 管理后台</span>
            </Link>
          </div>

          {/* 右侧用户信息和登出按钮 */}
          <div className="flex items-center space-x-4">
            {/* 用户信息 */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">A</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">管理员</span>
            </div>

            {/* 登出按钮 */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
