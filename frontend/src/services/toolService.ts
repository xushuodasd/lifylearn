import { fetchApi } from './apiClient';
import { cachedFetchApi, clearApiCache } from './apiCache';
import { Tool } from '../types/tool';

/**
 * 获取工具列表
 * @returns 工具列表
 */
export async function getTools(): Promise<Tool[]> {
  return cachedFetchApi<Tool[]>('/tools');
}

/**
 * 根据ID获取工具详情
 * @param id 工具ID
 * @returns 工具详情
 */
export async function getToolById(id: string): Promise<Tool> {
  return cachedFetchApi<Tool>(`/tools/${id}`);
}

/**
 * 根据分类获取工具列表
 * @param category 分类
 * @returns 工具列表
 */
export async function getToolsByCategory(category: string): Promise<Tool[]> {
  return cachedFetchApi<Tool[]>(`/tools?category=${category}`);
}

/**
 * 创建新工具
 * @param tool 工具数据
 * @returns 创建的工具
 */
export async function createTool(tool: Omit<Tool, 'id' | 'created_at'>): Promise<Tool> {
  const newTool = await fetchApi<Tool>('/tools', {
    method: 'POST',
    body: JSON.stringify(tool),
  });
  
  // 清除工具相关缓存，确保下次获取最新数据
  clearApiCache('/tools');
  
  return newTool;
}
