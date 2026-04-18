# 集成指南

## 概述

本文档提供了后端服务的集成指南，包括环境配置、启动命令、跨域设置和常见问题排查等内容，帮助前端工程师快速集成后端服务。

## 环境要求

### 硬件要求
- **CPU**: 至少 1 核
- **内存**: 至少 2GB
- **存储空间**: 至少 100MB

### 软件要求
- **Node.js**: v16.0.0 或更高版本
- **npm**: v7.0.0 或更高版本
- **SQLite**: 3.30.0 或更高版本（自动安装）

## 环境配置

### 1. 克隆项目

```bash
# 克隆项目到本地
git clone <repository-url>

# 进入后端目录
cd backend
```

### 2. 安装依赖

```bash
# 安装项目依赖
npm install
```

### 3. 配置环境变量

创建 `.env` 文件（如果不存在），配置以下环境变量：

```env
# 数据库路径
DB_PATH=./database.db

# 服务器端口
PORT=3000

# 环境
NODE_ENV=development
```

## 启动命令

### 开发环境

```bash
# 启动开发服务器（支持热更新）
npm run dev
```

### 生产环境

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

### 其他命令

```bash
# 运行 TypeScript 类型检查
npx tsc --noEmit

# 运行代码检查
npm run lint

# 自动修复代码风格问题
npm run lint:fix

# 格式化代码
npm run format
```

## 跨域设置

### 后端配置

后端已配置 CORS 中间件，支持以下来源：
- `http://localhost:3000`
- `http://localhost:5173`

配置文件位置：`src/middleware/cors-middleware.ts`

```typescript
// 受信任的来源列表
const ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:5173'];

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin as string;

  // 只允许受信任的来源
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    // 只有在信任的来源下才允许凭据
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
};
```

### 前端配置

前端需要配置 API 基础 URL，确保与后端服务的地址匹配。

#### 示例（React 项目）

```typescript
// src/services/apiClient.ts
const API_BASE_URL = 'http://localhost:3000/api/v1';

export const apiClient = {
  async get<T>(endpoint: string, params?: Record<string, any>) {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json() as Promise<T>;
  },
  // 其他方法...
};
```

## API 基础信息

### 基础 URL

```
http://localhost:3000/api/v1
```

### 响应格式

#### 成功响应

```json
{
  "status": "success",
  "data": {...}, // 响应数据
  "pagination": {...}, // 分页信息（仅列表接口）
  "message": "操作成功"
}
```

#### 错误响应

```json
{
  "status": "error",
  "error": "错误消息",
  "code": 400 // 错误状态码
}
```

### 常见状态码

| 状态码 | 描述 |
| :--- | :--- |
| 200 | 操作成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

## 数据库管理

### 数据库初始化

后端服务启动时会自动初始化数据库，创建以下表：
- `blog_posts`: 博客文章表
- `tutorials`: 教程表
- `tools`: 工具表
- `categories`: 分类表

### 数据备份

```bash
# 备份数据库文件
cp database.db database.db.backup
```

### 数据恢复

```bash
# 恢复数据库文件
cp database.db.backup database.db
```

## 性能优化

### 1. 数据库连接池

后端已实现数据库连接池管理，减少数据库连接开销。

配置文件位置：`src/config/database.ts`

### 2. 请求限流

后端已实现基于 IP 的请求限流机制，防止 API 滥用。

配置文件位置：`src/middleware/rate-limit-middleware.ts`

默认配置：
- 时间窗口：15分钟
- 最大请求数：100次/IP

### 3. 分页机制

所有列表接口都支持分页，减少数据传输量。

参数：
- `page`: 页码，默认 1
- `pageSize`: 每页数量，默认 10

## 安全措施

### 1. SQL 注入防护

所有数据库操作都使用参数化查询，防止 SQL 注入攻击。

### 2. 输入验证

所有用户输入都经过严格验证，包括：
- 长度限制
- 格式验证
- 必填项检查

验证工具位置：`src/utils/validation-utils.ts`

### 3. CORS 配置

严格的 CORS 配置，只允许受信任的来源访问。

### 4. 请求限流

防止 API 滥用和 DoS 攻击。

## 常见问题排查

### 1. 数据库连接失败

**症状**：服务启动失败，报错 "Cannot connect to database"

**解决方案**：
- 检查 `DB_PATH` 配置是否正确
- 确保数据库文件所在目录有写权限
- 尝试删除 `database.db` 文件，让系统重新创建

