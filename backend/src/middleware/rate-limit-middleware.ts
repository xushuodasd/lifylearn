import rateLimit from 'express-rate-limit';

/**
 * 请求限流中间件
 * 限制每个IP地址的请求频率，防止API被滥用
 */
export const rateLimitMiddleware = rateLimit({
  // 时间窗口，单位为毫秒
  windowMs: 15 * 60 * 1000, // 15分钟

  // 每个IP地址在时间窗口内的最大请求数
  max: 1000, // 15分钟内最多1000个请求（开发环境设置更宽松）

  // 消息提示
  message: {
    status: 'error',
    error: '请求过于频繁，请稍后再试',
    code: 429,
  },

  // 状态码
  statusCode: 429,

  // 跳过健康检查等不需要限流的路径
  skip: (req) => {
    return req.path === '/health';
  },

  // 日志记录
  handler: (req, res) => {
    console.warn(
      `请求限流: ${req.ip} 在 15 分钟内超过了 1000 个请求`
    );
    res.status(429).json({
      status: 'error',
      error: '请求过于频繁，请稍后再试',
      code: 429,
    });
  },
});
