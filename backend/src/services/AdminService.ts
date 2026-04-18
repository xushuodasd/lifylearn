import { AdminModel } from '../models/AdminModel';
import { Admin, AuthResponse } from '../types/admin';
import { hashPassword, verifyPassword, generateToken } from '../utils/auth-utils';
import { UnauthorizedError } from '../utils/errors';

export class AdminService {
  /**
   * 管理员登录
   * @param password 密码
   * @returns 认证响应，包含令牌和管理员信息
   */
  static async login(password: string): Promise<AuthResponse> {
    // 使用固定的用户名 'admin'
    const admin = await AdminModel.getByUsername('admin');
    
    if (!admin) {
      throw new UnauthorizedError('管理员不存在');
    }
    
    const isPasswordValid = await verifyPassword(password, admin.password_hash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedError('密码错误');
    }
    
    const { token, expires_at } = generateToken(admin.id);
    
    return {
      token,
      expires_at,
      admin: {
        id: admin.id,
        username: admin.username
      }
    };
  }

  /**
   * 获取管理员信息
   * @param adminId 管理员ID
   * @returns 管理员信息
   */
  static async getAdminInfo(adminId: number): Promise<Admin> {
    const admin = await AdminModel.getById(adminId);
    
    if (!admin) {
      throw new UnauthorizedError('管理员不存在');
    }
    
    return admin;
  }

  /**
   * 初始化默认管理员
   * @returns 是否初始化成功
   */
  static async initDefaultAdmin(): Promise<boolean> {
    const admin = await AdminModel.getByUsername('admin');
    
    if (!admin) {
      // 默认密码: admin123
      const hashedPassword = await hashPassword('admin123');
      await AdminModel.create({
        username: 'admin',
        password_hash: hashedPassword
      });
      return true;
    }
    
    return false;
  }
}
