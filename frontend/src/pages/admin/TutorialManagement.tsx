/**
 * 教程管理页面
 */

import { useState, useEffect } from 'react';
import TutorialList from '../../components/admin/TutorialList';
import TutorialForm from '../../components/admin/TutorialForm';
import { Tutorial } from '../../types/tutorial';
import { getTutorials } from '../../services/tutorialService';

const TutorialManagement = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 获取教程列表
  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const data = await getTutorials();
      setTutorials(data);
    } catch (error) {
      console.error('获取教程列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  // 打开添加教程表单
  const handleAddTutorial = () => {
    setSelectedTutorial(null);
    setIsFormOpen(true);
  };

  // 打开编辑教程表单
  const handleEditTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setIsFormOpen(true);
  };

  // 关闭表单
  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchTutorials(); // 重新获取教程列表
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">教程管理</h1>
        <button
          onClick={handleAddTutorial}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          添加教程
        </button>
      </div>

      {/* 表单或列表 */}
      {isFormOpen ? (
        <TutorialForm tutorial={selectedTutorial} onClose={handleFormClose} />
      ) : (
        <TutorialList 
          tutorials={tutorials} 
          loading={loading} 
          onEdit={handleEditTutorial} 
          onRefresh={fetchTutorials} 
        />
      )}
    </div>
  );
};

export default TutorialManagement;