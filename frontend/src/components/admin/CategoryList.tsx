/**
 * 分类列表组件
 */

import { Category } from '../../types/category';
import { deleteCategory } from '../../services/categoryService';

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onRefresh: () => void;
}

const CategoryList = ({ categories, loading, onEdit, onRefresh }: CategoryListProps) => {
  // 删除分类
  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个分类吗？')) {
      try {
        await deleteCategory(id);
        onRefresh();
      } catch (error) {
        console.error('删除分类失败:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-text-secondary">加载中...</div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                描述
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                模块
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">
                    {category.description || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-surface-secondary text-text-secondary">
                    {category.module === 'blog' ? '博客' : category.module === 'tutorial' ? '教程' : '工具'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-primary hover:text-primary/80 mr-3"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(category.id.toString())}
                    className="text-destructive hover:text-destructive/80"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {categories.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-text-secondary">暂无分类</div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;