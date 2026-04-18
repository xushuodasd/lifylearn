import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getKnowledgePostById } from '../../services/knowledgeService';
import { KnowledgePost } from '../../services/knowledgeService';
import { DetailContainer } from '../layout/DetailContainer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const KnowledgeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<KnowledgePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setError('知识碎片ID不存在');
          setLoading(false);
          return;
        }
        
        setLoading(true);
        setError(null);
        const result = await getKnowledgePostById(id);
        setPost(result);
      } catch (err) {
        setError('加载知识碎片详情失败');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate('/knowledge');
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-400">加载中...</div>;
  }

  if (error || !post) {
    return <div className="text-center py-20 text-red-400">{error || '知识碎片未找到'}</div>;
  }

  return (
    <DetailContainer maxWidth="5xl">
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/10 text-primary-light border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-text-secondary text-sm flex items-center gap-1 bg-surface-highlight/30 px-2 py-0.5 rounded-md border border-white/5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {post.date}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-primary tracking-tight">{post.title}</h1>
            
            {post.imageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden border border-white/5">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-80 object-cover"
                />
              </div>
            )}
            
            <div className="bg-surface-highlight/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 mb-10">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code className="bg-gray-800 rounded px-1.5 py-0.5 text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-700 px-4 py-2 bg-gray-800 text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-700 px-4 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-text-primary">标签</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {(post.tags || []).map((tag, index) => (
                  <Link 
                    key={index}
                    to={`/knowledge?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 text-sm bg-surface-highlight/50 border border-white/5 rounded-full text-text-secondary hover:bg-surface-highlight/70 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 bg-surface-highlight/30 border border-white/5 rounded-xl text-text-secondary hover:bg-surface-highlight/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                返回知识碎片
              </button>
            </div>
          </div>
        </div>
      </div>
    </DetailContainer>
  );
};

export default KnowledgeDetail;