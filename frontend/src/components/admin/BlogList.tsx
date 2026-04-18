/**
 * 博客列表组件
 */

import { BlogPost } from '../../types/blog';
import { deleteBlogPost } from '../../services/adminService';

interface BlogListProps {
  blogs: BlogPost[];
  loading: boolean;
  onEdit: (blog: BlogPost) => void;
  onRefresh: () => void;
}

const BlogList = ({ blogs, loading, onEdit, onRefresh }: BlogListProps) => {
  // 删除博客
  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这篇博客吗？')) {
      try {
        await deleteBlogPost(id);
        onRefresh();
      } catch (error) {
        console.error('删除博客失败:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface-highlight">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                标签
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                创建时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                更新时间
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-surface-highlight/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{blog.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(blog.tags) ? blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-light"
                      >
                        {tag}
                      </span>
                    )) : blog.tags ? (
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary-light"
                      >
                        {blog.tags}
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-muted">
                    {new Date(blog.created_at).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-muted">
                    {new Date(blog.updated_at).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(blog)}
                    className="text-primary hover:text-primary-light mr-3 transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id.toString())}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {blogs.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-text-muted">暂无博客</div>
        </div>
      )}
    </div>
  );
};

export default BlogList;