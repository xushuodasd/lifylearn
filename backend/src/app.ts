import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import path from 'path';
import { corsMiddleware } from './middleware/cors-middleware';
import { loggerMiddleware } from './middleware/logger-middleware';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { rateLimitMiddleware } from './middleware/rate-limit-middleware';
import { initializeDatabase } from './config/database';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app = express();

// 初始化数据库
initializeDatabase()
  .then(() => {
    console.log('数据库初始化成功');
  })
  .catch((error) => {
    console.error('数据库初始化失败:', error);
  });

// 中间件
app.use(rateLimitMiddleware);

// 静态文件服务 - 用于提供上传的图片
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// 设置默认字符集为 UTF-8
app.use((req, res, next) => {
  if (req.path.startsWith('/uploads')) {
    return next();
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// 确保 body-parser 正确处理 UTF-8 编码
app.use(bodyParser.json({ charset: 'utf-8' }));
app.use(bodyParser.urlencoded({ extended: true, charset: 'utf-8' }));

app.use(corsMiddleware);
app.use(loggerMiddleware);

// 路由
app.use(routes);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '服务运行正常',
  });
});

// 处理 favicon.ico 请求
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // 返回 204 No Content
});

// 404 错误处理
app.use(notFoundHandler);

// 全局错误处理
app.use(errorHandler);

export default app;
