import { cachedFetchApi } from './apiCache';
import { BlogPost } from '../types/blog';

/**
 * 获取博客列表
 * @returns 博客列表
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  return cachedFetchApi<BlogPost[]>('/blogs');
}

/**
 * 根据ID获取博客详情
 * @param id 博客ID
 * @returns 博客详情
 */
export async function getBlogPostById(id: string): Promise<BlogPost> {
  return cachedFetchApi<BlogPost>(`/blogs/${id}`);
}

/**
 * 根据标签获取博客列表
 * @param tag 标签
 * @returns 博客列表
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return cachedFetchApi<BlogPost[]>(`/blogs?tag=${tag}`);
}
