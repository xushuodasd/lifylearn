# API 文档

## 概述

本文档详细描述了博客工具箱系统的后端 API 接口，包括 URL、HTTP 方法、参数、响应格式和示例。所有 API 都以 `/api/v1` 为前缀。

## 基础信息

- **API 基础 URL**: `http://localhost:3000/api/v1`
- **内容类型**: `application/json; charset=utf-8`
- **响应格式**: 统一的 JSON 格式，包含 status、data、message 字段
- **错误处理**: 统一的错误响应格式，包含 status、error、code 字段
- **字符编码**: 支持 UTF-8 编码，确保中文内容正确显示

## 博客 API

### 获取博客列表

- **URL**: `/api/v1/blogs`
- **方法**: `GET`
- **参数**:
  - `page` (可选): 页码，默认 1
  - `pageSize` (可选): 每页数量，默认 10
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "测试博客",
        "content": "这是一篇测试博客",
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z",
        "tags": "测试, 示例"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "pageSize": 10,
      "totalPages": 1
    },
    "message": "获取博客列表成功"
  }
  ```

### 获取博客详情

- **URL**: `/api/v1/blogs/:id`
- **方法**: `GET`
- **参数**:
  - `id` (必填): 博客 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "测试博客",
      "content": "这是一篇测试博客",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "tags": "测试, 示例"
    },
    "message": "获取博客详情成功"
  }
  ```

### 创建博客

- **URL**: `/api/v1/blogs`
- **方法**: `POST`
- **参数** (请求体):
  - `title` (必填): 博客标题，最大长度 255
  - `content` (必填): 博客内容
  - `tags` (可选): 博客标签，最大长度 255
  - `category` (可选): 博客分类，最大长度 100
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "测试博客",
      "content": "这是一篇测试博客",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "tags": "测试, 示例",
      "category": "前端"
    },
    "message": "创建博客成功"
  }
  ```

### 更新博客

- **URL**: `/api/v1/blogs/:id`
- **方法**: `PUT`
- **参数**:
  - `id` (必填): 博客 ID
  - 请求体:
    - `title` (可选): 博客标题，最大长度 255
    - `content` (可选): 博客内容
    - `tags` (可选): 博客标签，最大长度 255
    - `category` (可选): 博客分类，最大长度 100
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "更新后的博客",
      "content": "这是更新后的博客内容",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-02T00:00:00.000Z",
      "tags": "测试, 更新",
      "category": "前端"
    },
    "message": "更新博客成功"
  }
  ```

### 删除博客

- **URL**: `/api/v1/blogs/:id`
- **方法**: `DELETE`
- **参数**:
  - `id` (必填): 博客 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": true,
    "message": "删除博客成功"
  }
  ```

### 根据标签获取博客

- **URL**: `/api/v1/blogs/tag/:tag`
- **方法**: `GET`
- **参数**:
  - `tag` (必填): 标签名称
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "测试博客",
        "content": "这是一篇测试博客",
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z",
        "tags": "测试, 示例"
      }
    ],
    "message": "根据标签获取博客成功"
  }
  ```

## 教程 API

### 获取教程列表

- **URL**: `/api/v1/tutorials`
- **方法**: `GET`
- **参数**:
  - `page` (可选): 页码，默认 1
  - `pageSize` (可选): 每页数量，默认 10
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "测试教程",
        "content": "这是一篇测试教程",
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z",
        "category": "前端",
        "difficulty": "初级"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "pageSize": 10,
      "totalPages": 1
    },
    "message": "获取教程列表成功"
  }
  ```

### 获取教程详情

- **URL**: `/api/v1/tutorials/:id`
- **方法**: `GET`
- **参数**:
  - `id` (必填): 教程 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "测试教程",
      "content": "这是一篇测试教程",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "category": "前端",
      "difficulty": "初级"
    },
    "message": "获取教程详情成功"
  }
  ```

### 创建教程

- **URL**: `/api/v1/tutorials`
- **方法**: `POST`
- **参数** (请求体):
  - `title` (必填): 教程标题，最大长度 255
  - `content` (必填): 教程内容
  - `category` (可选): 教程分类，最大长度 100
  - `difficulty` (可选): 教程难度，最大长度 50
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "测试教程",
      "content": "这是一篇测试教程",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "category": "前端",
      "difficulty": "初级"
    },
    "message": "创建教程成功"
  }
  ```

### 更新教程

- **URL**: `/api/v1/tutorials/:id`
- **方法**: `PUT`
- **参数**:
  - `id` (必填): 教程 ID
  - 请求体:
    - `title` (可选): 教程标题，最大长度 255
    - `content` (可选): 教程内容
    - `category` (可选): 教程分类，最大长度 100
    - `difficulty` (可选): 教程难度，最大长度 50
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "更新后的教程",
      "content": "这是更新后的教程内容",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-02T00:00:00.000Z",
      "category": "前端",
      "difficulty": "中级"
    },
    "message": "更新教程成功"
  }
  ```

### 删除教程

- **URL**: `/api/v1/tutorials/:id`
- **方法**: `DELETE`
- **参数**:
  - `id` (必填): 教程 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": true,
    "message": "删除教程成功"
  }
  ```

### 根据分类获取教程

- **URL**: `/api/v1/tutorials/category/:category`
- **方法**: `GET`
- **参数**:
  - `category` (必填): 分类名称
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "测试教程",
        "content": "这是一篇测试教程",
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z",
        "category": "前端",
        "difficulty": "初级"
      }
    ],
    "message": "根据分类获取教程成功"
  }
  ```

### 根据难度获取教程

- **URL**: `/api/v1/tutorials/difficulty/:difficulty`
- **方法**: `GET`
- **参数**:
  - `difficulty` (必填): 难度等级
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "测试教程",
        "content": "这是一篇测试教程",
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z",
        "category": "前端",
        "difficulty": "初级"
      }
    ],
    "message": "根据难度获取教程成功"
  }
  ```

## 工具 API

### 获取工具列表

- **URL**: `/api/v1/tools`
- **方法**: `GET`
- **参数**:
  - `page` (可选): 页码，默认 1
  - `pageSize` (可选): 每页数量，默认 10
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "测试工具",
        "description": "这是一个测试工具",
        "url": "https://example.com",
        "category": "开发工具",
        "created_at": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "pageSize": 10,
      "totalPages": 1
    },
    "message": "获取工具列表成功"
  }
  ```

### 获取工具详情

- **URL**: `/api/v1/tools/:id`
- **方法**: `GET`
- **参数**:
  - `id` (必填): 工具 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "测试工具",
      "description": "这是一个测试工具",
      "url": "https://example.com",
      "category": "开发工具",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "message": "获取工具详情成功"
  }
  ```

### 创建工具

- **URL**: `/api/v1/tools`
- **方法**: `POST`
- **参数** (请求体):
  - `name` (必填): 工具名称，最大长度 255
  - `description` (必填): 工具描述，最大长度 1000
  - `url` (必填): 工具 URL，最大长度 500，必须是合法的 URL 格式
  - `category` (可选): 工具分类，最大长度 100
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "测试工具",
      "description": "这是一个测试工具",
      "url": "https://example.com",
      "category": "开发工具",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "message": "创建工具成功"
  }
  ```

### 更新工具

- **URL**: `/api/v1/tools/:id`
- **方法**: `PUT`
- **参数**:
  - `id` (必填): 工具 ID
  - 请求体:
    - `name` (可选): 工具名称，最大长度 255
    - `description` (可选): 工具描述，最大长度 1000
    - `url` (可选): 工具 URL，最大长度 500，必须是合法的 URL 格式
    - `category` (可选): 工具分类，最大长度 100
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "更新后的工具",
      "description": "这是更新后的工具描述",
      "url": "https://example.com/updated",
      "category": "开发工具",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "message": "更新工具成功"
  }
  ```

### 删除工具

- **URL**: `/api/v1/tools/:id`
- **方法**: `DELETE`
- **参数**:
  - `id` (必填): 工具 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": true,
    "message": "删除工具成功"
  }
  ```

### 根据分类获取工具

