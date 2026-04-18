# 数据模型映射文档

## 概述

本文档详细描述了前后端数据结构的差异，并定义了相应的转换规则，确保数据在前后端之间的正确传递和处理。

## 核心数据模型映射

### 1. 博客 (BlogPost)

#### 后端数据结构

```typescript
// backend/src/types/blog.ts
export interface BlogPost {
  id: number;          // 数字类型
  title: string;       // 字符串类型
  content: string;     // 字符串类型
  created_at: string;  // 字符串类型 (ISO 时间格式)
  updated_at: string;  // 字符串类型 (ISO 时间格式)
  tags?: string;       // 字符串类型 (逗号分隔)
}

export interface CreateBlogPost {
  title: string;
  content: string;
  tags?: string;
}

export interface UpdateBlogPost {
  title?: string;
  content?: string;
  tags?: string;
}
```

#### 前端数据结构

```typescript
// frontend/src/types/blog.ts
export interface BlogPost {
  id: string;          // 字符串类型
  title: string;       // 字符串类型
  content: string;     // 字符串类型
  created_at: string;  // 字符串类型 (ISO 时间格式)
  updated_at: string;  // 字符串类型 (ISO 时间格式)
  tags: string[];      // 数组类型
}
```

#### 转换规则

1. **ID 转换**:
   - 后端 (number) → 前端 (string): 使用 `id.toString()`
   - 前端 (string) → 后端 (number): 使用 `parseInt(id)` 或 `Number(id)`

2. **标签转换**:
   - 后端 (string, 逗号分隔) → 前端 (string[]): 使用 `tags?.split(',')?.map(tag => tag.trim()).filter(Boolean) || []`
   - 前端 (string[]) → 后端 (string, 逗号分隔): 使用 `tags.join(', ')`

### 2. 教程 (Tutorial)

#### 后端数据结构

```typescript
// backend/src/types/tutorial.ts
export interface Tutorial {
  id: number;          // 数字类型
  title: string;       // 字符串类型
  content: string;     // 字符串类型
  created_at: string;  // 字符串类型 (ISO 时间格式)
  updated_at: string;  // 字符串类型 (ISO 时间格式)
  category?: string;   // 字符串类型
  difficulty?: string; // 字符串类型
}

export interface CreateTutorial {
  title: string;
  content: string;
  category?: string;
  difficulty?: string;
}

export interface UpdateTutorial {
  title?: string;
  content?: string;
  category?: string;
  difficulty?: string;
}
```

#### 前端数据结构

```typescript
// frontend/src/types/tutorial.ts
export interface Tutorial {
  id: string;          // 字符串类型
  title: string;       // 字符串类型
  content: string;     // 字符串类型
  created_at: string;  // 字符串类型 (ISO 时间格式)
  updated_at: string;  // 字符串类型 (ISO 时间格式)
  category?: string;   // 字符串类型
  difficulty?: string; // 字符串类型
}
```

#### 转换规则

1. **ID 转换**:
   - 后端 (number) → 前端 (string): 使用 `id.toString()`
   - 前端 (string) → 后端 (number): 使用 `parseInt(id)` 或 `Number(id)`

### 3. 工具 (Tool)

#### 后端数据结构

```typescript
// backend/src/types/tool.ts
export interface Tool {
  id: number;          // 数字类型
  name: string;        // 字符串类型
  description: string; // 字符串类型
  url: string;         // 字符串类型
  category?: string;   // 字符串类型
  created_at: string;  // 字符串类型 (ISO 时间格式)
}

export interface CreateTool {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export interface UpdateTool {
  name?: string;
  description?: string;
  url?: string;
  category?: string;
}
```

#### 前端数据结构

```typescript
// frontend/src/types/tool.ts
export interface Tool {
  id: string;          // 字符串类型
  name: string;        // 字符串类型
  description: string; // 字符串类型
  url: string;         // 字符串类型
  category: string;    // 字符串类型
  created_at: string;  // 字符串类型 (ISO 时间格式)
}
```

#### 转换规则

1. **ID 转换**:
   - 后端 (number) → 前端 (string): 使用 `id.toString()`
   - 前端 (string) → 后端 (number): 使用 `parseInt(id)` 或 `Number(id)`

2. **分类转换**:
   - 后端 (可选 string) → 前端 (string): 使用 `category || ''`
   - 前端 (string) → 后端 (可选 string): 空字符串转换为 `undefined` 或 `null`

### 4. 分类 (Category)

#### 后端数据结构

```typescript
// backend/src/types/category.ts
export interface Category {
  id: number;          // 数字类型
  name: string;        // 字符串类型
  description?: string; // 字符串类型
}

export interface CreateCategory {
  name: string;
  description?: string;
}

export interface UpdateCategory {
  name?: string;
  description?: string;
}
```

#### 前端数据结构

```typescript
// 前端可参考后端结构，主要差异是 ID 类型
interface Category {
  id: string;          // 字符串类型
  name: string;        // 字符串类型
  description?: string; // 字符串类型
}
```

#### 转换规则

1. **ID 转换**:
   - 后端 (number) → 前端 (string): 使用 `id.toString()`
   - 前端 (string) → 后端 (number): 使用 `parseInt(id)` 或 `Number(id)`

### 5. 管理员 (Admin)

#### 后端数据结构

```typescript
// backend/src/types/admin.ts
export interface Admin {
  id: number;          // 数字类型
  username: string;     // 字符串类型
  password_hash: string; // 字符串类型
  created_at: string;   // 字符串类型 (ISO 时间格式)
  updated_at: string;   // 字符串类型 (ISO 时间格式)
}

export interface AdminLogin {
  password: string;     // 字符串类型
}

export interface AuthResponse {
  token: string;        // 字符串类型
  expires_at: string;   // 字符串类型 (ISO 时间格式)
  admin: {
    id: number;        // 数字类型
    username: string;   // 字符串类型
  };
}
```

#### 前端数据结构

```typescript
// frontend/src/types/admin.ts
export interface Admin {
  id: string;          // 字符串类型
  username: string;     // 字符串类型
}

export interface AdminLogin {
  password: string;     // 字符串类型
}

export interface AuthResponse {
  token: string;        // 字符串类型
  expires_at: string;   // 字符串类型 (ISO 时间格式)
  admin: {
    id: string;        // 字符串类型
    username: string;   // 字符串类型
  };
}
```

#### 转换规则

1. **ID 转换**:
   - 后端 (number) → 前端 (string): 使用 `id.toString()`
   - 前端 (string) → 后端 (number): 使用 `parseInt(id)` 或 `Number(id)`

2. **密码处理**:
   - 后端存储密码哈希，不返回给前端
   - 前端只发送密码明文，不存储密码

## 转换函数实现

### 后端 → 前端 转换函数

#### 博客转换

```typescript
// 后端转前端
function convertBlogToFrontend(blog: BlogPost): FrontendBlogPost {
  return {
    id: blog.id.toString(),
    title: blog.title,
    content: blog.content,
    created_at: blog.created_at,
    updated_at: blog.updated_at,
    tags: blog.tags?.split(',')?.map(tag => tag.trim()).filter(Boolean) || []
  };
}

// 批量转换
function convertBlogsToFrontend(blogs: BlogPost[]): FrontendBlogPost[] {
  return blogs.map(convertBlogToFrontend);
}
```

#### 教程转换

```typescript
// 后端转前端
function convertTutorialToFrontend(tutorial: Tutorial): FrontendTutorial {
  return {
    id: tutorial.id.toString(),
    title: tutorial.title,
    content: tutorial.content,
    created_at: tutorial.created_at,
    updated_at: tutorial.updated_at,
    category: tutorial.category,
    difficulty: tutorial.difficulty
  };
}

// 批量转换
function convertTutorialsToFrontend(tutorials: Tutorial[]): FrontendTutorial[] {
  return tutorials.map(convertTutorialToFrontend);
}
```

#### 工具转换

```typescript
// 后端转前端
function convertToolToFrontend(tool: Tool): FrontendTool {
  return {
    id: tool.id.toString(),
    name: tool.name,
    description: tool.description,
    url: tool.url,
    category: tool.category || '',
    created_at: tool.created_at
  };
}

// 批量转换
function convertToolsToFrontend(tools: Tool[]): FrontendTool[] {
  return tools.map(convertToolToFrontend);
}
```

#### 分类转换

```typescript
// 后端转前端
function convertCategoryToFrontend(category: Category): FrontendCategory {
  return {
    id: category.id.toString(),
    name: category.name,
    description: category.description
  };
}

// 批量转换
function convertCategoriesToFrontend(categories: Category[]): FrontendCategory[] {
  return categories.map(convertCategoryToFrontend);
}
```

#### 管理员转换

