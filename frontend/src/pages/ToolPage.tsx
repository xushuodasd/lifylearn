import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import PageSidebar from '../components/layout/PageSidebar';
import { getTools } from '../services/toolService';

const ToolPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const tools = await getTools();
        const allCategories = tools.map(tool => tool.category).filter(Boolean);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch tool categories', error);
      }
    };

    fetchCategories();
  }, []);

  const sidebarSections = [
    {
      title: '工具分类',
      items: [
        { label: '全部工具', href: '/tools' },
        ...categories.map(category => ({
          label: category,
          href: `/tools?category=${encodeURIComponent(category)}`
        }))
      ]
    }
  ];

  return (
    <PageLayout
      sidebar={
        <PageSidebar 
          sections={sidebarSections} 
        />
      }
    >
      <Outlet />
    </PageLayout>
  );
};

export default ToolPage;
