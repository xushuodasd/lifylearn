# 博客工具箱 PRD v1.0

## [Project DNA]
个人工作效率提升平台，集博客、教程和工具于一体，支持持续扩展。

## [First Action Path]
用户访问平台 → 浏览内容/使用工具。

## [Technical Constraints]
### Data Model
- **BlogPost**：{ id, title, content, created_at, updated_at, tags }
- **Tutorial**：{ id, title, content, created_at, updated_at, category, difficulty }
- **Tool**：{ id, name, description, url, category, created_at }
- **Category**：{ id, name, description }

### State Machine
- **Content**：[Draft → Published → Updated]
- **Tool**：[Added → Updated → Removed]

## [Feature Spec]
1. **博客展示**：
   - 支持文章列表展示，按时间倒序排列
   - 支持文章详情页，包含标题、内容、发布时间、标签
   - 支持标签筛选功能

2. **教程管理**：
   - 支持教程分类展示
   - 支持教程详情页，包含标题、内容、难度等级
   - 支持按分类和难度筛选

3. **工具集成**：
   - 支持工具列表展示，按分类分组
   - 支持工具详情页，包含名称、描述、使用链接
   - 仅管理员页面支持添加新工具入口

4. **可扩展性**：
   - 模块化设计，支持后续添加新工具和功能
   - 响应式布局，适配不同设备

5. **知识碎片MD文件上传**：
   - 支持直接上传MD格式文件，自动读取和解析内容
   - 上传后自动提取文件中的标题（以#开头的第一行）
   - 自动将MD文件内容填充到博客表单中
   - 支持在管理员后台的博客管理页面使用此功能
   - 支持MD文档中的图片，包括网络图片和本地图片
   - 支持标准Markdown图片语法：![图片描述](图片链接)
   - 图片会自动适应容器宽度，保持响应式显示

6. **Word文档导入支持**：
   - 支持上传 `.docx` 格式文档
   - 自动解析文档内容为 Markdown 格式
   - 智能提取并保留文档中的图片
   - 自动处理图片上传并生成正确的 Markdown 引用路径

7. **文件上传增强**：
   - 支持大文件上传（上限 200MB）
   - 支持图片和文档类型文件管理
   - 提供上传进度反馈和错误提示

## [Not-To-Do List]
- ❌ 严禁开发复杂的用户登录/注册系统
- ❌ 严禁开发社交分享功能
- ❌ 严禁开发高级数据分析功能
- ❌ 严禁开发评论系统
- ❌ 严禁开发付费功能
