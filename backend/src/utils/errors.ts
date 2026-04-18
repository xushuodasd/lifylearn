/**
 * 自定义错误类
 */

/**
 * 基础错误类
 */
export class AppError extends Error {
  constructor(message: string, public name: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 验证错误
 */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'ValidationError', 400);
  }
}

/**
 * 未找到错误
 */
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}

/**
 * 错误请求错误
 */
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400);
  }
}

/**
 * 未授权错误
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = '未授权') {
    super(message, 'UnauthorizedError', 401);
  }
}

/**
 * 禁止访问错误
 */
export class ForbiddenError extends AppError {
  constructor(message: string = '禁止访问') {
    super(message, 'ForbiddenError', 403);
  }
}

/**
 * 内部服务器错误
 */
export class InternalServerError extends AppError {
  constructor(message: string = '服务器内部错误') {
    super(message, 'InternalServerError', 500);
  }
}
