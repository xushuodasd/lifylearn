# 企业内部培训功能设计文档

## 1. 功能概述

企业内部培训功能是一个为企业提供专属培训平台的模块，允许企业创建、管理和分发内部培训课程，员工可以通过企业认证登录后访问和学习这些课程。

## 2. 整体架构

### 2.1 技术栈

- **前端**：React + TypeScript + React Router + Tailwind CSS
- **后端**：Node.js + Express + TypeScript + Sequelize
- **数据库**：PostgreSQL
- **认证**：JWT (JSON Web Token)

### 2.2 模块结构

#### 后端模块

```
backend/src/
├── controllers/
│   └── enterprise-controller.ts  # 企业相关控制器
├── models/
│   ├── EnterpriseModel.ts        # 企业模型
│   ├── EnterpriseUserModel.ts     # 企业用户模型
│   ├── TrainingCourseModel.ts     # 培训课程模型
│   └── LearningRecordModel.ts     # 学习记录模型
├── routes/
│   └── enterprise-routes.ts       # 企业相关路由
├── services/
│   └── EnterpriseService.ts       # 企业相关服务
├── types/
│   └── enterprise.ts              # 企业相关类型定义
└── middleware/
    └── enterprise-auth-middleware.ts  # 企业认证中间件
```

#### 前端模块

```
frontend/src/
├── components/
│   └── enterprise/
│       ├── EnterpriseLogin.tsx    # 企业登录组件
│       ├── EnterpriseSelector.tsx # 企业选择组件
│       ├── CourseList.tsx         # 课程列表组件
│       ├── CourseDetail.tsx       # 课程详情组件
│       ├── LearningDashboard.tsx  # 学习仪表盘组件
│       └── AdminPanel.tsx         # 企业管理员面板组件
├── pages/
│   └── enterprise/
│       ├── LoginPage.tsx          # 企业登录页
│       ├── DashboardPage.tsx      # 企业培训仪表盘
│       ├── CoursePage.tsx         # 企业课程页
│       └── AdminPage.tsx          # 企业管理页
├── services/
│   └── enterpriseService.ts       # 企业相关API服务
└── context/
    └── EnterpriseContext.tsx      # 企业认证上下文
```

## 3. 数据模型设计

### 3.1 数据库表结构

#### `enterprises` 表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| `id` | `UUID` | `PRIMARY KEY` | 企业ID |
| `name` | `VARCHAR(255)` | `NOT NULL` | 企业名称 |
| `code` | `VARCHAR(50)` | `UNIQUE NOT NULL` | 企业代码（用于登录） |
| `description` | `TEXT` | | 企业描述 |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 创建时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

#### `enterprise_users` 表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| `id` | `UUID` | `PRIMARY KEY` | 用户ID |
| `enterprise_id` | `UUID` | `REFERENCES enterprises(id)` | 所属企业ID |
| `username` | `VARCHAR(100)` | `NOT NULL` | 用户名 |
| `email` | `VARCHAR(255)` | `UNIQUE NOT NULL` | 邮箱 |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | 密码哈希 |
| `role` | `VARCHAR(20)` | `NOT NULL` | 角色（admin/user） |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 创建时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

#### `training_courses` 表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| `id` | `UUID` | `PRIMARY KEY` | 课程ID |
| `enterprise_id` | `UUID` | `REFERENCES enterprises(id)` | 所属企业ID |
| `title` | `VARCHAR(255)` | `NOT NULL` | 课程标题 |
| `description` | `TEXT` | | 课程描述 |
| `content` | `TEXT` | `NOT NULL` | 课程内容 |
| `difficulty` | `VARCHAR(20)` | `NOT NULL` | 难度等级（beginner/intermediate/advanced） |
| `category` | `VARCHAR(100)` | | 课程分类 |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 创建时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

#### `learning_records` 表
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| `id` | `UUID` | `PRIMARY KEY` | 记录ID |
| `user_id` | `UUID` | `REFERENCES enterprise_users(id)` | 用户ID |
| `course_id` | `UUID` | `REFERENCES training_courses(id)` | 课程ID |
| `progress` | `INTEGER` | `DEFAULT 0` | 学习进度（百分比） |
| `completed` | `BOOLEAN` | `DEFAULT FALSE` | 是否完成 |
| `started_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 开始学习时间 |
| `completed_at` | `TIMESTAMP` | | 完成时间 |
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | 更新时间 |

### 3.2 TypeScript 类型定义

```typescript
// 企业类型
export interface Enterprise {
  id: string;
  name: string;
  code: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

// 企业用户类型
export interface EnterpriseUser {
  id: string;
  enterprise_id: string;
  username: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

// 培训课程类型
export interface TrainingCourse {
  id: string;
  enterprise_id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  created_at: Date;
  updated_at: Date;
}

// 学习记录类型
export interface LearningRecord {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  completed: boolean;
  started_at: Date;
  completed_at: Date | null;
  updated_at: Date;
}

// 登录请求类型
export interface EnterpriseLoginRequest {
  username: string;
  password: string;
  enterprise_code: string;
}

// 登录响应类型
export interface EnterpriseLoginResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
    enterprise_id: string;
    enterprise_name: string;
  };
}

