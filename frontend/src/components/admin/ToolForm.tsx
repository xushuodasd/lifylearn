/**
 * 工具表单组件
 */

import { useState, useEffect } from 'react';
import { Tool } from '../../types/tool';
import { Category } from '../../types/category';
import { createTool, updateTool } from '../../services/adminService';
import { getCategoriesByModule } from '../../services/categoryService';

interface ToolFormProps {
  tool: Tool | null;
  onClose: () => void;
}

const ToolForm = ({ tool, onClose }: ToolFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取工具分类列表
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const toolCategories = await getCategoriesByModule('tool');
        setCategories(toolCategories);
      } catch (error) {
        console.error('获取分类列表失败:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 初始化表单数据
  useEffect(() => {
    if (tool) {
      setName(tool.name);
      setDescription(tool.description);
      setUrl(tool.url);
      setCategory(tool.category);
    } else {
      setName('');
      setDescription('');
      setUrl('');
      setCategory('');
    }
  }, [tool]);

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tool) {
        // 更新工具
        await updateTool(tool.id.toString(), { name, description, url, category });
      } else {
        // 创建工具
        await createTool({ name, description, url, category });
      }

      onClose();
    } catch (err) {
      setError('保存失败，请重试');
      console.error('保存工具失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {tool ? '编辑工具' : '添加工具'}
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
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            链接
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            分类
          </label>
          {categoriesLoading ? (
            <div className="flex justify-center items-center h-10">
              <div className="text-text-secondary">加载中...</div>
            </div>
          ) : (
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
              required
            >
              <option value="">请选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
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

export default ToolForm;