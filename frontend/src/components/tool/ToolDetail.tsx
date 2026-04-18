import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolById } from '../../services/toolService';
import { Tool } from '../../types/tool';
import { DetailContainer } from '../layout/DetailContainer';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        if (!id) return;
        const data = await getToolById(Number(id));
        setTool(data);
      } catch (err) {
        setError('加载工具详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-400">加载中...</div>;
  }

  if (error || !tool) {
    return <div className="text-center py-20 text-red-400">{error || '工具未找到'}</div>;
  }

  return (
    <DetailContainer maxWidth="5xl">
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/10 text-primary-light border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {tool.category}
              </span>
              <span className="text-text-secondary text-sm flex items-center gap-1 bg-surface-highlight/30 px-2 py-0.5 rounded-md border border-white/5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {new Date(tool.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-primary tracking-tight">{tool.name}</h1>
            
            <div className="bg-surface-highlight/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 mb-10">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-primary">
                <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                工具描述
              </h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line text-lg font-light">
                {tool.description}
              </p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 text-lg font-medium transition-all flex items-center gap-2 group"
              >
                访问工具
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-surface/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4 text-text-primary">相关信息</h3>
            <div className="space-y-6">
              <div>
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">链接地址</span>
                <a href={tool.url} target="_blank" rel="noreferrer" className="text-primary-light hover:text-white transition-colors break-all text-sm font-mono bg-surface-highlight/50 p-2 rounded-lg block border border-white/5">
                  {tool.url}
                </a>
              </div>
              <div>
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">分类</span>
                 <span className="inline-block px-3 py-1 rounded-md bg-surface-highlight/50 border border-white/5 text-sm text-text-secondary">
                   {tool.category}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailContainer>
  );
};

export default ToolDetail;
