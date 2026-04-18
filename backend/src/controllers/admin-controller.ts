import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/AdminService';
import { AdminLogin } from '../types/admin';
import { BadRequestError } from '../utils/errors';

export class AdminController {
  /**
   * 管理员登录
   * @param req 请求对象
   * @param res 响应对象
   * @param next 下一步函数
   */
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { password } = req.body as AdminLogin;
      
      if (!password) {
        throw new BadRequestError('密码不能为空');
      }
      
      const response = await AdminService.login(password);
      
      res.status(200).json({
        status: 'success',
        data: response,
        message: '登录成功'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * 获取管理员信息
   * @param req 请求对象
   * @param res 响应对象
   * @param next 下一步函数
   */
  static async getAdminInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adminId = (req as any).adminId;
      const admin = await AdminService.getAdminInfo(adminId);
      
      res.status(200).json({
        status: 'success',
        data: {
          id: admin.id,
          username: admin.username,
          created_at: admin.created_at
        },
        message: '获取管理员信息成功'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * 初始化默认管理员
   * @param req 请求对象
   * @param res 响应对象
   * @param next 下一步函数
   */
  static async initDefaultAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AdminService.initDefaultAdmin();
      
      res.status(200).json({
        status: 'success',
        data: { initialized: result },
        message: result ? '默认管理员初始化成功' : '默认管理员已存在'
      });
    } catch (error) {
      next(error);
    }
  }
}
