import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import PageSidebar from '../components/layout/PageSidebar';
import { getBlogPosts } from '../services/blogService';

const BlogPage = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const posts = await getBlogPosts();
        // Extract tags and filter out duplicates
        const allTags = posts.flatMap(post => post.tags || []);
        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags);
      } catch (error) {
        console.error('Failed to fetch blog tags', error);
      }
    };

    fetchTags();
  }, []);

  const sidebarSections = [
    {
      title: '博客分类',
      items: [
        { label: '全部文章', href: '/blogs' },
        ...tags.map(tag => ({
          label: tag,
          href: `/blogs?tag=${encodeURIComponent(tag)}`
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

export default BlogPage;
