/**
 * 管理员相关API服务
 */

import { fetchApi } from './apiClient';
import { BlogPost } from '../types/blog';
import { Tutorial } from '../types/tutorial';
import { Tool } from '../types/tool';
import { Category } from '../types/category';

/**
 * 管理员登录
 * @param password 密码
 * @returns 登录结果
 */
export async function loginAdmin(password: string): Promise<void> {
  try {
    await fetchApi('/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  } catch (error) {
    throw new Error('密码错误');
  }
}

/**
 * 博客管理
 */

/**
 * 创建博客
 * @param blog 博客数据
 * @returns 创建的博客
 */
export async function createBlogPost(blog: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
  return fetchApi<BlogPost>('/blogs', {
    method: 'POST',
    body: JSON.stringify(blog),
  });
}

/**
 * 更新博客
 * @param id 博客ID
 * @param blog 博客数据
 * @returns 更新后的博客
 */
export async function updateBlogPost(id: string, blog: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
  return fetchApi<BlogPost>(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blog),
  });
}

/**
 * 删除博客
 * @param id 博客ID
 */
export async function deleteBlogPost(id: string): Promise<void> {
  return fetchApi<void>(`/blogs/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 教程管理
 */

/**
 * 创建教程
 * @param tutorial 教程数据
 * @returns 创建的教程
 */
export async function createTutorial(tutorial: Omit<Tutorial, 'id' | 'created_at' | 'updated_at'>): Promise<Tutorial> {
  return fetchApi<Tutorial>('/tutorials', {
    method: 'POST',
    body: JSON.stringify(tutorial),
  });
}

/**
 * 更新教程
 * @param id 教程ID
 * @param tutorial 教程数据
 * @returns 更新后的教程
 */
export async function updateTutorial(id: string, tutorial: Omit<Tutorial, 'id' | 'created_at' | 'updated_at'>): Promise<Tutorial> {
  return fetchApi<Tutorial>(`/tutorials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tutorial),
  });
}

/**
 * 删除教程
 * @param id 教程ID
 */
export async function deleteTutorial(id: string): Promise<void> {
  return fetchApi<void>(`/tutorials/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 工具管理
 */

/**
 * 创建工具
 * @param tool 工具数据
 * @returns 创建的工具
 */
export async function createTool(tool: Omit<Tool, 'id' | 'created_at'>): Promise<Tool> {
  return fetchApi<Tool>('/tools', {
    method: 'POST',
    body: JSON.stringify(tool),
  });
}

/**
 * 更新工具
 * @param id 工具ID
 * @param tool 工具数据
 * @returns 更新后的工具
 */
export async function updateTool(id: string, tool: Omit<Tool, 'id' | 'created_at'>): Promise<Tool> {
  return fetchApi<Tool>(`/tools/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tool),
  });
}

/**
 * 删除工具
 * @param id 工具ID
 */
export async function deleteTool(id: string): Promise<void> {
  return fetchApi<void>(`/tools/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 分类管理
 */

/**
 * 创建分类
 * @param category 分类数据
 * @returns 创建的分类
 */
export async function createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
  return fetchApi<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  });
}

/**
 * 更新分类
 * @param id 分类ID
 * @param category 分类数据
 * @returns 更新后的分类
 */
export async function updateCategory(id: string, category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
  return fetchApi<Category>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(category),
  });
}

/**
 * 删除分类
 * @param id 分类ID
 */
export async function deleteCategory(id: string): Promise<void> {
  return fetchApi<void>(`/categories/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 获取分类列表
 * @param type 分类类型
 * @returns 分类列表
 */
export async function getCategories(type?: 'blog' | 'tutorial' | 'tool'): Promise<Category[]> {
  const endpoint = type ? `/categories?type=${type}` : '/categories';
  return fetchApi<Category[]>(endpoint);
}
