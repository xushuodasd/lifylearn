import { Request, Response } from 'express';
import { ToolService } from '../services/ToolService';
import {
  handleGetAll,
  handleGetById,
  handleCreate,
  handleUpdate,
  handleDelete,
} from '../utils/controller-utils';
import { BadRequestError } from '../utils/errors';

export class ToolController {
  /**
   * 获取所有工具
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    await handleGetAll(req, res, ToolService.getAll, '工具');
  }

  /**
   * 根据ID获取工具
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getById(req: Request, res: Response): Promise<void> {
    await handleGetById(req, res, ToolService.getById, '工具');
  }

  /**
   * 创建工具
   * @param req 请求对象
   * @param res 响应对象
   */
  static async create(req: Request, res: Response): Promise<void> {
    await handleCreate(
      req,
      res,
      ToolService.create,
      () => ({ isValid: true, errors: [] }),
      '工具'
    );
  }

  /**
   * 更新工具
   * @param req 请求对象
   * @param res 响应对象
   */
  static async update(req: Request, res: Response): Promise<void> {
    await handleUpdate(
      req,
      res,
      ToolService.update,
      () => ({ isValid: true, errors: [] }),
      '工具'
    );
  }

  /**
   * 删除工具
   * @param req 请求对象
   * @param res 响应对象
   */
  static async delete(req: Request, res: Response): Promise<void> {
    await handleDelete(req, res, ToolService.delete, '工具');
  }

  /**
   * 根据分类获取工具
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = req.params.category;
      if (!category || typeof category !== 'string') {
        throw new BadRequestError('分类不能为空');
      }
      const tools = await ToolService.getByCategory(category);
      res.status(200).json({
        status: 'success',
        data: tools,
        message: '获取分类工具成功',
      });
    } catch (error) {
      console.error('获取分类工具失败:', error);
      // 重新抛出错误，让错误处理中间件处理
      throw error;
    }
  }
}
