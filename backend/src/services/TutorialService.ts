import { TutorialModel } from '../models/TutorialModel';
import { Tutorial, CreateTutorial, UpdateTutorial } from '../types/tutorial';
import { validateTutorialData } from '../utils/validation-utils';
import { ValidationError, NotFoundError } from '../utils/errors';

/**
 * 教程服务类
 * 处理与教程相关的业务逻辑
 */
export class TutorialService {
  /**
   * 获取所有教程
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 包含教程列表和分页信息的对象
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    data: Tutorial[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const [data, total] = await Promise.all([
      TutorialModel.getAll(page, pageSize),
      TutorialModel.count(),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  /**
   * 根据ID获取教程
   * @param id 教程ID
   * @returns 教程对象
   * @throws NotFoundError 如果教程不存在
   */
  static async getById(id: number): Promise<Tutorial> {
    const tutorial = await TutorialModel.getById(id);
    if (!tutorial) {
      throw new NotFoundError('教程不存在');
    }
    return tutorial;
  }

  /**
   * 创建教程
   * @param data 教程数据
   * @returns 创建的教程对象
   * @throws ValidationError 如果数据验证失败
   */
  static async create(data: CreateTutorial): Promise<Tutorial> {
    const validation = validateTutorialData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }
    return TutorialModel.create(data);
  }

  /**
   * 更新教程
   * @param id 教程ID
   * @param data 教程更新数据
   * @returns 更新后的教程对象
   * @throws ValidationError 如果数据验证失败
   * @throws NotFoundError 如果教程不存在
   */
  static async update(id: number, data: UpdateTutorial): Promise<Tutorial> {
    const validation = validateTutorialData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }
    const updatedTutorial = await TutorialModel.update(id, data);
    if (!updatedTutorial) {
      throw new NotFoundError('教程不存在');
    }
    return updatedTutorial;
  }

  /**
   * 删除教程
   * @param id 教程ID
   * @returns 是否删除成功
   * @throws NotFoundError 如果教程不存在
   */
  static async delete(id: number): Promise<boolean> {
    const success = await TutorialModel.delete(id);
    if (!success) {
      throw new NotFoundError('教程不存在');
    }
    return success;
  }

  /**
   * 根据分类获取教程
   * @param category 分类名称
   * @returns 教程列表
   * @throws ValidationError 如果分类参数无效
   */
  static async getByCategory(category: string): Promise<Tutorial[]> {
    if (!category || typeof category !== 'string') {
      throw new ValidationError('分类不能为空');
    }
    return TutorialModel.getByCategory(category);
  }

  /**
   * 根据难度获取教程
   * @param difficulty 难度等级
   * @returns 教程列表
   * @throws ValidationError 如果难度参数无效
   */
  static async getByDifficulty(difficulty: string): Promise<Tutorial[]> {
    if (!difficulty || typeof difficulty !== 'string') {
      throw new ValidationError('难度不能为空');
    }
    return TutorialModel.getByDifficulty(difficulty);
  }
}
