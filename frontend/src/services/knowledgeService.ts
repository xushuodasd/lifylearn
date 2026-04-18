/**
 * 知识碎片服务
 */

import { fetchApi } from './apiClient';

/**
 * 知识碎片类型
 */
export interface KnowledgePost {
  id: number;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: string;
  readTime: number;
  tags?: string[];
  category: string;
  imageUrl?: string;
}

/**
 * 获取所有知识碎片
 * @returns 知识碎片列表
 */
export async function getKnowledgePosts(): Promise<KnowledgePost[]> {
  try {
    const result = await fetchApi<any>('/blogs');
    // fetchApi已经处理了标准API格式，直接返回结果
    // 但需要确保返回的是数组
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Failed to fetch knowledge posts', error);
    return [];
  }
}

/**
 * 根据ID获取知识碎片详情
 * @param id 知识碎片ID
 * @returns 知识碎片详情
 */
export async function getKnowledgePostById(id: string): Promise<KnowledgePost | null> {
  try {
    return await fetchApi<KnowledgePost>(`/blogs/${id}`);
  } catch (error) {
    console.error(`Failed to fetch knowledge post ${id}`, error);
    return null;
  }
}

/**
 * 根据标签获取知识碎片
 * @param tag 标签
 * @returns 知识碎片列表
 */
export async function getKnowledgePostsByTag(tag: string): Promise<KnowledgePost[]> {
  try {
    return await fetchApi<KnowledgePost[]>(`/blogs?tag=${encodeURIComponent(tag)}`);
  } catch (error) {
    console.error(`Failed to fetch knowledge posts by tag ${tag}`, error);
    return [];
  }
}

/**
 * 根据分类获取知识碎片
 * @param category 分类
 * @returns 知识碎片列表
 */
export async function getKnowledgePostsByCategory(category: string): Promise<KnowledgePost[]> {
  try {
    return await fetchApi<KnowledgePost[]>(`/blogs/category/${encodeURIComponent(category)}`);
  } catch (error) {
    console.error(`Failed to fetch knowledge posts by category ${category}`, error);
    return [];
  }
}

/**
 * 搜索知识碎片
 * @param query 搜索关键词
 * @returns 知识碎片列表
 */
export async function searchKnowledgePosts(query: string): Promise<KnowledgePost[]> {
  try {
    return await fetchApi<KnowledgePost[]>(`/blogs/search?q=${encodeURIComponent(query)}`);
  } catch (error) {
    console.error(`Failed to search knowledge posts: ${query}`, error);
    return [];
  }
}