import { ToolModel } from '../models/ToolModel';
import { Tool, CreateTool, UpdateTool } from '../types/tool';
import { validateToolData } from '../utils/validation-utils';
import { ValidationError, NotFoundError } from '../utils/errors';

/**
 * 工具服务类
 * 处理与工具相关的业务逻辑
 */
export class ToolService {
  /**
   * 获取所有工具
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 包含工具列表和分页信息的对象
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    data: Tool[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const [data, total] = await Promise.all([
      ToolModel.getAll(page, pageSize),
      ToolModel.count(),
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
   * 根据ID获取工具
   * @param id 工具ID
   * @returns 工具对象
   * @throws NotFoundError 如果工具不存在
   */
  static async getById(id: number): Promise<Tool> {
    const tool = await ToolModel.getById(id);
    if (!tool) {
      throw new NotFoundError('工具不存在');
    }
    return tool;
  }

  /**
   * 创建工具
   * @param data 工具数据
   * @returns 创建的工具对象
   * @throws ValidationError 如果数据验证失败
   */
  static async create(data: CreateTool): Promise<Tool> {
    const validation = validateToolData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }
    return ToolModel.create(data);
  }

  /**
   * 更新工具
   * @param id 工具ID
   * @param data 工具更新数据
   * @returns 更新后的工具对象
   * @throws ValidationError 如果数据验证失败
   * @throws NotFoundError 如果工具不存在
   */
  static async update(id: number, data: UpdateTool): Promise<Tool> {
    const validation = validateToolData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }
    const updatedTool = await ToolModel.update(id, data);
    if (!updatedTool) {
      throw new NotFoundError('工具不存在');
    }
    return updatedTool;
  }

  /**
   * 删除工具
   * @param id 工具ID
   * @returns 是否删除成功
   * @throws NotFoundError 如果工具不存在
   */
  static async delete(id: number): Promise<boolean> {
    const success = await ToolModel.delete(id);
    if (!success) {
      throw new NotFoundError('工具不存在');
    }
    return success;
  }

  /**
   * 根据分类获取工具
   * @param category 分类名称
   * @returns 工具列表
   * @throws ValidationError 如果分类参数无效
   */
  static async getByCategory(category: string): Promise<Tool[]> {
    if (!category || typeof category !== 'string') {
      throw new ValidationError('分类不能为空');
    }
    return ToolModel.getByCategory(category);
  }
}
