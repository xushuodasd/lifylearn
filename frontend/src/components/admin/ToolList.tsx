/**
 * 工具列表组件
 */

import { Tool } from '../../types/tool';
import { deleteTool } from '../../services/adminService';

interface ToolListProps {
  tools: Tool[];
  loading: boolean;
  onEdit: (tool: Tool) => void;
  onRefresh: () => void;
}

const ToolList = ({ tools, loading, onEdit, onRefresh }: ToolListProps) => {
  // 删除工具
  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个工具吗？')) {
      try {
        await deleteTool(id);
        onRefresh();
      } catch (error) {
        console.error('删除工具失败:', error);
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
                链接
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                创建时间
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {tools.map((tool) => (
              <tr key={tool.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{tool.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-secondary line-clamp-2">{tool.description}</div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 break-all"
                  >
                    {tool.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">{tool.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">
                    {new Date(tool.created_at).toLocaleString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(tool)}
                    className="text-primary hover:text-primary/80 mr-3"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id.toString())}
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
      
      {tools.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-text-secondary">暂无工具</div>
        </div>
      )}
    </div>
  );
};

export default ToolList;