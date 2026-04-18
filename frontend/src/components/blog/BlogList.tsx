import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBlogPosts } from '../../services/blogService';
import { BlogPost } from '../../types/blog';
import ListContainer from '../common/ListContainer';
import ContentCard from '../common/ContentCard';

const BlogList = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');

  const fetchData = useCallback(async () => {
    const posts = await getBlogPosts();
    if (tag) {
      return posts.filter(post => post.tags && post.tags.includes(tag));
    }
    return posts;
  }, [tag]);

  // 渲染单个博客项目
  const renderBlogItem = (post: BlogPost) => (
    <div key={post.id} className="h-full">
      <ContentCard
        to={`/blogs/${post.id}`}
        title={post.title}
        description={post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}
        category={post.tags && post.tags.length > 0 ? post.tags[0] : 'Blog'}
      />
    </div>
  );

  // 渲染空状态
  const renderEmpty = () => (
    <div className="text-center py-20 px-8">
      <h3 className="text-2xl font-bold text-gray-200 mb-2">暂无文章</h3>
      <p className="text-gray-500 text-[15px]">新文章发布后将显示在这里。</p>
    </div>
  );

  return (
    <ListContainer
      fetchData={fetchData}
      renderItem={renderBlogItem}
      renderEmpty={renderEmpty}
    />
  );
};

export default BlogList;
