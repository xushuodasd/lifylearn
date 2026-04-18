# Markdown 图片上传和 Word 文档导入功能

## 1. 功能概述
本功能旨在优化内容创作体验，支持在 Markdown 编辑器中：
1.  **图片上传**：直接选择图片文件上传，自动返回 URL 并插入 Markdown 图片语法。
2.  **Word 文档导入**：选择 Word 文档（.docx），后端自动解析文档内容（保留标题、段落、代码块等格式）并提取文档中的图片，最终转换为 Markdown 格式插入编辑器。

## 2. 技术实现

### 2.1 后端 (Backend)
-   **核心依赖**:
    -   `multer`: 处理 `multipart/form-data` 文件上传。
    -   `mammoth`: 将 .docx 文件解析为 HTML，并支持自定义图片处理。
    -   `turndown`: 将 HTML 转换为 Markdown。
    -   `uuid`: 生成唯一的文件名。
-   **路由**:
    -   `POST /api/v1/upload`: 通用文件上传接口（图片）。
    -   `POST /api/v1/import-word`: Word 文档导入接口。
-   **控制器**: `src/controllers/upload-controller.ts`
-   **服务/工具**: `src/utils/word-parser.ts`
    -   实现了 `parseWordToMarkdown` 方法。
    -   **图片处理**: 解析 Word 时自动提取嵌入的图片，保存到 `public/uploads`，并将 `<img>` 标签的 `src` 指向后端静态资源路径。
    -   **HTML转Markdown**: 使用 `turndown`，并添加了自定义规则以确保 `<img>` 标签被正确转换为 Markdown 图片语法 `![alt](src)`。
-   **静态资源**:
    -   使用 `express.static` 在 `/uploads` 路径下提供上传文件的访问服务。
    -   配置文件：`src/app.ts`。
-   **配置**:
    -   文件大小限制：**200MB** (在 `src/middleware/upload-middleware.ts` 中配置)。
    -   允许的文件类型：
        -   图片: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
        -   文档: `.doc`, `.docx` (MIME types: `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`)

### 2.2 前端 (Frontend)
-   **服务**: `src/services/uploadService.ts`
    -   `uploadImage(file)`: 上传图片，返回 URL。
    -   `importWord(file)`: 上传 Word 文件，返回解析后的 Markdown 文本。
-   **组件**: `src/components/admin/BlogForm.tsx`
    -   集成在编辑器工具栏的“插入图片或附件”功能。
    -   **智能处理**:
        -   识别文件类型：如果是图片，调用 `uploadImage` 并插入 `![name](url)`。
        -   识别文件类型：如果是 Word 文档，调用 `importWord` 并插入解析后的 Markdown 内容。
        -   其他文件：(暂未实现，可扩展为普通附件下载链接)。
    -   **交互**: 显示文件大小限制提示（不超过 200MB），上传过程中禁用输入框并显示状态。
-   **代理配置**: `vite.config.ts`
    -   配置了 `/uploads` 路径的代理，将其转发到后端服务器 (`http://localhost:3000`)，解决开发环境下前端无法直接访问后端静态资源的问题。

## 3. API 接口规范

### 3.1 图片上传
-   **URL**: `/api/v1/upload`
-   **Method**: `POST`
-   **Content-Type**: `multipart/form-data`
-   **Body**:
    -   `image`: 文件对象 (File)
-   **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "url": "/uploads/filename.png"
      },
      "message": "上传成功"
    }
    ```

### 3.2 Word 文档导入
-   **URL**: `/api/v1/import-word`
-   **Method**: `POST`
-   **Content-Type**: `multipart/form-data`
-   **Body**:
    -   `file`: 文件对象 (File, .docx)
-   **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "markdown": "# 标题\n\n内容...\n\n![image](/uploads/xxx.png)"
      },
      "message": "Word 文档导入成功"
    }
    ```

## 4. 注意事项
1.  **图片路径**: Word 解析后的图片路径为相对路径 `/uploads/xxx.png`，依赖于前端代理或生产环境的 Nginx 配置来正确访问后端静态资源目录。
2.  **文件大小**: 目前限制为 200MB，如需调整需修改 `src/middleware/upload-middleware.ts` 和前端 `BlogForm.tsx` 中的校验逻辑。
3.  **Word 格式**: 最佳支持 `.docx` 格式。复杂排版可能无法完美还原为 Markdown，建议导入后进行人工校对。