- **URL**: `/api/v1/tools/category/:category`
- **方法**: `GET`
- **参数**:
  - `category` (必填): 分类名称
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "测试工具",
        "description": "这是一个测试工具",
        "url": "https://example.com",
        "category": "开发工具",
        "created_at": "2024-01-01T00:00:00.000Z"
      }
    ],
    "message": "根据分类获取工具成功"
  }
  ```

## 分类 API

### 获取分类列表

- **URL**: `/api/v1/categories`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "前端",
        "description": "前端开发相关",
        "module": "blog"
      }
    ],
    "message": "获取分类列表成功"
  }
  ```

### 获取分类详情

- **URL**: `/api/v1/categories/:id`
- **方法**: `GET`
- **参数**:
  - `id` (必填): 分类 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "前端",
      "description": "前端开发相关",
      "module": "blog"
    },
    "message": "获取分类详情成功"
  }
  ```

### 根据模块获取分类

- **URL**: `/api/v1/categories/module/:module`
- **方法**: `GET`
- **参数**:
  - `module` (必填): 模块名称，支持 "blog"、"tutorial"、"tool"
- **响应**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "前端",
        "description": "前端开发相关",
        "module": "blog"
      }
    ],
    "message": "根据模块获取分类成功"
  }
  ```

### 创建分类

- **URL**: `/api/v1/categories`
- **方法**: `POST`
- **参数** (请求体):
  - `name` (必填): 分类名称，最大长度 100
  - `description` (可选): 分类描述，最大长度 500
  - `module` (必填): 模块名称，最大长度 50，支持 "blog"、"tutorial"、"tool"
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "前端",
      "description": "前端开发相关",
      "module": "blog"
    },
    "message": "创建分类成功"
  }
  ```

### 更新分类

- **URL**: `/api/v1/categories/:id`
- **方法**: `PUT`
- **参数**:
  - `id` (必填): 分类 ID
  - 请求体:
    - `name` (可选): 分类名称，最大长度 100
    - `description` (可选): 分类描述，最大长度 500
    - `module` (可选): 模块名称，最大长度 50，支持 "blog"、"tutorial"、"tool"
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "前端开发",
      "description": "前端开发技术相关",
      "module": "blog"
    },
    "message": "更新分类成功"
  }
  ```

### 删除分类

- **URL**: `/api/v1/categories/:id`
- **方法**: `DELETE`
- **参数**:
  - `id` (必填): 分类 ID
- **响应**:
  ```json
  {
    "status": "success",
    "data": true,
    "message": "删除分类成功"
  }
  ```

## 管理员认证 API

### 管理员登录

- **URL**: `/api/v1/login`
- **方法**: `POST`
- **参数** (请求体):
  - `password` (必填): 管理员密码
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "token": "jwt_token"
    },
    "message": "登录成功"
  }
  ```

### 初始化默认管理员

- **URL**: `/api/v1/init`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "message": "默认管理员初始化成功"
    },
    "message": "默认管理员初始化成功"
  }
  ```

### 获取管理员信息

- **URL**: `/api/v1/info`
- **方法**: `GET`
- **参数**:
  - `Authorization` (请求头): Bearer token
- **响应**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "username": "admin",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "message": "获取管理员信息成功"
  }
  ```

## 错误响应

所有 API 错误都返回统一的错误格式：

```json
{
  "status": "error",
  "error": "错误消息",
  "code": 错误状态码
}
```

### 常见错误状态码

- `400`: 请求参数错误
- `401`: 未授权，认证失败
- `404`: 资源不存在
- `429`: 请求过于频繁
- `500`: 服务器内部错误

## 示例请求

### 使用 curl 获取博客列表

```bash
curl -X GET "http://localhost:3000/api/v1/blogs?page=1&pageSize=10"
```

### 使用 curl 创建博客

```bash
curl -X POST "http://localhost:3000/api/v1/blogs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新博客",
    "content": "博客内容",
    "tags": "标签1,标签2"
  }'
```

### 使用 curl 管理员登录

```bash
curl -X POST "http://localhost:3000/api/v1/login" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "admin123"
  }'
```
