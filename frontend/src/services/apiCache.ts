/**
 * API 请求缓存和防抖工具
 */

import { fetchApi } from './apiClient';

/**
 * 缓存项类型
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

/**
 * API 缓存类
 */
class ApiCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private debounceTimers: Map<string, number> = new Map();
  private defaultExpiry = 5 * 60 * 1000; // 默认缓存过期时间：5分钟
  private maxCacheSize = 100; // 最大缓存项数量
  private cacheAccessOrder: string[] = []; // 缓存访问顺序，用于LRU淘汰策略

  /**
   * 生成缓存键
   * @param endpoint API 端点
   * @param options 请求选项
   * @returns 缓存键
   */
  private generateCacheKey(endpoint: string, options: RequestInit = {}): string {
    const { method = 'GET', body, headers } = options;
    
    // 对于GET请求，只考虑method和endpoint，因为GET请求不应该有body
    // 并且通常headers不会影响GET请求的结果（除非是认证等特殊情况）
    if (method === 'GET') {
      return `${method}:${endpoint}`;
    }
    
    // 对于非GET请求，考虑method、endpoint、body和headers
    const bodyStr = body ? JSON.stringify(body) : '';
    const headersStr = headers ? JSON.stringify(headers) : '';
    return `${method}:${endpoint}:${bodyStr}:${headersStr}`;
  }

  /**
   * 检查缓存是否有效
   * @param key 缓存键
   * @returns 是否有效
   */
  private isCacheValid(key: string): boolean {
    if (!this.cache.has(key)) {
      return false;
    }

    const item = this.cache.get(key)!;
    const now = Date.now();
    return now - item.timestamp < item.expiry;
  }

  /**
   * 更新缓存访问顺序（用于LRU策略）
   * @param key 缓存键
   */
  private updateCacheAccessOrder(key: string): void {
    // 从访问顺序列表中移除当前键
    const index = this.cacheAccessOrder.indexOf(key);
    if (index !== -1) {
      this.cacheAccessOrder.splice(index, 1);
    }
    // 将当前键添加到访问顺序列表的末尾
    this.cacheAccessOrder.push(key);
  }

  /**
   * 检查并清理超出大小限制的缓存（使用LRU策略）
   */
  private checkCacheSize(): void {
    while (this.cache.size > this.maxCacheSize && this.cacheAccessOrder.length > 0) {
      // 删除最久未使用的缓存项（访问顺序列表的第一个元素）
      const oldestKey = this.cacheAccessOrder.shift();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  /**
   * 获取缓存数据
   * @param key 缓存键
   * @returns 缓存数据或 null
   */
  private getCache<T>(key: string): T | null {
    if (!this.isCacheValid(key)) {
      this.cache.delete(key);
      // 从访问顺序列表中移除无效的键
      const index = this.cacheAccessOrder.indexOf(key);
      if (index !== -1) {
        this.cacheAccessOrder.splice(index, 1);
      }
      return null;
    }

    // 更新缓存访问顺序
    this.updateCacheAccessOrder(key);
    return this.cache.get(key)!.data;
  }

  /**
   * 设置缓存数据
   * @param key 缓存键
   * @param data 数据
   * @param expiry 过期时间（毫秒）
   */
  private setCache<T>(key: string, data: T, expiry: number = this.defaultExpiry): void {
    // 更新缓存访问顺序
    this.updateCacheAccessOrder(key);
    
    // 设置缓存数据
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry,
    });
    
    // 检查并清理超出大小限制的缓存
    this.checkCacheSize();
  }

  /**
   * 清除缓存
   * @param endpoint 可选的 API 端点，不提供则清除所有缓存
   */
  clearCache(endpoint?: string): void {
    if (endpoint) {
      // 清除指定端点的所有缓存
      for (const key of this.cache.keys()) {
        if (key.includes(endpoint)) {
          this.cache.delete(key);
          // 从访问顺序列表中移除对应的键
          const index = this.cacheAccessOrder.indexOf(key);
          if (index !== -1) {
            this.cacheAccessOrder.splice(index, 1);
          }
        }
      }
    } else {
      // 清除所有缓存
      this.cache.clear();
      this.cacheAccessOrder = [];
    }
  }

  /**
   * 带缓存的 API 请求
   * @param endpoint API 端点
   * @param options 请求选项
   * @param expiry 缓存过期时间（毫秒）
   * @returns 响应数据
   */
  async cachedFetch<T>(endpoint: string, options: RequestInit = {}, expiry: number = this.defaultExpiry): Promise<T> {
    // 只对 GET 请求使用缓存
    if (options.method && options.method !== 'GET') {
      return fetchApi<T>(endpoint, options);
    }

    const cacheKey = this.generateCacheKey(endpoint, options);

    // 检查缓存
    const cachedData = this.getCache<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // 缓存未命中，执行请求
    const data = await fetchApi<T>(endpoint, options);
    
    // 缓存响应数据
    this.setCache(cacheKey, data, expiry);
    
    return data;
  }

  /**
   * 带防抖的 API 请求
   * @param endpoint API 端点
   * @param options 请求选项
   * @param delay 防抖延迟（毫秒）
   * @returns 响应数据
   */
  debouncedFetch<T>(endpoint: string, options: RequestInit = {}, delay: number = 300): Promise<T> {
    return new Promise((resolve, reject) => {
      const cacheKey = this.generateCacheKey(endpoint, options);

      // 清除之前的定时器
      if (this.debounceTimers.has(cacheKey)) {
        clearTimeout(this.debounceTimers.get(cacheKey)!);
      }

      // 设置新的定时器
      const timer = setTimeout(async () => {
        try {
          const data = await fetchApi<T>(endpoint, options);
          resolve(data);
        } catch (error) {
          reject(error);
        } finally {
          this.debounceTimers.delete(cacheKey);
        }
      }, delay);

      this.debounceTimers.set(cacheKey, timer);
    });
  }

  /**
   * 带缓存和防抖的 API 请求
   * @param endpoint API 端点
   * @param options 请求选项
   * @param expiry 缓存过期时间（毫秒）
   * @param delay 防抖延迟（毫秒）
   * @returns 响应数据
   */
  async cachedDebouncedFetch<T>(endpoint: string, options: RequestInit = {}, expiry: number = this.defaultExpiry, delay: number = 300): Promise<T> {
    // 只对 GET 请求使用缓存
    if (options.method && options.method !== 'GET') {
      return this.debouncedFetch<T>(endpoint, options, delay);
    }

    const cacheKey = this.generateCacheKey(endpoint, options);

    // 检查缓存
    const cachedData = this.getCache<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // 缓存未命中，执行防抖请求
    return this.debouncedFetch<T>(endpoint, options, delay).then((data) => {
      // 缓存响应数据
      this.setCache(cacheKey, data, expiry);
      return data;
    });
  }
}

