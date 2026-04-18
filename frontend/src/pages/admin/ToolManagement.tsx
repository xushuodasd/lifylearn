/**
 * 工具管理页面
 */

import { useState, useEffect } from 'react';
import ToolList from '../../components/admin/ToolList';
import ToolForm from '../../components/admin/ToolForm';
import { Tool } from '../../types/tool';
import { getTools } from '../../services/toolService';

const ToolManagement = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 获取工具列表
  const fetchTools = async () => {
    try {
      setLoading(true);
      const data = await getTools();
      setTools(data);
    } catch (error) {
      console.error('获取工具列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // 打开添加工具表单
  const handleAddTool = () => {
    setSelectedTool(null);
    setIsFormOpen(true);
  };

  // 打开编辑工具表单
  const handleEditTool = (tool: Tool) => {
    setSelectedTool(tool);
    setIsFormOpen(true);
  };

  // 关闭表单
  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchTools(); // 重新获取工具列表
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">工具管理</h1>
        <button
          onClick={handleAddTool}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          添加工具
        </button>
      </div>

      {/* 表单或列表 */}
      {isFormOpen ? (
        <ToolForm tool={selectedTool} onClose={handleFormClose} />
      ) : (
        <ToolList 
          tools={tools} 
          loading={loading} 
          onEdit={handleEditTool} 
          onRefresh={fetchTools} 
        />
      )}
    </div>
  );
};

export default ToolManagement;