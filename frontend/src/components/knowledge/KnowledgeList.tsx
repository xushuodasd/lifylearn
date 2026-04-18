import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContentCard from '../common/ContentCard';
import { getKnowledgePosts, getKnowledgePostsByTag, getKnowledgePostsByCategory } from '../../services/knowledgeService';
import { KnowledgePost } from '../../services/knowledgeService';

const KnowledgeList = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<KnowledgePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    setSelectedTag(tag || null);
    setSelectedCategory(category || null);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let result;
        if (selectedTag) {
          result = await getKnowledgePostsByTag(selectedTag);
        } else if (selectedCategory) {
          result = await getKnowledgePostsByCategory(selectedCategory);
        } else {
          result = await getKnowledgePosts();
        }
        setPosts(result);
      } catch (err) {
        setError('Failed to fetch knowledge posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTag, selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center py-20">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">暂无知识碎片</h3>
        <p className="text-gray-500">稍后再来看看吧。</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">知识碎片</h1>
        <p className="text-gray-400">探索各种碎片化知识，提升专业技能</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((item, index) => (
          <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <ContentCard
              to={`/knowledge/${item.id}`}
              title={item.title}
              description={item.summary}
              image={item.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeList;