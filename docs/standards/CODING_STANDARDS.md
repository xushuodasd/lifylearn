# 博客工具箱编码规范

## 1. 前端命名规范

### 1.1 文件命名
- **组件文件**：使用 PascalCase 命名法，如 `BlogList.tsx`、`ToolDetail.tsx`
- **工具文件**：使用 camelCase 命名法，如 `apiClient.ts`、`dateUtils.ts`
- **样式文件**：使用 kebab-case 命名法，如 `blog-styles.css`、`tool-form.css`
- **页面文件**：使用 PascalCase 命名法，如 `HomePage.tsx`、`BlogPage.tsx`

### 1.2 组件命名
- **组件类名**：使用 PascalCase 命名法，如 `BlogList`、`ToolDetail`
- **组件属性**：使用 camelCase 命名法，如 `blogId`、`toolName`
- **状态变量**：使用 camelCase 命名法，如 `isLoading`、`toolList`

### 1.3 函数命名
- **函数名**：使用 camelCase 命名法，如 `fetchBlogs`、`addTool`
- **事件处理函数**：使用 `handle` 前缀，如 `handleSubmit`、`handleClick`
- **自定义 Hook**：使用 `use` 前缀，如 `useBlogs`、`useTools`

### 1.4 变量命名
- **普通变量**：使用 camelCase 命名法，如 `blogList`、`toolCount`
- **常量**：使用 UPPER_SNAKE_CASE 命名法，如 `MAX_TOOLS`、`API_URL`
- **枚举**：使用 PascalCase 命名法，如 `DifficultyLevel`、`ToolCategory`

### 1.5 样式命名
- **Tailwind 类**：遵循 Tailwind 官方命名规范，如 `bg-blue-500`、`flex justify-center`
- **自定义类**：使用 kebab-case 命名法，如 `.blog-card`、`.tool-form`

## 2. 后端命名规范

### 2.1 文件命名
- **路由文件**：使用 kebab-case 命名法，如 `blog-routes.ts`、`tool-routes.ts`
- **控制器文件**：使用 kebab-case 命名法，如 `blog-controller.ts`、`tool-controller.ts`
- **模型文件**：使用 PascalCase 命名法，如 `BlogModel.ts`、`ToolModel.ts`
- **中间件文件**：使用 kebab-case 命名法，如 `cors-middleware.ts`、`logger-middleware.ts`

### 2.2 函数命名
- **路由处理函数**：使用 camelCase 命名法，如 `getBlogs`、`createTool`
- **数据库操作函数**：使用 camelCase 命名法，如 `findBlogById`、`insertTool`
- **中间件函数**：使用 camelCase 命名法，如 `corsMiddleware`、`loggerMiddleware`

### 2.3 变量命名
- **普通变量**：使用 camelCase 命名法，如 `blogId`、`toolData`
- **常量**：使用 UPPER_SNAKE_CASE 命名法，如 `PORT`、`DB_PATH`
- **配置变量**：使用 camelCase 命名法，如 `serverConfig`、`dbConfig`

### 2.4 API 路由命名
- **遵循 RESTful 规范**：使用 kebab-case 命名法
- **示例**：
  - `GET /api/blogs` - 获取博客列表
  - `GET /api/blogs/:id` - 获取博客详情
  - `POST /api/blogs` - 创建博客
  - `PUT /api/blogs/:id` - 更新博客
  - `DELETE /api/blogs/:id` - 删除博客
  - `GET /api/tools` - 获取工具列表
  - `POST /api/tools` - 创建工具

## 3. 接口规范

### 3.1 RESTful API 设计
- **使用标准 HTTP 方法**：
  - `GET` - 获取资源
  - `POST` - 创建资源
  - `PUT` - 更新资源
  - `DELETE` - 删除资源
- **资源命名**：使用复数形式，如 `/blogs`、`/tools`
- **版本控制**：在 URL 中包含版本号，如 `/api/v1/blogs`

### 3.2 请求/响应格式
- **请求格式**：使用 JSON 格式
- **响应格式**：
  - **成功响应**：
    ```json
    {
      "status": "success",
      "data": {...}, // 响应数据
      "message": "操作成功"
    }
    ```
  - **失败响应**：
    ```json
    {
      "status": "error",
      "error": "错误信息",
      "code": 400 // 错误码
    }
    ```

### 3.3 错误处理
- **使用标准 HTTP 状态码**：
  - `200 OK` - 请求成功
  - `201 Created` - 资源创建成功
  - `400 Bad Request` - 请求参数错误
  - `404 Not Found` - 资源不存在
  - `500 Internal Server Error` - 服务器内部错误
- **错误信息**：清晰明了，便于前端处理

### 3.4 分页规范
- **请求参数**：
  - `page` - 页码，默认 1
  - `limit` - 每页数量，默认 10
  - `sort` - 排序字段
  - `order` - 排序方向（asc/desc）
- **响应格式**：
  ```json
  {
    "status": "success",
    "data": [...],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "pages": 10
    }
  }
  ```

## 4. 数据库命名规范

### 4.1 表名命名
- **使用 snake_case 命名法**：如 `blog_posts`、`tools`、`categories`
- **使用复数形式**：如 `blog_posts` 而非 `blog_post`

### 4.2 字段名命名
- **使用 snake_case 命名法**：如 `blog_id`、`tool_name`、`created_at`
- **主键**：使用 `id` 作为主键名
- **外键**：使用 `{表名}_id` 格式，如 `category_id`、`blog_id`