// 导出单例实例
export const apiCache = new ApiCache();

/**
 * 带缓存的 API 请求函数
 * @param endpoint API 端点
 * @param options 请求选项
 * @param expiry 缓存过期时间（毫秒）
 * @returns 响应数据
 */
export async function cachedFetchApi<T>(endpoint: string, options: RequestInit = {}, expiry?: number): Promise<T> {
  return apiCache.cachedFetch<T>(endpoint, options, expiry);
}

/**
 * 带防抖的 API 请求函数
 * @param endpoint API 端点
 * @param options 请求选项
 * @param delay 防抖延迟（毫秒）
 * @returns 响应数据
 */
export async function debouncedFetchApi<T>(endpoint: string, options: RequestInit = {}, delay?: number): Promise<T> {
  return apiCache.debouncedFetch<T>(endpoint, options, delay);
}

/**
 * 带缓存和防抖的 API 请求函数
 * @param endpoint API 端点
 * @param options 请求选项
 * @param expiry 缓存过期时间（毫秒）
 * @param delay 防抖延迟（毫秒）
 * @returns 响应数据
 */
export async function cachedDebouncedFetchApi<T>(endpoint: string, options: RequestInit = {}, expiry?: number, delay?: number): Promise<T> {
  return apiCache.cachedDebouncedFetch<T>(endpoint, options, expiry, delay);
}

/**
 * 清除 API 缓存
 * @param endpoint 可选的 API 端点，不提供则清除所有缓存
 */
export function clearApiCache(endpoint?: string): void {
  apiCache.clearCache(endpoint);
}
