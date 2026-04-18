/**
 * 验证工具函数
 */

/**
 * 验证ID是否为有效的数字
 * @param id 要验证的ID
 * @returns 是否为有效的ID
 */
export const isValidId = (id: any): boolean => {
  return typeof id === 'number' && Number.isInteger(id) && id > 0;
};

/**
 * 验证字符串是否为空
 * @param str 要验证的字符串
 * @returns 是否为空字符串
 */
export const isEmptyString = (str: any): boolean => {
  return typeof str !== 'string' || str.trim() === '';
};

/**
 * 验证URL是否合法
 * @param url 要验证的URL
 * @returns 是否为合法的URL
 */
export const isValidUrl = (url: any): boolean => {
  if (typeof url !== 'string') {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 验证博客文章数据
 * @param data 博客文章数据
 * @returns 验证结果，包含是否有效和错误信息
 */
export const validateBlogData = (data: any) => {
  const errors: string[] = [];

  if (isEmptyString(data.title)) {
    errors.push('标题不能为空');
  } else if (data.title.length > 255) {
    errors.push('标题长度不能超过255个字符');
  }

  if (isEmptyString(data.content)) {
    errors.push('内容不能为空');
  }

  if (data.category && typeof data.category !== 'string') {
    errors.push('分类必须是字符串');
  } else if (data.category && data.category.length > 100) {
    errors.push('分类长度不能超过100个字符');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 验证教程数据
 * @param data 教程数据
 * @returns 验证结果，包含是否有效和错误信息
 */
export const validateTutorialData = (data: any) => {
  const errors: string[] = [];

  if (isEmptyString(data.title)) {
    errors.push('标题不能为空');
  } else if (data.title.length > 255) {
    errors.push('标题长度不能超过255个字符');
  }

  if (isEmptyString(data.content)) {
    errors.push('内容不能为空');
  }

  if (data.category && typeof data.category !== 'string') {
    errors.push('分类必须是字符串');
  } else if (data.category && data.category.length > 100) {
    errors.push('分类长度不能超过100个字符');
  }

  if (data.difficulty && typeof data.difficulty !== 'string') {
    errors.push('难度必须是字符串');
  } else if (data.difficulty && data.difficulty.length > 50) {
    errors.push('难度长度不能超过50个字符');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 验证工具数据
 * @param data 工具数据
 * @returns 验证结果，包含是否有效和错误信息
 */
export const validateToolData = (data: any) => {
  const errors: string[] = [];

  if (isEmptyString(data.name)) {
    errors.push('名称不能为空');
  } else if (data.name.length > 255) {
    errors.push('名称长度不能超过255个字符');
  }

  if (isEmptyString(data.description)) {
    errors.push('描述不能为空');
  } else if (data.description.length > 1000) {
    errors.push('描述长度不能超过1000个字符');
  }

  if (isEmptyString(data.url)) {
    errors.push('URL不能为空');
  } else if (!isValidUrl(data.url)) {
    errors.push('URL格式不正确');
  } else if (data.url.length > 500) {
    errors.push('URL长度不能超过500个字符');
  }

  if (data.category && typeof data.category !== 'string') {
    errors.push('分类必须是字符串');
  } else if (data.category && data.category.length > 100) {
    errors.push('分类长度不能超过100个字符');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 验证分类数据
 * @param data 分类数据
 * @returns 验证结果，包含是否有效和错误信息
 */
export const validateCategoryData = (data: any) => {
  const errors: string[] = [];

  if (isEmptyString(data.name)) {
    errors.push('分类名称不能为空');
  } else if (data.name.length > 100) {
    errors.push('分类名称长度不能超过100个字符');
  }

  if (data.description && typeof data.description !== 'string') {
    errors.push('分类描述必须是字符串');
  } else if (data.description && data.description.length > 500) {
    errors.push('分类描述长度不能超过500个字符');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