### 2. 跨域错误

**症状**：前端请求报错 "Access to fetch at ... has been blocked by CORS policy"

**解决方案**：
- 确保前端应用运行在允许的来源（`http://localhost:3000` 或 `http://localhost:5173`）
- 如需添加其他来源，修改 `src/middleware/cors-middleware.ts` 中的 `ALLOWED_ORIGINS` 数组

### 3. API 请求失败

**症状**：前端请求返回 400、404 或 500 错误

**解决方案**：
- 检查请求 URL 是否正确（包含 `/api/v1` 前缀）
- 检查请求参数是否符合 API 文档要求
- 查看后端日志，了解具体错误原因

### 4. 请求限流

**症状**：前端请求返回 429 错误，提示 "请求过于频繁"

**解决方案**：
- 减少请求频率
- 实现前端缓存，避免重复请求
- 如需调整限流配置，修改 `src/middleware/rate-limit-middleware.ts`

### 5. 类型错误

**症状**：TypeScript 编译错误，提示类型不匹配

**解决方案**：
- 参考 `DATA_MODEL_MAPPING.md` 文档，确保数据类型转换正确
- 检查前后端类型定义是否一致

### 6. 服务启动失败

**症状**：`npm run dev` 或 `npm start` 命令失败

**解决方案**：
- 检查 Node.js 版本是否符合要求
- 确保所有依赖已正确安装（运行 `npm install`）
- 查看错误信息，了解具体失败原因

## 调试技巧

### 1. 查看后端日志

开发环境下，后端服务会在控制台输出详细的请求日志和错误信息。

### 2. 使用 API 测试工具

推荐使用 Postman 或 Insomnia 等工具测试 API 接口。

### 3. 查看数据库内容

可以使用 SQLite 客户端工具查看数据库内容，例如：
- DB Browser for SQLite
- SQLite Studio
- 命令行工具 `sqlite3`

## 部署指南

### 本地部署

1. 按照 "环境配置" 部分设置环境
2. 运行 `npm run build` 构建项目
3. 运行 `npm start` 启动服务

### 云服务部署

#### 1. Heroku

1. 创建 Heroku 账号并安装 Heroku CLI
2. 登录 Heroku：`heroku login`
3. 创建 Heroku 应用：`heroku create`
4. 推送代码：`git push heroku main`
5. 启动应用：`heroku ps:scale web=1`
6. 查看日志：`heroku logs --tail`

#### 2. Vercel

1. 创建 Vercel 账号
2. 连接 GitHub 仓库
3. 配置构建命令：`npm run build`
4. 配置输出目录：`dist`
5. 部署应用

### 环境变量配置

部署到云服务时，需要在服务提供商的控制台中配置环境变量：
- `DB_PATH`: 数据库路径（云服务可能需要使用绝对路径）
- `PORT`: 服务器端口（通常由云服务自动分配）
- `NODE_ENV`: `production`

## 监控与维护

### 1. 日志管理

- 开发环境：控制台输出
- 生产环境：建议配置日志存储服务（如 ELK Stack、AWS CloudWatch 等）

### 2. 性能监控

- 监控 API 响应时间
- 监控数据库查询性能
- 监控服务器资源使用情况

### 3. 定期维护

- 备份数据库
- 更新依赖包
- 检查安全漏洞

## 版本管理

### API 版本

当前 API 版本为 v1，路径前缀为 `/api/v1`。

### 向后兼容性

- 新增字段：向后兼容，旧客户端忽略新字段
- 修改字段：保持字段名称和类型不变，如需修改，创建新字段
- 删除字段：标记为废弃，保留一段时间后再删除

## 联系信息

### 技术支持

- **Email**: support@example.com
- **GitHub Issues**: <repository-url>/issues

### 文档更新

- **API 文档**: `API_DOCS.md`
- **数据模型映射**: `DATA_MODEL_MAPPING.md`
- **集成指南**: `INTEGRATION_GUIDE.md`

## 总结

本文档提供了后端服务的完整集成指南，帮助前端工程师快速集成后端服务。如有任何问题或建议，请参考 "常见问题排查" 部分或联系技术支持。

通过遵循本文档的指导，前端工程师可以：
- 快速搭建开发环境
- 正确配置 API 客户端
- 处理常见错误和异常情况
- 优化前端与后端的交互性能
- 确保系统的安全性和稳定性

祝集成顺利！
