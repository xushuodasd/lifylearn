import { CategoryModel } from '../models/CategoryModel';
import { Category, CreateCategory, UpdateCategory } from '../types/category';
import { validateCategoryData } from '../utils/validation-utils';
import { ValidationError, NotFoundError } from '../utils/errors';

/**
 * 分类服务类
 * 处理与分类相关的业务逻辑
 */
export class CategoryService {
  /**
   * 获取所有分类
   * @param page 页码，默认1
   * @param pageSize 每页数量，默认10
   * @returns 包含分类列表和分页信息的对象
   */
  static async getAll(
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    data: Category[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const [data, total] = await Promise.all([
      CategoryModel.getAll(page, pageSize),
      CategoryModel.count(),
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
   * 根据ID获取分类
   * @param id 分类ID
   * @returns 分类对象
   * @throws NotFoundError 如果分类不存在
   */
  static async getById(id: number): Promise<Category> {
    const category = await CategoryModel.getById(id);
    if (!category) {
      throw new NotFoundError('分类不存在');
    }
    return category;
  }

  /**
   * 创建分类
   * @param data 分类数据
   * @returns 创建的分类对象
   * @throws ValidationError 如果数据验证失败
   */
  static async create(data: CreateCategory): Promise<Category> {
    const validation = validateCategoryData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }
    return CategoryModel.create(data);
  }

  /**
   * 更新分类
   * @param id 分类ID
   * @param data 分类更新数据
   * @returns 更新后的分类对象
   * @throws ValidationError 如果数据验证失败
   * @throws NotFoundError 如果分类不存在
   */
  static async update(id: number, data: UpdateCategory): Promise<Category> {
    const validation = validateCategoryData(data);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }
    const updatedCategory = await CategoryModel.update(id, data);
    if (!updatedCategory) {
      throw new NotFoundError('分类不存在');
    }
    return updatedCategory;
  }

  /**
   * 删除分类
   * @param id 分类ID
   * @returns 是否删除成功
   * @throws NotFoundError 如果分类不存在
   */
  static async delete(id: number): Promise<boolean> {
    const success = await CategoryModel.delete(id);
    if (!success) {
      throw new NotFoundError('分类不存在');
    }
    return success;
  }

  /**
   * 根据模块获取分类
   * @param module 模块名称
   * @returns 分类列表
   */
  static async getByModule(module: string): Promise<Category[]> {
    return CategoryModel.getByModule(module);
  }
}
