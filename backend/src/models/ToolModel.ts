import { getDatabase } from '../config/database';
import { Tool, CreateTool, UpdateTool } from '../types/tool';
import { InternalServerError } from '../utils/errors';

export class ToolModel {
  /**
   * 获取所有工具
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 工具列表
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<Tool[]> {
    const db = await getDatabase();
    const offset = (page - 1) * pageSize;
    return db.all<Tool[]>(
      'SELECT * FROM tools ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [pageSize, offset]
    );
  }

  /**
   * 获取工具总数
   * @returns 工具总数
   */
  static async count(): Promise<number> {
    const db = await getDatabase();
    const result = await db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM tools'
    );
    return result?.count || 0;
  }

  /**
   * 根据ID获取工具
   * @param id 工具ID
   * @returns 工具对象或null
   */
  static async getById(id: number): Promise<Tool | null> {
    const db = await getDatabase();
    const result = await db.get<Tool | null>(
      'SELECT * FROM tools WHERE id = ?',
      [id]
    );
    return result ?? null;
  }

  /**
   * 创建工具
   * @param data 工具数据
   * @returns 创建的工具对象
   */
  static async create(data: CreateTool): Promise<Tool> {
    const db = await getDatabase();
    const { name, description, url, category } = data;
    const result = await db.run(
      'INSERT INTO tools (name, description, url, category) VALUES (?, ?, ?, ?)',
      [name, description, url, category]
    );
    const tool = await ToolModel.getById(result.lastID || 0);
    if (!tool) {
      throw new InternalServerError('创建工具失败');
    }
    return tool;
  }

  /**
   * 更新工具
   * @param id 工具ID
   * @param data 工具更新数据
   * @returns 更新后的工具对象或null
   */
  static async update(id: number, data: UpdateTool): Promise<Tool | null> {
    const db = await getDatabase();
    const { name, description, url, category } = data;
    await db.run(
      'UPDATE tools SET name = ?, description = ?, url = ?, category = ? WHERE id = ?',
      [name, description, url, category, id]
    );
    return this.getById(id);
  }

  /**
   * 删除工具
   * @param id 工具ID
   * @returns 是否删除成功
   */
  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM tools WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  /**
   * 根据分类获取工具
   * @param category 分类名称
   * @returns 工具列表
   */
  static async getByCategory(category: string): Promise<Tool[]> {
    const db = await getDatabase();
    return db.all<Tool[]>(
      'SELECT * FROM tools WHERE category = ? ORDER BY created_at DESC',
      [category]
    );
  }
}