### 4.3 索引命名
- **使用 `idx_{表名}_{字段名}` 格式**：如 `idx_blog_posts_title`、`idx_tools_category_id`

## 5. 目录结构规范

### 5.1 前端目录结构
```
frontend/
├── public/              # 静态资源
├── src/
│   ├── components/      # 组件
│   │   ├── blog/        # 博客相关组件
│   │   ├── tool/        # 工具相关组件
│   │   ├── tutorial/    # 教程相关组件
│   │   └── common/      # 通用组件
│   ├── pages/           # 页面
│   │   ├── HomePage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── ToolPage.tsx
│   │   └── TutorialPage.tsx
│   ├── services/        # API 服务
│   │   ├── apiClient.ts
│   │   ├── blogService.ts
│   │   ├── toolService.ts
│   │   └── tutorialService.ts
│   ├── utils/           # 工具函数
│   │   ├── dateUtils.ts
│   │   └── validationUtils.ts
│   ├── context/         # 上下文
│   │   └── AppContext.tsx
│   ├── hooks/           # 自定义 Hook
│   │   ├── useBlogs.ts
│   │   └── useTools.ts
│   ├── routes/          # 路由
│   │   └── AppRoutes.tsx
│   ├── types/           # 类型定义
│   │   ├── blog.ts
│   │   ├── tool.ts
│   │   └── tutorial.ts
│   ├── styles/          # 全局样式
│   │   └── globals.css
│   ├── App.tsx          # 应用根组件
│   └── main.tsx         # 应用入口
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 5.2 后端目录结构
```
backend/
├── src/
│   ├── routes/          # 路由
│   │   ├── blogRoutes.ts
│   │   ├── toolRoutes.ts
│   │   ├── tutorialRoutes.ts
│   │   └── index.ts
│   ├── controllers/     # 控制器
│   │   ├── blogController.ts
│   │   ├── toolController.ts
│   │   └── tutorialController.ts
│   ├── models/          # 模型
│   │   ├── BlogModel.ts
│   │   ├── ToolModel.ts
│   │   ├── TutorialModel.ts
│   │   ├── CategoryModel.ts
│   │   └── index.ts
│   ├── services/        # 服务
│   │   ├── blogService.ts
│   │   ├── toolService.ts
│   │   └── tutorialService.ts
│   ├── middleware/      # 中间件
│   │   ├── corsMiddleware.ts
│   │   └── loggerMiddleware.ts
│   ├── utils/           # 工具函数
│   │   ├── dbUtils.ts
│   │   └── errorUtils.ts
│   ├── types/           # 类型定义
│   │   ├── blog.ts
│   │   ├── tool.ts
│   │   └── tutorial.ts
│   ├── config/          # 配置
│   │   └── database.ts
│   ├── app.ts           # 应用配置
│   └── server.ts        # 服务器入口
├── package.json
├── tsconfig.json
└── .env
```

## 6. 代码风格规范

### 6.1 缩进
- **使用 2 个空格**进行缩进，不使用 Tab
- **大括号**：使用 K&R 风格，左大括号与语句同行

### 6.2 空格
- **运算符两侧**：使用空格，如 `a + b` 而非 `a+b`
- **逗号后**：使用空格，如 `[1, 2, 3]` 而非 `[1,2,3]`
- **函数参数**：使用空格，如 `function(a, b)` 而非 `function(a,b)`

### 6.3 注释
- **单行注释**：使用 `//` 进行注释
- **多行注释**：使用 `/* */` 进行注释
- **JSDoc**：使用 JSDoc 注释函数和类型定义

### 6.4 代码长度
- **单行长度**：不超过 80 个字符
- **函数长度**：不超过 50 行
- **文件长度**：不超过 300 行

## 7. 版本控制规范

### 7.1 Git 提交规范
- **提交信息格式**：
  ```
  <type>(<scope>): <subject>
  
  <body>
  
  <footer>
  ```
- **类型**：
  - `feat` - 新功能
  - `fix` - 修复 bug
  - `docs` - 文档更新
  - `style` - 代码风格更新
  - `refactor` - 代码重构
  - `test` - 测试更新
  - `chore` - 构建或依赖更新

### 7.2 分支管理
- **main** - 主分支，用于发布生产版本
- **develop** - 开发分支，用于集成功能
- **feature/** - 特性分支，用于开发新功能
- **fix/** - 修复分支，用于修复 bug

## 8. 最佳实践

### 8.1 前端最佳实践
- **组件拆分**：将复杂组件拆分为多个小型组件
- **状态管理**：合理使用状态管理，避免过度使用
- **性能优化**：使用 `useMemo`、`useCallback` 等优化渲染性能
- **错误边界**：使用错误边界捕获组件错误
- **代码分割**：使用动态导入实现代码分割

### 8.2 后端最佳实践
- **中间件使用**：合理使用中间件处理通用逻辑
- **错误处理**：统一错误处理，避免在每个路由中重复
- **数据库操作**：使用参数化查询，避免 SQL 注入
- **日志记录**：记录关键操作和错误信息
- **配置管理**：使用环境变量管理配置

### 8.3 安全最佳实践
- **输入验证**：验证所有用户输入
- **CORS 配置**：合理配置 CORS 策略
- **敏感信息**：不存储敏感信息在代码中
- **依赖管理**：定期更新依赖，避免安全漏洞

## 9. 总结

本规范旨在确保项目代码的一致性、可读性和可维护性。所有开发人员应严格遵循本规范，以提高代码质量和开发效率。规范将根据项目发展和技术进步进行定期更新和优化。