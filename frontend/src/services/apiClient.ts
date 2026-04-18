/**
 * API 客户端错误类型
 */
export interface ApiError {
  /** 错误类型 */
  type: 'HTTP_ERROR' | 'NETWORK_ERROR' | 'PARSE_ERROR' | 'UNKNOWN_ERROR';
  /** 错误消息 */
  message: string;
  /** HTTP 状态码（仅 HTTP_ERROR 时存在） */
  status?: number;
  /** 原始错误对象 */
  originalError?: any;
  /** API 端点 */
  endpoint: string;
}

/**
 * API 基础 URL
 * 使用相对路径，配合 Vite 的 proxy 配置
 */
const API_URL = '/api/v1';

/**
 * 通用 API 请求函数
 * @param endpoint API 端点
 * @param options 请求选项
 * @param retryOptions 重试选项
 * @returns 响应数据
 * @throws ApiError 当请求失败时抛出
 */
export async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {},
  retryOptions: {
    maxRetries?: number;
    retryDelay?: number;
    retryableStatuses?: number[];
  } = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // 检查 options.body 是否为 FormData
  const isFormData = options.body instanceof FormData;

  if (isFormData) {
    // 如果是 FormData，删除默认的 Content-Type，让浏览器自动设置
    if (defaultOptions.headers && 'Content-Type' in defaultOptions.headers) {
      delete (defaultOptions.headers as any)['Content-Type'];
    }
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // 再次确保如果是 FormData，Content-Type 被移除（因为 mergedOptions 可能会重新合并 headers）
  if (isFormData && mergedOptions.headers && 'Content-Type' in mergedOptions.headers) {
     delete (mergedOptions.headers as any)['Content-Type'];
  }
  
  const {
    maxRetries = 3,
    retryDelay = 1000,
    retryableStatuses = [408, 429, 500, 502, 503, 504],
  } = retryOptions;
  
  let lastError: ApiError | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      console.log(`Retrying request to ${endpoint} (attempt ${attempt}/${maxRetries})...`);
      // 等待指定的重试延迟
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
    
    try {
      const response = await fetch(url, mergedOptions);
      
      if (!response.ok) {
        // 尝试从响应中获取错误信息
        let errorMessage = `HTTP 错误! 状态码: ${response.status}`;
        
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // 无法解析错误响应，使用默认错误信息
        }
        
        const httpError: ApiError = {
          type: 'HTTP_ERROR',
          message: errorMessage,
          status: response.status,
          endpoint,
        };
        
        // 检查是否应该重试
        if (attempt < maxRetries && retryableStatuses.includes(response.status)) {
          console.error('HTTP error (will retry):', httpError);
          lastError = httpError;
          continue;
        }
        
        console.error('HTTP error:', httpError);
        throw httpError;
      }
      
      try {
        const data = await response.json();
        // 如果响应遵循标准API格式 { status: 'success', data: ... } 或 { success: true, data: ... }，则直接返回 data
        if (data && (data.status === 'success' || data.success === true) && data.data !== undefined) {
          return data.data;
        }
        return data;
      } catch (error) {
        const parseError: ApiError = {
          type: 'PARSE_ERROR',
          message: '解析响应 JSON 失败',
          originalError: error,
          endpoint,
        };
        
        console.error('解析错误:', parseError);
        throw parseError;
      }
    } catch (error) {
      if ('type' in (error as ApiError)) {
        const apiError = error as ApiError;
        // 检查是否是网络错误且应该重试
        if (attempt < maxRetries && apiError.type === 'NETWORK_ERROR') {
          console.error('Network error (will retry):', apiError);
          lastError = apiError;
          continue;
        }
        // 其他错误，直接抛出
        throw error;
      }
      
      // 网络错误或其他未知错误
      const networkError: ApiError = {
        type: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : '发生网络错误',
        originalError: error,
        endpoint,
      };
      
      // 检查是否应该重试
      if (attempt < maxRetries) {
        console.error('网络错误 (将重试):', networkError);
        lastError = networkError;
        continue;
      }
      
      console.error('网络错误:', networkError);
      throw networkError;
    }
  }
  
  // 如果所有重试都失败，抛出最后一个错误
  if (lastError) {
    throw lastError;
  }
  
  // 理论上不会到达这里，但为了类型安全添加
  throw {
    type: 'UNKNOWN_ERROR' as const,
    message: '发生未知错误',
    endpoint,
  };
}
