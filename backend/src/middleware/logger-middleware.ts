import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  const { method, url, headers } = req;

  // 记录请求开始
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // 监听响应完成事件
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} ${statusCode} ${duration}ms`
    );
  });

  next();
};
