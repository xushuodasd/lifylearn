import { cachedFetchApi, clearApiCache } from './apiCache';
import { Tutorial } from '../types/tutorial';

export { clearApiCache };

/**
 * 获取教程列表
 * @returns 教程列表
 */
export async function getTutorials(): Promise<Tutorial[]> {
  return cachedFetchApi<Tutorial[]>('/tutorials');
}

/**
 * 根据ID获取教程详情
 * @param id 教程ID
 * @returns 教程详情
 */
export async function getTutorialById(id: string): Promise<Tutorial> {
  return cachedFetchApi<Tutorial>(`/tutorials/${id}`);
}

/**
 * 根据分类获取教程列表
 * @param category 分类
 * @returns 教程列表
 */
export async function getTutorialsByCategory(category: string): Promise<Tutorial[]> {
  return cachedFetchApi<Tutorial[]>(`/tutorials?category=${category}`);
}

/**
 * 根据难度获取教程列表
 * @param difficulty 难度
 * @returns 教程列表
 */
export async function getTutorialsByDifficulty(difficulty: string): Promise<Tutorial[]> {
  return cachedFetchApi<Tutorial[]>(`/tutorials?difficulty=${difficulty}`);
}