// 课程创建请求类型
export interface CourseCreateRequest {
  title: string;
  description: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

// 学习进度更新请求类型
export interface LearningProgressUpdateRequest {
  course_id: string;
  progress: number;
  completed?: boolean;
}
```

## 4. API 接口设计

### 4.1 认证相关接口

| API路径 | 方法 | 功能描述 | 请求体 (JSON) | 响应体 (JSON) |
|--------|-----|---------|-------------|-------------|
| `/api/enterprise/auth/login` | `POST` | 企业用户登录 | `{"username": "...", "password": "...", "enterprise_code": "..."}` | `{"access_token": "...", "user": {...}}` |
| `/api/enterprise/auth/register` | `POST` | 企业用户注册（需企业管理员权限） | `{"username": "...", "email": "...", "password": "...", "role": "..."}` | `{"id": "...", "username": "...", "email": "..."}` |
| `/api/enterprise/auth/refresh` | `POST` | 刷新访问令牌 | `{"refresh_token": "..."}` | `{"access_token": "..."}` |

### 4.2 企业管理接口

| API路径 | 方法 | 功能描述 | 请求体 (JSON) | 响应体 (JSON) |
|--------|-----|---------|-------------|-------------|
| `/api/enterprise` | `GET` | 获取企业信息 | N/A | `{"id": "...", "name": "...", "code": "...", "description": "..."}` |
| `/api/enterprise` | `POST` | 创建企业（需平台管理员权限） | `{"name": "...", "code": "...", "description": "..."}` | `{"id": "...", "name": "...", "code": "..."}` |
| `/api/enterprise` | `PUT` | 更新企业信息 | `{"name": "...", "description": "..."}` | `{"id": "...", "name": "...", "description": "..."}` |
| `/api/enterprise/users` | `GET` | 获取企业用户列表 | N/A | `[{"id": "...", "username": "...", "email": "...", "role": "..."}]` |
| `/api/enterprise/users/:id` | `DELETE` | 删除企业用户 | N/A | `{"success": true}` |

### 4.3 课程管理接口

| API路径 | 方法 | 功能描述 | 请求体 (JSON) | 响应体 (JSON) |
|--------|-----|---------|-------------|-------------|
| `/api/enterprise/courses` | `GET` | 获取企业课程列表 | N/A | `[{"id": "...", "title": "...", "description": "...", "difficulty": "...", "category": "..."}]` |
| `/api/enterprise/courses` | `POST` | 创建课程（需企业管理员权限） | `{"title": "...", "description": "...", "content": "...", "difficulty": "...", "category": "..."}` | `{"id": "...", "title": "...", "description": "..."}` |
| `/api/enterprise/courses/:id` | `GET` | 获取课程详情 | N/A | `{"id": "...", "title": "...", "description": "...", "content": "...", "difficulty": "...", "category": "..."}` |
| `/api/enterprise/courses/:id` | `PUT` | 更新课程（需企业管理员权限） | `{"title": "...", "description": "...", "content": "...", "difficulty": "...", "category": "..."}` | `{"id": "...", "title": "...", "description": "..."}` |
| `/api/enterprise/courses/:id` | `DELETE` | 删除课程（需企业管理员权限） | N/A | `{"success": true}` |

### 4.4 学习记录接口

| API路径 | 方法 | 功能描述 | 请求体 (JSON) | 响应体 (JSON) |
|--------|-----|---------|-------------|-------------|
| `/api/enterprise/learning/records` | `GET` | 获取用户学习记录 | N/A | `[{"id": "...", "course_id": "...", "course_title": "...", "progress": 80, "completed": false}]` |
| `/api/enterprise/learning/records` | `POST` | 更新学习进度 | `{"course_id": "...", "progress": 80, "completed": false}` | `{"id": "...", "course_id": "...", "progress": 80, "completed": false}` |
| `/api/enterprise/learning/dashboard` | `GET` | 获取学习仪表盘数据 | N/A | `{"total_courses": 10, "completed_courses": 3, "in_progress_courses": 2, "total_hours": 15}` |

## 5. 用户流程

### 5.1 企业登录流程

1. 用户访问企业培训登录页
2. 用户输入企业代码、用户名和密码
3. 系统验证企业代码和用户凭据
4. 验证成功后，系统生成JWT令牌并返回用户信息
5. 前端存储JWT令牌并跳转到企业培训仪表盘

### 5.2 课程学习流程

1. 用户登录企业培训平台
2. 用户浏览可用课程列表
3. 用户选择感兴趣的课程并进入课程详情页
4. 用户开始学习课程内容
5. 系统实时记录用户学习进度
6. 用户完成课程后，系统标记课程为已完成并更新学习记录

### 5.3 企业管理员流程

1. 企业管理员登录企业培训平台
2. 管理员进入企业管理面板
3. 管理员可以：
   - 创建、编辑和删除课程
   - 管理企业用户（添加、删除、修改角色）
   - 查看企业培训统计数据
   - 配置企业培训平台设置

## 6. 前端页面设计

### 6.1 企业登录页

- **布局**：简洁的登录表单，包含企业代码输入框、用户名输入框、密码输入框和登录按钮
- **功能**：企业代码验证、用户认证、错误提示
- **设计风格**：与主站保持一致的现代、简洁风格，使用品牌色调

### 6.2 企业培训仪表盘

- **布局**：左侧导航栏，右侧内容区，顶部用户信息栏
- **功能**：
  - 学习概览（已完成课程数、进行中课程数、学习时长）
  - 推荐课程
  - 最近学习记录
  - 学习进度图表
- **设计风格**：专业、清晰，使用卡片式布局，数据可视化图表

### 6.3 企业课程页

- **布局**：课程列表（可筛选、排序），课程详情侧边栏
- **功能**：
  - 课程分类筛选
  - 课程难度筛选
  - 课程搜索
  - 课程详情预览
  - 开始学习按钮
- **设计风格**：整洁、有序，使用卡片式布局展示课程信息

### 6.4 课程详情页

- **布局**：课程内容区，学习进度条，目录导航
- **功能**：
  - 课程内容展示（支持富文本）
  - 学习进度自动保存
  - 课程讨论区（可选）
  - 完成课程按钮
- **设计风格**：专注、沉浸式，减少干扰元素，突出课程内容

### 6.5 企业管理页

- **布局**：左侧管理菜单，右侧管理内容区
- **功能**：
  - 课程管理（创建、编辑、删除）
  - 用户管理（添加、删除、修改角色）
  - 培训统计（学习数据、完成率等）
  - 企业设置（基本信息、品牌设置等）
- **设计风格**：专业、高效，使用表格和表单布局，功能分区明确

## 7. 安全性考虑

### 7.1 认证与授权

- 使用JWT进行企业用户认证
- 实现基于角色的访问控制（RBAC）
- 密码使用bcrypt等安全哈希算法存储
- 敏感操作需要二次验证

### 7.2 数据保护

- 企业数据与其他企业数据严格隔离
- 敏感数据传输使用HTTPS加密
- 定期备份企业培训数据
- 实现数据访问审计日志

### 7.3 输入验证

- 所有用户输入都需要进行验证
- 防止SQL注入、XSS等常见攻击
- 实现请求速率限制，防止暴力破解

## 8. 性能优化

### 8.1 后端优化

- 使用数据库索引加速查询
- 实现API响应缓存
- 优化数据库查询，减少N+1问题
- 使用异步处理处理耗时操作

### 8.2 前端优化

- 组件懒加载
- 图片和资源优化
- 前端状态管理优化
- 减少不必要的API请求

## 9. 集成方案

### 9.1 与现有系统集成

- 在主站导航栏添加企业培训入口
- 复用现有认证机制的核心逻辑
- 共享前端UI组件和设计系统
- 集成现有工具和教程资源到企业培训平台

### 9.2 部署方案

- 与现有系统共用同一服务器和数据库
- 使用环境变量区分不同环境的配置
- 实现CI/CD流程，确保代码质量和部署效率

## 10. 后续扩展可能性

- **学习路径**：创建结构化的学习路径，引导用户系统学习
- **考试评估**：添加课程考试和评估功能
- **证书管理**：为完成课程的用户颁发电子证书
- **社交学习**：添加学习社区和协作功能
- **移动应用**：开发企业培训移动应用
- **AI辅助**：集成AI辅助学习和内容生成功能

## 11. 实施计划

### 11.1 开发阶段

1. **准备阶段**（1周）：
   - 搭建开发环境
   - 创建数据库表结构
   - 实现核心认证功能

2. **后端开发**（2周）：
   - 实现企业相关API接口
   - 开发企业服务和数据模型
   - 实现企业认证中间件

3. **前端开发**（2周）：
   - 开发企业登录和选择组件
   - 实现企业培训仪表盘
   - 开发课程管理和学习页面

4. **测试阶段**（1周）：
   - 功能测试
   - 性能测试
   - 安全测试

5. **部署阶段**（1周）：
   - 部署到生产环境
   - 监控和优化
   - 文档完善

### 11.2 里程碑

- **里程碑1**：完成核心认证功能和数据库结构
- **里程碑2**：完成后端API接口开发
- **里程碑3**：完成前端页面开发
- **里程碑4**：完成测试和部署
- **里程碑5**：正式上线企业内部培训功能

## 12. 总结

企业内部培训功能是一个为企业提供专属培训平台的重要模块，它将帮助企业更有效地管理和分发内部培训内容，提高员工技能水平和工作效率。通过模块化设计和与现有系统的无缝集成，我们可以快速实现这一功能，并为后续的扩展和优化做好准备。

本设计方案充分考虑了系统架构、数据模型、API接口、用户流程、前端页面设计、安全性、性能优化等各个方面，为开发团队提供了清晰的实施指南。
