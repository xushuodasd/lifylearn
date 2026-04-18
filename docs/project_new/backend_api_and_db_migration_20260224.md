# 后端 API 兼容性增强与数据库迁移机制 (v1.2)

## 版本信息
- **版本号**：v1.2
- **更新日期**：2026-02-24
- **状态**：已部署

## 1. 背景与问题
在系统运行过程中，发现了以下两个主要问题：
1.  **数据库表结构不一致**：部分旧有的 SQLite 数据库文件缺少新功能所需的字段（如 `tutorials` 表缺少 `image` 列），导致创建教程时报错 `SQLITE_ERROR`。
2.  **前后端数据格式不匹配**：前端重构后，博客标签（tags）以字符串数组（`['tag1', 'tag2']`）格式发送，而后端 API 仅支持逗号分隔的字符串（`"tag1,tag2"`），导致 `ValidationError`。

## 2. 解决方案

### 2.1 数据库自动迁移机制
为了解决数据库表结构不一致的问题，我们在后端引入了轻量级的自动迁移机制。

- **实现位置**：`backend/src/config/database.ts`
- **核心逻辑**：
    - 在数据库初始化 (`initialize`) 阶段，引入 `ensureColumn` 方法。
    - 该方法检查指定表是否包含指定列，如果缺失则自动执行 `ALTER TABLE ADD COLUMN` 语句。
- **应用范围**：
    - `tutorials` 表：自动添加 `image` 列。
    - `tools` 表：自动添加 `category` 列。

```typescript
// 示例代码
private async ensureColumn(db: Database, tableName: string, columnName: string, columnType: string): Promise<void> {
  // 检查列是否存在，不存在则添加
}
```

### 2.2 API 兼容性增强
为了增强 API 的健壮性并适配前端的多样化输入，我们在 Service 层实现了数据格式的自动转换。

- **涉及模块**：`BlogService`
- **实现逻辑**：
    - **类型定义更新**：`CreateBlogPost` 接口中的 `tags` 字段类型放宽为 `string | string[]`。
    - **校验逻辑增强**：`validateBlogData` 支持校验字符串数组。
    - **数据转换**：在 `BlogService.create` 和 `BlogService.update` 方法中，检测 `tags` 是否为数组。如果是，自动转换为逗号分隔的字符串存入数据库。

```typescript
// Service 层转换逻辑示例
const processedData = { ...data };
if (Array.isArray(processedData.tags)) {
  processedData.tags = processedData.tags.join(',');
}
return BlogModel.create(processedData);
```

## 3. 影响范围
- **前端**：无需回滚或修改现有的标签发送逻辑，直接支持数组格式。
- **后端**：重启服务后，旧数据库文件会自动升级，无需手动执行 SQL 脚本。
- **维护**：后续新增字段建议继续沿用 `ensureColumn` 模式，确保开发环境和生产环境的数据库结构一致性。
