import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import PageSidebar from '../components/layout/PageSidebar';
import { getKnowledgePosts } from '../services/knowledgeService';

const KnowledgePage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const posts = await getKnowledgePosts();
        // Extract categories and filter out duplicates
        const allCategories = posts.map(post => post.category).filter(Boolean);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch knowledge categories', error);
      }
    };

    fetchCategories();
  }, []);

  const sidebarSections = [
    {
      title: '知识分类',
      items: [
        { label: '全部内容', href: '/knowledge' },
        ...categories.map(category => ({
          label: category,
          href: `/knowledge?category=${encodeURIComponent(category)}`
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

export default KnowledgePage;