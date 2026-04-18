import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth-utils';
import { UnauthorizedError } from '../utils/errors';

/**
 * 认证中间件
 * @param req 请求对象
 * @param res 响应对象
 * @param next 下一步函数
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedError('缺少认证令牌');
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedError('无效的认证令牌');
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      throw new UnauthorizedError('认证令牌已过期或无效');
    }
    
    // 将管理员ID存储在请求对象中
    (req as any).adminId = decoded.adminId;
    
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * 可选认证中间件
 * @param req 请求对象
 * @param res 响应对象
 * @param next 下一步函数
 */
export function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      
      if (token) {
        const decoded = verifyToken(token);
        
        if (decoded) {
          (req as any).adminId = decoded.adminId;
        }
      }
    }
    
    next();
  } catch (error) {
    // 可选认证，错误不影响请求继续
    next();
  }
}
