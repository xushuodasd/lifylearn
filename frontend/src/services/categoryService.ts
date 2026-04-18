import { cachedFetchApi } from './apiCache';
import { Category, CreateCategory, UpdateCategory } from '../types/category';

/**
 * 获取分类列表
 * @returns 分类列表
 */
export async function getCategories(): Promise<Category[]> {
  return cachedFetchApi<Category[]>('/categories');
}

/**
 * 根据模块获取分类
 * @param module 模块名称
 * @returns 分类列表
 */
export async function getCategoriesByModule(module: string): Promise<Category[]> {
  return cachedFetchApi<Category[]>(`/categories/module/${module}`);
}

/**
 * 根据ID获取分类详情
 * @param id 分类ID
 * @returns 分类详情
 */
export async function getCategoryById(id: string): Promise<Category> {
  return cachedFetchApi<Category>(`/categories/${id}`);
}

/**
 * 创建分类
 * @param category 分类数据
 * @returns 创建的分类
 */
export async function createCategory(category: CreateCategory): Promise<Category> {
  return cachedFetchApi<Category>('/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
}

/**
 * 更新分类
 * @param id 分类ID
 * @param category 分类更新数据
 * @returns 更新后的分类
 */
export async function updateCategory(id: string, category: UpdateCategory): Promise<Category> {
  return cachedFetchApi<Category>(`/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
}

/**
 * 删除分类
 * @param id 分类ID
 * @returns 是否删除成功
 */
export async function deleteCategory(id: string): Promise<boolean> {
  await cachedFetchApi<void>(`/categories/${id}`, {
    method: 'DELETE',
  });
  return true;
}
