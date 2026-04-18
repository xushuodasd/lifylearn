import { Request, Response } from 'express';
import { TutorialService } from '../services/TutorialService';
import {
  handleGetAll,
  handleGetById,
  handleCreate,
  handleUpdate,
  handleDelete,
} from '../utils/controller-utils';
import { BadRequestError } from '../utils/errors';

export class TutorialController {
  /**
   * 获取所有教程
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    await handleGetAll(req, res, TutorialService.getAll, '教程');
  }

  /**
   * 根据ID获取教程
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getById(req: Request, res: Response): Promise<void> {
    await handleGetById(req, res, TutorialService.getById, '教程');
  }

  /**
   * 创建教程
   * @param req 请求对象
   * @param res 响应对象
   */
  static async create(req: Request, res: Response): Promise<void> {
    await handleCreate(
      req,
      res,
      TutorialService.create,
      () => ({ isValid: true, errors: [] }),
      '教程'
    );
  }

  /**
   * 更新教程
   * @param req 请求对象
   * @param res 响应对象
   */
  static async update(req: Request, res: Response): Promise<void> {
    await handleUpdate(
      req,
      res,
      TutorialService.update,
      () => ({ isValid: true, errors: [] }),
      '教程'
    );
  }

  /**
   * 删除教程
   * @param req 请求对象
   * @param res 响应对象
   */
  static async delete(req: Request, res: Response): Promise<void> {
    await handleDelete(req, res, TutorialService.delete, '教程');
  }

  /**
   * 根据分类获取教程
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = req.params.category;
      if (!category || typeof category !== 'string') {
        throw new BadRequestError('分类不能为空');
      }
      const tutorials = await TutorialService.getByCategory(category);
      res.status(200).json({
        status: 'success',
        data: tutorials,
        message: '获取分类教程成功',
      });
    } catch (error) {
      console.error('获取分类教程失败:', error);
      // 重新抛出错误，让错误处理中间件处理
      throw error;
    }
  }

  /**
   * 根据难度获取教程
   * @param req 请求对象
   * @param res 响应对象
   */
  static async getByDifficulty(req: Request, res: Response): Promise<void> {
    try {
      const difficulty = req.params.difficulty;
      if (!difficulty || typeof difficulty !== 'string') {
        throw new BadRequestError('难度不能为空');
      }
      const tutorials = await TutorialService.getByDifficulty(difficulty);
      res.status(200).json({
        status: 'success',
        data: tutorials,
        message: '获取难度等级教程成功',
      });
    } catch (error) {
      console.error('获取难度等级教程失败:', error);
      // 重新抛出错误，让错误处理中间件处理
      throw error;
    }
  }
}
