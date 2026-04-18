import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';
import {
  handleGetAll,
  handleGetById,
  handleCreate,
  handleUpdate,
  handleDelete,
} from '../utils/controller-utils';

export class CategoryController {
  /**
   * 获取所有分类
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    await handleGetAll(req, res, CategoryService.getAll, '分类');
  }

  /**
   * 根据ID获取分类
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getById(req: Request, res: Response): Promise<void> {
    await handleGetById(req, res, CategoryService.getById, '分类');
  }

  /**
   * 创建分类
   * @param req 请求对象
   * @param res 响应对象
   */
  static async create(req: Request, res: Response): Promise<void> {
    await handleCreate(
      req,
      res,
      CategoryService.create,
      () => ({ isValid: true, errors: [] }),
      '分类'
    );
  }

  /**
   * 更新分类
   * @param req 请求对象
   * @param res 响应对象
   */
  static async update(req: Request, res: Response): Promise<void> {
    await handleUpdate(
      req,
      res,
      CategoryService.update,
      () => ({ isValid: true, errors: [] }),
      '分类'
    );
  }

  /**
   * 删除分类
   * @param req 请求对象
   * @param res 响应对象
   */
  static async delete(req: Request, res: Response): Promise<void> {
    await handleDelete(req, res, CategoryService.delete, '分类');
  }

  /**
   * 根据模块获取分类
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getByModule(req: Request, res: Response): Promise<void> {
    try {
      const { module } = req.params;
      if (!module) {
        res.status(400).json({
          success: false,
          message: '模块参数不能为空',
        });
        return;
      }
      const categories = await CategoryService.getByModule(module);
      res.status(200).json({
        success: true,
        data: categories,
        message: '获取分类成功',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '获取分类失败',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
