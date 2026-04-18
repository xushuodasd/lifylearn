import { getDatabase } from '../config/database';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '../types/blog';
import { InternalServerError } from '../utils/errors';

export class BlogModel {
  /**
   * 获取所有博客文章
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 博客文章列表
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<BlogPost[]> {
    const db = await getDatabase();
    const offset = (page - 1) * pageSize;
    return db.all<BlogPost[]>(
      'SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [pageSize, offset]
    );
  }

  /**
   * 获取博客文章总数
   * @returns 博客文章总数
   */
  static async count(): Promise<number> {
    const db = await getDatabase();
    const result = await db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM blog_posts'
    );
    return result?.count || 0;
  }

  /**
   * 根据ID获取博客文章
   * @param id 博客文章ID
   * @returns 博客文章对象或null
   */
  static async getById(id: number): Promise<BlogPost | null> {
    const db = await getDatabase();
    const result = await db.get<BlogPost | null>(
      'SELECT * FROM blog_posts WHERE id = ?',
      [id]
    );
    return result ?? null;
  }

  /**
   * 创建博客文章
   * @param data 博客文章数据
   * @returns 创建的博客文章对象
   */
  static async create(data: CreateBlogPost): Promise<BlogPost> {
    const db = await getDatabase();
    const { title, content, category, tags } = data;
    const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '');
    
    const result = await db.run(
      'INSERT INTO blog_posts (title, content, category, tags) VALUES (?, ?, ?, ?)',
      [title, content, category, tagsStr]
    );
    const blog = await BlogModel.getById(result.lastID || 0);
    if (!blog) {
      throw new InternalServerError('创建博客文章失败');
    }
    return blog;
  }

  /**
   * 更新博客文章
   * @param id 博客文章ID
   * @param data 博客文章更新数据
   * @returns 更新后的博客文章对象或null
   */
  static async update(
    id: number,
    data: UpdateBlogPost
  ): Promise<BlogPost | null> {
    const db = await getDatabase();
    const { title, content, category, tags } = data;
    const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '');
    
    await db.run(
      'UPDATE blog_posts SET title = ?, content = ?, category = ?, tags = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, category, tagsStr, id]
    );
    return this.getById(id);
  }

  /**
   * 删除博客文章
   * @param id 博客文章ID
   * @returns 是否删除成功
   */
  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run('DELETE FROM blog_posts WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  /**
   * 根据分类获取博客文章
   * @param category 分类名称
   * @returns 博客文章列表
   */
  static async getByCategory(category: string): Promise<BlogPost[]> {
    const db = await getDatabase();
    return db.all<BlogPost[]>(
      'SELECT * FROM blog_posts WHERE category = ? ORDER BY created_at DESC',
      [category]
    );
  }

}  
