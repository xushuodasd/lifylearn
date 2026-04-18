import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

/**
 * 错误处理中间件
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('发生错误:', err);
  
  // 定义默认错误信息
  let statusCode = 500;
  let errorMessage = '服务器内部错误';
  
  // 根据错误类型设置不同的错误信息
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    errorMessage = err.message;
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    errorMessage = err.message;
  } else if (err.name === 'BadRequestError') {
    statusCode = 400;
    errorMessage = err.message;
  }
  
  // 返回统一的错误响应格式
  res.status(statusCode).json({
    status: 'error',
    error: errorMessage,
    code: statusCode,
    timestamp: new Date().toISOString()
  });
};

/**
 * 404 错误处理中间件
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`未找到路径: ${req.originalUrl}`);
  (error as any).name = 'NotFoundError';
  (error as any).statusCode = 404;
  next(error);
};

