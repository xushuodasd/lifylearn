/**
 * 教程表单组件
 */

import { useState, useEffect } from 'react';
import { Tutorial } from '../../types/tutorial';
import { Category } from '../../types/category';
import { createTutorial, updateTutorial } from '../../services/adminService';
import { getCategoriesByModule } from '../../services/categoryService';

interface TutorialFormProps {
  tutorial: Tutorial | null;
  onClose: () => void;
}

const TutorialForm = ({ tutorial, onClose }: TutorialFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [error, setError] = useState('');

  // 难度选项
  const difficultyOptions = ['初级', '中级', '高级'];

  // 获取教程分类列表
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const tutorialCategories = await getCategoriesByModule('tutorial');
        setCategories(tutorialCategories);
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
    if (tutorial) {
      setTitle(tutorial.title);
      setContent(tutorial.content);
      setCategory(tutorial.category);
      setDifficulty(tutorial.difficulty);
    } else {
      setTitle('');
      setContent('');
      setCategory('');
      setDifficulty('');
    }
  }, [tutorial]);

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tutorial) {
        // 更新教程
        await updateTutorial(tutorial.id.toString(), { title, content, category, difficulty });
      } else {
        // 创建教程
        await createTutorial({ title, content, category, difficulty });
      }

      onClose();
    } catch (err) {
      setError('保存失败，请重试');
      console.error('保存教程失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {tutorial ? '编辑教程' : '添加教程'}
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
            htmlFor="title"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            标题
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            rows={10}
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

        <div className="mb-4">
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            难度
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            required
          >
            <option value="">请选择难度</option>
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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

export default TutorialForm;