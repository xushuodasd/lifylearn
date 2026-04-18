/**
 * 分类管理页面
 */

import { useState, useEffect } from 'react';
import CategoryList from '../../components/admin/CategoryList';
import CategoryForm from '../../components/admin/CategoryForm';
import { Category } from '../../types/category';
import { getCategories, getCategoriesByModule } from '../../services/categoryService';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>('all');

  // 模块选项
  const moduleOptions = [
    { value: 'all', label: '全部模块' },
    { value: 'blog', label: '博客模块' },
    { value: 'tutorial', label: '教程模块' },
    { value: 'tool', label: '工具模块' }
  ];

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      setLoading(true);
      let data;
      if (selectedModule === 'all') {
        data = await getCategories();
      } else {
        data = await getCategoriesByModule(selectedModule);
      }
      setCategories(data);
    } catch (error) {
      console.error('获取分类列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [selectedModule]);

  // 打开添加分类表单
  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  // 打开编辑分类表单
  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  // 关闭表单
  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchCategories(); // 重新获取分类列表
  };

  // 处理模块选择变化
  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModule(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作区 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">分类管理</h1>
          <div className="mt-2">
            <label htmlFor="module" className="text-sm text-text-secondary mr-2">筛选模块:</label>
            <select
              id="module"
              value={selectedModule}
              onChange={handleModuleChange}
              className="px-3 py-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            >
              {moduleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleAddCategory}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          添加分类
        </button>
      </div>

      {/* 表单或列表 */}
      {isFormOpen ? (
        <CategoryForm category={selectedCategory} onClose={handleFormClose} />
      ) : (
        <CategoryList 
          categories={categories} 
          loading={loading} 
          onEdit={handleEditCategory} 
          onRefresh={fetchCategories} 
        />
      )}
    </div>
  );
};

export default CategoryManagement;