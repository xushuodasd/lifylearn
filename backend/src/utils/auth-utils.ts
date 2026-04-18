import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * 加密密码
 * @param password 原始密码
 * @returns 加密后的密码
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * 验证密码
 * @param password 原始密码
 * @param hashedPassword 加密后的密码
 * @returns 是否验证通过
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * 生成JWT令牌
 * @param adminId 管理员ID
 * @returns JWT令牌和过期时间
 */
export function generateToken(adminId: number): { token: string; expires_at: string } {
  const expiresIn = JWT_EXPIRES_IN;
  const token = jwt.sign({ adminId }, JWT_SECRET, { expiresIn });
  
  const expiresAt = new Date();
  const hoursToAdd = parseInt(expiresIn.replace('h', ''));
  expiresAt.setHours(expiresAt.getHours() + hoursToAdd);
  
  return { token, expires_at: expiresAt.toISOString() };
}

/**
 * 验证JWT令牌
 * @param token JWT令牌
 * @returns 解码后的令牌数据
 */
export function verifyToken(token: string): { adminId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: number };
    return decoded;
  } catch (error) {
    return null;
  }
}
