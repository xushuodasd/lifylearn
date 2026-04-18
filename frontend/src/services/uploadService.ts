import { fetchApi } from './apiClient';

interface UploadResult {
  url: string;
}

/**
 * 上传图片
 * @param file 图片文件
 * @returns 图片URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const result = await fetchApi<UploadResult>('/upload', {
    method: 'POST',
    body: formData,
  });

  return result.url;
};

interface ImportWordResult {
  markdown: string;
}

/**
 * 导入 Word 文档
 * @param file Word 文件
 * @returns Markdown 内容
 */
export const importWord = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const result = await fetchApi<ImportWordResult>('/import-word', {
    method: 'POST',
    body: formData,
  });

  return result.markdown;
};
