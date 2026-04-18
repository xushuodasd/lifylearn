/**
 * 教程列表组件
 */

import { Tutorial } from '../../types/tutorial';
import { deleteTutorial } from '../../services/adminService';

interface TutorialListProps {
  tutorials: Tutorial[];
  loading: boolean;
  onEdit: (tutorial: Tutorial) => void;
  onRefresh: () => void;
}

const TutorialList = ({ tutorials, loading, onEdit, onRefresh }: TutorialListProps) => {
  // 删除教程
  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这篇教程吗？')) {
      try {
        await deleteTutorial(id);
        onRefresh();
      } catch (error) {
        console.error('删除教程失败:', error);
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
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                难度
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                创建时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                更新时间
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {tutorials.map((tutorial) => (
              <tr key={tutorial.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{tutorial.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">{tutorial.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-surface-secondary text-text-secondary">
                    {tutorial.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">
                    {new Date(tutorial.created_at).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">
                    {new Date(tutorial.updated_at).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(tutorial)}
                    className="text-primary hover:text-primary/80 mr-3"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(tutorial.id.toString())}
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
      
      {tutorials.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-text-secondary">暂无教程</div>
        </div>
      )}
    </div>
  );
};

export default TutorialList;