import { getDatabase } from '../config/database';
import { Category, CreateCategory, UpdateCategory } from '../types/category';
import { InternalServerError } from '../utils/errors';

export class CategoryModel {
  /**
   * 获取所有分类
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 分类列表
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<Category[]> {
    const db = await getDatabase();
    const offset = (page - 1) * pageSize;
    return db.all<Category[]>(
      'SELECT * FROM categories ORDER BY name ASC LIMIT ? OFFSET ?',
      [pageSize, offset]
    );
  }

  /**
   * 获取分类总数
   * @returns 分类总数
   */
  static async count(): Promise<number> {
    const db = await getDatabase();
    const result = await db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM categories'
    );
    return result?.count || 0;
  }

  /**
   * 根据ID获取分类
   * @param id 分类ID
   * @returns 分类对象或null
   */
  static async getById(id: number): Promise<Category | null> {
    const db = await getDatabase();
    const result = await db.get<Category | null>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );
    return result ?? null;
  }

  /**
   * 创建分类
   * @param data 分类数据
   * @returns 创建的分类对象
   */
  static async create(data: CreateCategory): Promise<Category> {
    const db = await getDatabase();
    const { name, description, module } = data;
    const result = await db.run(
      'INSERT INTO categories (name, description, module) VALUES (?, ?, ?)',
      [name, description, module]
    );
    const category = await CategoryModel.getById(result.lastID || 0);
    if (!category) {
      throw new InternalServerError('创建分类失败');
    }
    return category;
  }

  /**
   * 更新分类
   * @param id 分类ID
   * @param data 分类更新数据
   * @returns 更新后的分类对象或null
   */
  static async update(
    id: number,
    data: UpdateCategory
  ): Promise<Category | null> {
    const db = await getDatabase();
    const { name, description, module } = data;
    await db.run(
      'UPDATE categories SET name = ?, description = ?, module = ? WHERE id = ?',
      [name, description, module, id]
    );
    return this.getById(id);
  }

  /**
   * 根据模块获取分类
   * @param module 模块名称
   * @returns 分类列表
   */
  static async getByModule(module: string): Promise<Category[]> {
    const db = await getDatabase();
    return db.all<Category[]>(
      'SELECT * FROM categories WHERE module = ? ORDER BY name ASC',
      [module]
    );
  }

  /**
   * 删除分类
   * @param id 分类ID
   * @returns 是否删除成功
   */
  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM categories WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }
}
