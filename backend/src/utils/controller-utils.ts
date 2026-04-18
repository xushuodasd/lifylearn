/**
 * 控制器工具函数
 */
import { Request, Response } from 'express';
import { isValidId } from './validation-utils';
import {
  ValidationError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from './errors';

/**
 * 处理获取单个资源的通用函数
 * @param req 请求对象
 * @param res 响应对象
 * @param modelMethod 模型方法，用于获取资源
 * @param resourceName 资源名称，用于错误信息
 */
export const handleGetById = async <T>(
  req: Request,
  res: Response,
  modelMethod: (id: number) => Promise<T | null>,
  resourceName: string
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!isValidId(id)) {
      throw new BadRequestError(`无效的${resourceName}ID`);
    }

    const resource = await modelMethod(id);
    if (!resource) {
      throw new NotFoundError(`${resourceName}不存在`);
    }

    res.status(200).json({
      status: 'success',
      data: resource,
      message: `获取${resourceName}详情成功`,
    });
  } catch (error) {
    console.error(`获取${resourceName}详情失败:`, error);
    // 重新抛出错误，让错误处理中间件处理
    throw error;
  }
};

/**
 * 处理删除资源的通用函数
 * @param req 请求对象
 * @param res 响应对象
 * @param modelMethod 模型方法，用于删除资源
 * @param resourceName 资源名称，用于错误信息
 */
export const handleDelete = async (
  req: Request,
  res: Response,
  modelMethod: (id: number) => Promise<boolean>,
  resourceName: string
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!isValidId(id)) {
      throw new BadRequestError(`无效的${resourceName}ID`);
    }

    const success = await modelMethod(id);
    if (!success) {
      throw new NotFoundError(`${resourceName}不存在`);
    }

    console.log(`删除${resourceName}成功:`, id);
    res.status(200).json({
      status: 'success',
      message: `删除${resourceName}成功`,
    });
  } catch (error) {
    console.error(`删除${resourceName}失败:`, error);
    // 重新抛出错误，让错误处理中间件处理
    throw error;
  }
};

/**
 * 处理获取所有资源的通用函数
 * @param req 请求对象
 * @param res 响应对象
 * @param serviceMethod 服务方法，用于获取所有资源
 * @param resourceName 资源名称，用于错误信息
 */
export const handleGetAll = async <T>(
  req: Request,
  res: Response,
  serviceMethod: (
    page: number,
    pageSize: number
  ) => Promise<{
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>,
  resourceName: string
): Promise<void> => {
  try {
    // 解析分页参数
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    // 确保参数有效
    const validPage = Math.max(1, page);
    const validPageSize = Math.max(1, Math.min(100, pageSize)); // 限制最大每页数量为100

    const result = await serviceMethod(validPage, validPageSize);
    res.status(200).json({
      status: 'success',
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
      },
      message: `获取${resourceName}列表成功`,
    });
  } catch (error) {
    console.error(`获取${resourceName}列表失败:`, error);
    // 重新抛出错误，让错误处理中间件处理
    throw error;
  }
};

/**
 * 处理创建资源的通用函数
 * @param req 请求对象
 * @param res 响应对象
 * @param modelMethod 模型方法，用于创建资源
 * @param validationFn 验证函数，用于验证输入数据
 * @param resourceName 资源名称，用于错误信息
 */
export const handleCreate = async <T, U>(
  req: Request,
  res: Response,
  modelMethod: (data: U) => Promise<T>,
  validationFn: (data: any) => { isValid: boolean; errors: string[] },
  resourceName: string
): Promise<void> => {
  try {
    const data = req.body;
    const validation = validationFn(data);

    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }

    const resource = await modelMethod(data);
    console.log(`创建${resourceName}成功:`, (resource as any).id);

    res.status(201).json({
      status: 'success',
      data: resource,
      message: `创建${resourceName}成功`,
    });
  } catch (error) {
    console.error(`创建${resourceName}失败:`, error);
    // 重新抛出错误，让错误处理中间件处理
    throw error;
  }
};

/**
 * 处理更新资源的通用函数
 * @param req 请求对象
 * @param res 响应对象
 * @param modelMethod 模型方法，用于更新资源
 * @param validationFn 验证函数，用于验证输入数据
 * @param resourceName 资源名称，用于错误信息
 */
export const handleUpdate = async <T, U>(
  req: Request,
  res: Response,
  modelMethod: (id: number, data: U) => Promise<T | null>,
  validationFn: (data: any) => { isValid: boolean; errors: string[] },
  resourceName: string
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!isValidId(id)) {
      throw new BadRequestError(`无效的${resourceName}ID`);
    }

    const data = req.body;

    // 验证更新数据
    const hasDataToUpdate = Object.keys(data).length > 0;
    if (hasDataToUpdate) {
      const validation = validationFn(data);
      if (!validation.isValid) {
        throw new ValidationError(validation.errors.join(', '));
      }
    }

    const resource = await modelMethod(id, data);
    if (!resource) {
      throw new NotFoundError(`${resourceName}不存在`);
    }

    console.log(`更新${resourceName}成功:`, (resource as any).id);

    res.status(200).json({
      status: 'success',
      data: resource,
      message: `更新${resourceName}成功`,
    });
  } catch (error) {
    console.error(`更新${resourceName}失败:`, error);
    // 重新抛出错误，让错误处理中间件处理
    throw error;
  }
};
