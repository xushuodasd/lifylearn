/**
 * 管理员仪表盘页面
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../../services/blogService';
import { getTutorials } from '../../services/tutorialService';
import { getTools } from '../../services/toolService';
import { getCategories } from '../../services/categoryService';

const Dashboard: React.FC = () => {
  // 真实统计数据
  const [stats, setStats] = useState([
    {
      title: '博客数量',
      value: '0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: '教程数量',
      value: '0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: '工具数量',
      value: '0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: '分类数量',
      value: '0',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
  ]);

  // 获取真实统计数据
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 并行获取所有数据
        const [blogs, tutorials, tools, categories] = await Promise.all([
          getBlogPosts(),
          getTutorials(),
          getTools(),
          getCategories()
        ]);

        // 更新统计数据
        setStats([
          {
            title: '博客数量',
            value: blogs.length.toString(),
            icon: stats[0].icon
          },
          {
            title: '教程数量',
            value: tutorials.length.toString(),
            icon: stats[1].icon
          },
          {
            title: '工具数量',
            value: tools.length.toString(),
            icon: stats[2].icon
          },
          {
            title: '分类数量',
            value: categories.length.toString(),
            icon: stats[3].icon
          }
        ]);
      } catch (error) {
        console.error('获取统计数据失败:', error);
      }
    };

    fetchStats();
  }, []);

  // 快速链接
  const quickLinks = [
    {
      title: '添加博客',
      href: '/admin/blogs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: '添加教程',
      href: '/admin/tutorials',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: '添加工具',
      href: '/admin/tools',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: '添加分类',
      href: '/admin/categories',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
  ];

  // 最近活动
  const recentActivities = [
    {
      type: '添加',
      item: '新博客',
      time: '2024-01-15 14:30',
      status: '成功',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      type: '更新',
      item: '教程',
      time: '2024-01-14 10:15',
      status: '成功',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      type: '删除',
      item: '工具',
      time: '2024-01-13 16:45',
      status: '成功',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
          <span className="w-1.5 h-6 sm:h-8 bg-primary rounded-full"></span>
          仪表盘
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl font-light">
          欢迎回来，管理员！查看您的站点概览和最近活动。
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-text-primary group-hover:scale-105 transition-transform duration-300">{stat.value}</p>
              </div>
              <div className="rounded-full p-3 bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 快速链接和最近活动 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 快速链接 */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
            快速操作
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="rounded-full p-2 bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                  {link.icon}
                </div>
                <span className="font-medium text-text-primary group-hover:text-primary transition-colors duration-300">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
            最近活动
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                <div className="rounded-full p-2 bg-primary/10 text-primary">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.type}了{activity.item}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                </div>
                <span className="text-xs font-medium text-green-400 px-2 py-1 bg-green-400/10 rounded-full">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
