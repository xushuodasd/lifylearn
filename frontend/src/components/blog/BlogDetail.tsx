import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../../services/blogService';
import { BlogPost } from '../../types/blog';
import { DetailContainer } from '../layout/DetailContainer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getBlogPostById(id);
        setBlogPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取博客详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-secondary/20 rounded-full mb-4"></div>
          <div className="text-lg text-text-secondary font-medium">加载博客中...</div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center glass-card p-12 rounded-3xl">
          <div className="text-6xl mb-4 opacity-50">📝</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">未找到博客</h2>
          <p className="text-text-secondary">{error || '您查找的博客不存在。'}</p>
        </div>
      </div>
    );
  }

  return (
    <DetailContainer maxWidth="4xl">
      <article className="relative">
        <header className="mb-10 pb-10 border-b border-white/5 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-text-primary leading-tight tracking-tight">
            {blogPost.title}
          </h1>
          <div className="flex items-center gap-6 text-text-secondary text-sm font-medium">
            <span className="flex items-center gap-2 bg-surface-highlight/30 px-3 py-1.5 rounded-lg border border-white/5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(blogPost.created_at).toLocaleDateString()}
            </span>
            {blogPost.updated_at !== blogPost.created_at && (
              <span className="flex items-center gap-2 bg-surface-highlight/30 px-3 py-1.5 rounded-lg border border-white/5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                更新于: {new Date(blogPost.updated_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </header>
        
        <div className="prose prose-invert prose-lg max-w-none text-text-primary leading-relaxed relative z-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ node, inline, className, src, alt, title, ...props }) => (
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  className={`${className || ''} max-w-full h-auto rounded-lg border border-border`}
                  {...props}
                />
              ),
              p: ({ children, ...props }) => (
                <p className="mb-6 text-lg text-text-secondary/90" {...props}>
                  {children}
                </p>
              ),
              pre: ({ children, ...props }) => (
                <pre className="mb-6 p-4 bg-surface-highlight rounded-lg overflow-x-auto" {...props}>
                  {children}
                </pre>
              ),
              code: ({ inline, children, className, ...props }) => {
                if (inline) {
                  return (
                    <code className="bg-surface-highlight px-1.5 py-0.5 rounded text-blue-400" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary" {...props}>
                  {children}
                </blockquote>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="text-text-secondary/90" {...props}>
                  {children}
                </li>
              ),
              h1: ({ children, ...props }) => (
                <h1 className="text-3xl font-bold mb-6 text-text-primary" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className="text-2xl font-bold mb-4 text-text-primary" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="text-xl font-bold mb-3 text-text-primary" {...props}>
                  {children}
                </h3>
              ),
              h4: ({ children, ...props }) => (
                <h4 className="text-lg font-bold mb-2 text-text-primary" {...props}>
                  {children}
                </h4>
              ),
              h5: ({ children, ...props }) => (
                <h5 className="font-bold mb-2 text-text-primary" {...props}>
                  {children}
                </h5>
              ),
              h6: ({ children, ...props }) => (
                <h6 className="font-bold mb-2 text-text-secondary" {...props}>
                  {children}
                </h6>
              ),
              a: ({ children, href, ...props }) => (
                <a 
                  href={href} 
                  className="text-blue-400 hover:text-blue-300 underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              )
            }}
          >
            {blogPost.content}
          </ReactMarkdown>
        </div>
      </article>
    </DetailContainer>
  );
};

export default BlogDetail;
