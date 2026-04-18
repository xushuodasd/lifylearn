import { getDatabase } from '../config/database';
import { Admin } from '../types/admin';
import { InternalServerError } from '../utils/errors';

interface CreateAdminData {
  username: string;
  password_hash: string;
}

export class AdminModel {
  /**
   * 根据用户名获取管理员
   * @param username 用户名
   * @returns 管理员对象或null
   */
  static async getByUsername(username: string): Promise<Admin | null> {
    const db = await getDatabase();
    const result = await db.get<Admin | null>(
      'SELECT * FROM admins WHERE username = ?',
      [username]
    );
    return result ?? null;
  }

  /**
   * 根据ID获取管理员
   * @param id 管理员ID
   * @returns 管理员对象或null
   */
  static async getById(id: number): Promise<Admin | null> {
    const db = await getDatabase();
    const result = await db.get<Admin | null>(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );
    return result ?? null;
  }

  /**
   * 创建管理员
   * @param data 管理员数据
   * @returns 创建的管理员对象
   */
  static async create(data: CreateAdminData): Promise<Admin> {
    const db = await getDatabase();
    const { username, password_hash } = data;
    const result = await db.run(
      'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
      [username, password_hash]
    );
    const admin = await AdminModel.getById(result.lastID || 0);
    if (!admin) {
      throw new InternalServerError('创建管理员失败');
    }
    return admin;
  }

  /**
   * 更新管理员
   * @param id 管理员ID
   * @param data 管理员更新数据
   * @returns 更新后的管理员对象或null
   */
  static async update(id: number, data: Partial<CreateAdminData>): Promise<Admin | null> {
    const db = await getDatabase();
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    if (keys.length === 0) {
      return this.getById(id);
    }
    
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE admins SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    await db.run(sql, [...values, id]);
    return this.getById(id);
  }

  /**
   * 删除管理员
   * @param id 管理员ID
   * @returns 是否删除成功
   */
  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM admins WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  /**
   * 获取所有管理员
   * @returns 管理员列表
   */
  static async getAll(): Promise<Admin[]> {
    const db = await getDatabase();
    return db.all<Admin[]>('SELECT * FROM admins ORDER BY created_at DESC');
  }
}