```typescript
// 后端转前端 (认证响应)
function convertAuthResponseToFrontend(authResponse: AuthResponse): FrontendAuthResponse {
  return {
    token: authResponse.token,
    expires_at: authResponse.expires_at,
    admin: {
      id: authResponse.admin.id.toString(),
      username: authResponse.admin.username
    }
  };
}
```

### 前端 → 后端 转换函数

#### 博客转换

```typescript
// 前端转后端 (创建)
function convertBlogToBackend(blog: FrontendCreateBlogPost): CreateBlogPost {
  return {
    title: blog.title,
    content: blog.content,
    tags: blog.tags?.join(', ') || undefined
  };
}

// 前端转后端 (更新)
function convertBlogUpdateToBackend(blog: FrontendUpdateBlogPost): UpdateBlogPost {
  return {
    title: blog.title,
    content: blog.content,
    tags: blog.tags?.join(', ') || undefined
  };
}
```

#### 教程转换

```typescript
// 前端转后端 (创建)
function convertTutorialToBackend(tutorial: FrontendCreateTutorial): CreateTutorial {
  return {
    title: tutorial.title,
    content: tutorial.content,
    category: tutorial.category,
    difficulty: tutorial.difficulty
  };
}

// 前端转后端 (更新)
function convertTutorialUpdateToBackend(tutorial: FrontendUpdateTutorial): UpdateTutorial {
  return {
    title: tutorial.title,
    content: tutorial.content,
    category: tutorial.category,
    difficulty: tutorial.difficulty
  };
}
```

#### 工具转换

```typescript
// 前端转后端 (创建)
function convertToolToBackend(tool: FrontendCreateTool): CreateTool {
  return {
    name: tool.name,
    description: tool.description,
    url: tool.url,
    category: tool.category || undefined
  };
}

// 前端转后端 (更新)
function convertToolUpdateToBackend(tool: FrontendUpdateTool): UpdateTool {
  return {
    name: tool.name,
    description: tool.description,
    url: tool.url,
    category: tool.category || undefined
  };
}
```

#### 分类转换

```typescript
// 前端转后端 (创建)
function convertCategoryToBackend(category: FrontendCreateCategory): CreateCategory {
  return {
    name: category.name,
    description: category.description
  };
}

// 前端转后端 (更新)
function convertCategoryUpdateToBackend(category: FrontendUpdateCategory): UpdateCategory {
  return {
    name: category.name,
    description: category.description
  };
}
```

## API 响应处理

### 分页响应转换

后端 API 返回的分页响应格式：

```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  },
  "message": "获取成功"
}
```

前端处理：

1. 提取 `data` 字段
2. 对 `data` 中的每个项目应用相应的转换函数
3. 保留 `pagination` 字段供前端分页组件使用

## 常见问题与解决方案

### 1. ID 类型不一致

**问题**：后端使用 `number` 类型，前端使用 `string` 类型。

**解决方案**：
- 后端返回数据时，将 `id` 转换为字符串
- 前端发送请求时，将 `id` 转换为数字
- 使用 TypeScript 类型确保类型安全

### 2. 标签格式不一致

**问题**：后端使用逗号分隔的字符串，前端使用字符串数组。

**解决方案**：
- 后端返回数据时，将标签字符串分割为数组
- 前端发送请求时，将标签数组连接为逗号分隔的字符串

### 3. 可选字段处理

**问题**：后端某些字段是可选的，前端可能需要默认值。

**解决方案**：
- 后端转前端时，为可选字段提供默认值
- 前端转后端时，将空值转换为 `undefined` 或 `null`

### 4. 日期格式处理

**问题**：后端返回 ISO 格式的日期字符串，前端需要正确解析。

**解决方案**：
- 保持使用 ISO 格式的日期字符串
- 前端可以根据需要转换为 `Date` 对象

## 最佳实践

1. **统一转换逻辑**：将转换函数集中管理，避免分散在代码各处
2. **类型安全**：使用 TypeScript 类型确保转换前后的数据类型正确
3. **错误处理**：在转换过程中添加适当的错误处理，确保数据一致性
4. **测试**：为转换函数编写单元测试，确保转换逻辑正确
5. **文档**：保持本映射文档的更新，确保与代码实现一致

## 结论

通过本文档定义的数据模型映射规则，前后端可以确保数据的正确传递和处理，减少因数据结构不一致导致的错误。在实际开发中，应严格遵循这些转换规则，确保系统的稳定性和可维护性。
