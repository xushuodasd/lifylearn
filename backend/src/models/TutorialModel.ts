import { getDatabase } from '../config/database';
import { Tutorial, CreateTutorial, UpdateTutorial } from '../types/tutorial';
import { InternalServerError } from '../utils/errors';

export class TutorialModel {
  /**
   * 获取所有教程
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 教程列表
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<Tutorial[]> {
    const db = await getDatabase();
    const offset = (page - 1) * pageSize;
    return db.all<Tutorial[]>(
      'SELECT * FROM tutorials ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [pageSize, offset]
    );
  }

  /**
   * 获取教程总数
   * @returns 教程总数
   */
  static async count(): Promise<number> {
    const db = await getDatabase();
    const result = await db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM tutorials'
    );
    return result?.count || 0;
  }

  /**
   * 根据ID获取教程
   * @param id 教程ID
   * @returns 教程对象或null
   */
  static async getById(id: number): Promise<Tutorial | null> {
    const db = await getDatabase();
    const result = await db.get<Tutorial | null>(
      'SELECT * FROM tutorials WHERE id = ?',
      [id]
    );
    return result ?? null;
  }

  /**
   * 创建教程
   * @param data 教程数据
   * @returns 创建的教程对象
   */
  static async create(data: CreateTutorial): Promise<Tutorial> {
    const db = await getDatabase();
    const { title, content, category, difficulty, image } = data;
    const result = await db.run(
      'INSERT INTO tutorials (title, content, category, difficulty, image) VALUES (?, ?, ?, ?, ?)',
      [title, content, category, difficulty, image]
    );
    const tutorial = await TutorialModel.getById(result.lastID || 0);
    if (!tutorial) {
      throw new InternalServerError('创建教程失败');
    }
    return tutorial;
  }

  /**
   * 更新教程
   * @param id 教程ID
   * @param data 教程更新数据
   * @returns 更新后的教程对象或null
   */
  static async update(
    id: number,
    data: UpdateTutorial
  ): Promise<Tutorial | null> {
    const db = await getDatabase();
    const { title, content, category, difficulty, image } = data;
    await db.run(
      'UPDATE tutorials SET title = ?, content = ?, category = ?, difficulty = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, category, difficulty, image, id]
    );
    return this.getById(id);
  }

  /**
   * 删除教程
   * @param id 教程ID
   * @returns 是否删除成功
   */
  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM tutorials WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  /**
   * 根据分类获取教程
   * @param category 分类名称
   * @returns 教程列表
   */
  static async getByCategory(category: string): Promise<Tutorial[]> {
    const db = await getDatabase();
    return db.all<Tutorial[]>(
      'SELECT * FROM tutorials WHERE category = ? ORDER BY created_at DESC',
      [category]
    );
  }

  /**
   * 根据难度获取教程
   * @param difficulty 难度等级
   * @returns 教程列表
   */
  static async getByDifficulty(difficulty: string): Promise<Tutorial[]> {
    const db = await getDatabase();
    return db.all<Tutorial[]>(
      'SELECT * FROM tutorials WHERE difficulty = ? ORDER BY created_at DESC',
      [difficulty]
    );
  }
}
