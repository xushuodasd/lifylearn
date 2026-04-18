import { Request, Response } from 'express';
import { parseWordToMarkdown } from '../utils/word-parser';
import fs from 'fs';

/**
 * 处理图片上传
 * @param req 请求对象
 * @param res 响应对象
 */
export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      error: '请选择要上传的文件',
      code: 400
    });
  }

  // 返回图片 URL
  const imageUrl = `/uploads/${req.file.filename}`;
  
  res.status(200).json({
    status: 'success',
    data: {
      url: imageUrl
    },
    message: '上传成功'
  });
};

/**
 * 处理 Word 文档导入
 * @param req 请求对象
 * @param res 响应对象
 */
export const importWord = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      error: '请选择要导入的 Word 文档',
      code: 400
    });
  }

  try {
    const markdown = await parseWordToMarkdown(req.file.path);
    
    // 导入完成后，可以选择是否保留原文件
    // 这里我们保留原文件，因为用户可能还需要下载链接
    
    res.status(200).json({
      status: 'success',
      data: {
        markdown
      },
      message: 'Word 文档导入成功'
    });
  } catch (error) {
    console.error('Word 导入失败:', error);
    res.status(500).json({
      status: 'error',
      error: 'Word 文档解析失败',
      code: 500
    });
  }
};
