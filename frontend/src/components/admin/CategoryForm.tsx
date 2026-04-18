/**
 * 分类表单组件
 */

import { useState, useEffect } from 'react';
import { Category, CreateCategory, UpdateCategory } from '../../types/category';
import { createCategory, updateCategory } from '../../services/categoryService';

interface CategoryFormProps {
  category: Category | null;
  onClose: () => void;
}

const CategoryForm = ({ category, onClose }: CategoryFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [module, setModule] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 分类模块选项
  const moduleOptions = ['blog', 'tutorial', 'tool'];

  // 初始化表单数据
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
      setModule(category.module);
    } else {
      setName('');
      setDescription('');
      setModule('');
    }
  }, [category]);

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (category) {
        // 更新分类
        await updateCategory(category.id.toString(), { name, description, module });
      } else {
        // 创建分类
        await createCategory({ name, description, module });
      }

      onClose();
    } catch (err) {
      setError('保存失败，请重试');
      console.error('保存分类失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {category ? '编辑分类' : '添加分类'}
        </h2>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            名称
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            描述
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="module"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            模块
          </label>
          <select
            id="module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            required
          >
            <option value="">请选择模块</option>
            {moduleOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'blog' ? '博客' : option === 'tutorial' ? '教程' : '工具'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-md text-text-secondary hover:bg-surface-highlight transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;