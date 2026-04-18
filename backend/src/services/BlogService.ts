import { BlogModel } from '../models/BlogModel';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '../types/blog';
import { validateBlogData } from '../utils/validation-utils';
import { ValidationError, NotFoundError } from '../utils/errors';

/**
 * 转换博客文章数据格式，使其与前端期望的格式一致
 * @param blog 从数据库获取的博客文章数据
 * @returns 转换后的博客文章数据
 */
function transformBlogPost(blog: any): any {
  // 从content中提取前100个字符作为摘要（如果summary为空）
  const generateSummary = (content: string): string => {
    // 移除HTML标签
    const plainText = content.replace(/<[^>]*>/g, '');
    // 截取前100个字符
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  };

  return {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    summary: blog.summary || generateSummary(blog.content),
    author: blog.author || '未知作者',
    date: blog.created_at || blog.date || '',
    readTime: blog.readTime || Math.ceil(blog.content.length / 500), // 估算阅读时间
    category: blog.category || '未分类',
    tags: blog.tags ? blog.tags.split(',') : [],
    imageUrl: blog.imageUrl
  };
}

/**
 * 博客服务类
 * 处理与博客相关的业务逻辑
 */
export class BlogService {
  /**
   * 获取所有博客文章
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 包含博客文章列表和分页信息的对象
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    data: BlogPost[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const [data, total] = await Promise.all([
      BlogModel.getAll(page, pageSize),
      BlogModel.count(),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    return {
      data: data.map(transformBlogPost),
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  /**
   * 根据ID获取博客文章
   * @param id 博客文章ID
   * @returns 博客文章对象
   * @throws NotFoundError 如果博客文章不存在
   */
  static async getById(id: number): Promise<BlogPost> {
    const blog = await BlogModel.getById(id);
    if (!blog) {
      throw new NotFoundError('博客文章不存在');
    }
    return transformBlogPost(blog);
  }

  /**
   * 创建博客文章
   * @param data 博客文章数据
   * @returns 创建的博客文章对象
   * @throws ValidationError 如果数据验证失败
   */
  static async create(data: CreateBlogPost): Promise<BlogPost> {
    const validation = validateBlogData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }
    
    const createdBlog = await BlogModel.create(data);
    return transformBlogPost(createdBlog);
  }

  /**
   * 更新博客文章
   * @param id 博客文章ID
   * @param data 博客文章更新数据
   * @returns 更新后的博客文章对象
   * @throws ValidationError 如果数据验证失败
   * @throws NotFoundError 如果博客文章不存在
   */
  static async update(id: number, data: UpdateBlogPost): Promise<BlogPost> {
    const validation = validateBlogData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }

    const updatedBlog = await BlogModel.update(id, data);
    if (!updatedBlog) {
      throw new NotFoundError('博客文章不存在');
    }
    return transformBlogPost(updatedBlog);
  }

  /**
   * 删除博客文章
   * @param id 博客文章ID
   * @returns 是否删除成功
   * @throws NotFoundError 如果博客文章不存在
   */
  static async delete(id: number): Promise<boolean> {
    const success = await BlogModel.delete(id);
    if (!success) {
      throw new NotFoundError('博客文章不存在');
    }
    return success;
  }

  /**
   * 根据分类获取博客文章
   * @param category 分类名称
   * @returns 博客文章列表
   */
  static async getByCategory(category: string): Promise<BlogPost[]> {
    if (!category || typeof category !== 'string') {
      throw new ValidationError('分类不能为空');
    }
    const blogs = await BlogModel.getByCategory(category);
    return blogs.map(transformBlogPost);
  }

}
