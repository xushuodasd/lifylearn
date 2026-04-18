import { Request, Response } from 'express';
import { BlogService } from '../services/BlogService';
import {
  handleGetAll,
  handleGetById,
  handleCreate,
  handleUpdate,
  handleDelete,
} from '../utils/controller-utils';
import { BadRequestError } from '../utils/errors';

export class BlogController {
  /**
   * 获取所有博客文章
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    await handleGetAll(req, res, BlogService.getAll, '博客');
  }

  /**
   * 根据ID获取博客文章
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getById(req: Request, res: Response): Promise<void> {
    await handleGetById(req, res, BlogService.getById, '博客');
  }

  /**
   * 创建博客文章
   * @param req 请求对象
   * @param res 响应对象
   */
  static async create(req: Request, res: Response): Promise<void> {
    await handleCreate(
      req,
      res,
      BlogService.create,
      () => ({ isValid: true, errors: [] }),
      '博客'
    );
  }

  /**
   * 更新博客文章
   * @param req 请求对象
   * @param res 响应对象
   */
  static async update(req: Request, res: Response): Promise<void> {
    await handleUpdate(
      req,
      res,
      BlogService.update,
      () => ({ isValid: true, errors: [] }),
      '博客'
    );
  }

  /**
   * 删除博客文章
   * @param req 请求对象
   * @param res 响应对象
   */
  static async delete(req: Request, res: Response): Promise<void> {
    await handleDelete(req, res, BlogService.delete, '博客');
  }

  /**
   * 根据分类获取博客文章
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = req.params.category;
      if (!category || typeof category !== 'string') {
        throw new BadRequestError('分类不能为空');
      }
      const blogs = await BlogService.getByCategory(category);
      res.status(200).json({
        status: 'success',
        data: blogs,
        message: '获取分类博客成功',
      });
    } catch (error) {
      console.error('获取分类博客失败:', error);
      // 重新抛出错误，让错误处理中间件处理
      throw error;
    }
  }

}
