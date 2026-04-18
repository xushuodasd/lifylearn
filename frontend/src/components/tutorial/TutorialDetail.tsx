import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTutorialById } from '../../services/tutorialService';
import { Tutorial } from '../../types/tutorial';
import { DetailContainer } from '../layout/DetailContainer';

const TutorialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchTutorialDetail = async () => {
        try {
          const tutorialData = await getTutorialById(id);
          setTutorial(tutorialData);
        } catch (error) {
          console.error('Failed to fetch tutorial:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTutorialDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-secondary/20 rounded-full mb-4"></div>
          <div className="text-lg text-text-secondary font-medium">加载教程中...</div>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center glass-card p-12 rounded-3xl">
          <div className="text-6xl mb-4 opacity-50">📚</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">未找到教程</h2>
          <p className="text-text-secondary">您查找的教程不存在。</p>
        </div>
      </div>
    );
  }

  return (
    <DetailContainer maxWidth="4xl">
      <div className="relative">
        <div className="pb-10 border-b border-white/5 relative z-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-secondary via-pink-500 to-indigo-500 opacity-30"></div>
          
          <div className="flex flex-wrap gap-3 mb-8 pt-8">
            <span className="bg-secondary/10 text-secondary-light border border-secondary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {tutorial.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
              tutorial.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
              tutorial.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
              'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              {tutorial.difficulty}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-primary leading-tight tracking-tight">
            {tutorial.title}
          </h1>
          
          <div className="flex items-center gap-6 text-text-secondary text-sm font-medium">
            <span className="flex items-center gap-2 bg-surface-highlight/30 px-3 py-1.5 rounded-lg border border-white/5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              发布于 {new Date(tutorial.created_at).toLocaleDateString()}
            </span>
            {tutorial.updated_at !== tutorial.created_at && (
              <span className="flex items-center gap-2 bg-surface-highlight/30 px-3 py-1.5 rounded-lg border border-white/5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                更新于 {new Date(tutorial.updated_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="py-10">
          <div className="prose prose-invert prose-lg max-w-none text-text-primary leading-relaxed">
            {tutorial.content.split('\n').map((paragraph, index) => (
              paragraph ? <p key={index} className="mb-6 text-lg text-text-secondary/90">{paragraph}</p> : <br key={index} />
            ))}
          </div>
        </div>
        
        <div className="py-6 border-t border-white/5 flex justify-between items-center">
          <span className="text-text-secondary text-sm font-medium">觉得这篇教程有帮助吗？</span>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-full hover:bg-surface/50 border border-transparent hover:border-white/10 transition-colors text-text-secondary hover:text-pink-400" title="Like">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
            </button>
            <button className="p-2.5 rounded-full hover:bg-surface/50 border border-transparent hover:border-white/10 transition-colors text-text-secondary hover:text-indigo-400" title="Share">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </DetailContainer>
  );
};

export default TutorialDetail;
