import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import PageSidebar from '../components/layout/PageSidebar';
import { getTutorials } from '../services/tutorialService';

const TutorialPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const [difficulties, setDifficulties] = useState<string[]>([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const tutorials = await getTutorials();
        
        const allCategories = tutorials.map(tutorial => tutorial.category).filter(Boolean);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);

        const allDifficulties = tutorials.map(tutorial => tutorial.difficulty).filter(Boolean);
        const uniqueDifficulties = Array.from(new Set(allDifficulties));
        setDifficulties(uniqueDifficulties);

      } catch (error) {
        console.error('Failed to fetch tutorial metadata', error);
      }
    };

    fetchMetadata();
  }, []);

  const sidebarSections = [
    {
      title: '教程分类',
      items: [
        { label: '全部教程', href: '/tutorials' },
        ...categories.map(category => ({
          label: category,
          href: `/tutorials?category=${encodeURIComponent(category)}`
        }))
      ]
    },
    {
      title: '难度等级',
      items: difficulties.map(difficulty => ({
        label: difficulty,
        href: `/tutorials?difficulty=${encodeURIComponent(difficulty)}`
      }))
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

export default TutorialPage;
