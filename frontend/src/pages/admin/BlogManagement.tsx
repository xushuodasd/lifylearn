/**
 * 博客管理页面
 */

import { useState, useEffect } from 'react';
import BlogList from '../../components/admin/BlogList';
import BlogForm from '../../components/admin/BlogForm';
import { BlogPost } from '../../types/blog';
import { getBlogPosts } from '../../services/blogService';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 获取博客列表
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts();
      setBlogs(data);
    } catch (error) {
      console.error('获取博客列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 打开添加博客表单
  const handleAddBlog = () => {
    setSelectedBlog(null);
    setIsFormOpen(true);
  };

  // 打开编辑博客表单
  const handleEditBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  // 关闭表单
  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchBlogs(); // 重新获取博客列表
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">博客管理</h1>
        <button
          onClick={handleAddBlog}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          添加博客
        </button>
      </div>

      {/* 表单或列表 */}
      {isFormOpen ? (
        <BlogForm blog={selectedBlog} onClose={handleFormClose} />
      ) : (
        <BlogList 
          blogs={blogs} 
          loading={loading} 
          onEdit={handleEditBlog} 
          onRefresh={fetchBlogs} 
        />
      )}
    </div>
  );
};

export default BlogManagement;