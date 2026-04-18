import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { DetailContainer } from '../components/layout/DetailContainer';

const TestMdPage: React.FC = () => {
  // 硬编码的MD内容用于测试
  const testMdContent = `# 测试MD文档

这是一个测试MD文档，用于验证MD渲染功能是否正常工作。

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 段落和换行

这是第一个段落。

这是第二个段落，前面有一个空行。

## 列表

### 无序列表
- 列表项1
- 列表项2
  - 嵌套列表项1
  - 嵌套列表项2
- 列表项3

### 有序列表
1. 第一项
2. 第二项
   1. 嵌套第一项
   2. 嵌套第二项
3. 第三项

## 代码

### 内联代码
这是一个内联代码：\`console.log('Hello World')\`

### 代码块
\`\`\`javascript
function test() {
  console.log('Hello World');
  return true;
}
\`\`\`

## 引用

> 这是一个引用
> 引用的第二行

## 链接

[Google](https://www.google.com)

## 图片

![测试图片](https://via.placeholder.com/400x200)

## 粗体和斜体

**粗体文本**

*斜体文本*

***粗斜体文本***

## 分隔线

---

## 表格

| 列1 | 列2 | 列3 |
| --- | --- | --- |
| 行1列1 | 行1列2 | 行1列3 |
| 行2列1 | 行2列2 | 行2列3 |
`;

  return (
    <DetailContainer maxWidth="4xl">
      <article className="relative">
        <header className="mb-10 pb-10 border-b border-white/5 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-text-primary leading-tight tracking-tight">
            MD渲染测试页面
          </h1>
          <p className="text-text-secondary">
            测试各种Markdown语法的渲染效果
          </p>
        </header>
        
        <div className="prose prose-invert prose-lg max-w-none text-text-primary leading-relaxed relative z-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ node, inline, className, src, alt, title, ...props }) => (
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  className={`${className || ''} max-w-full h-auto rounded-lg border border-border`}
                  {...props}
                />
              ),
              p: ({ children, ...props }) => (
                <p className="mb-6 text-lg text-text-secondary/90" {...props}>
                  {children}
                </p>
              ),
              pre: ({ children, ...props }) => (
                <pre className="mb-6 p-4 bg-surface-highlight rounded-lg overflow-x-auto" {...props}>
                  {children}
                </pre>
              ),
              code: ({ inline, children, className, ...props }) => {
                if (inline) {
                  return (
                    <code className="bg-surface-highlight px-1.5 py-0.5 rounded text-blue-400" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary" {...props}>
                  {children}
                </blockquote>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="text-text-secondary/90" {...props}>
                  {children}
                </li>
              ),
              h1: ({ children, ...props }) => (
                <h1 className="text-3xl font-bold mb-6 text-text-primary" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className="text-2xl font-bold mb-4 text-text-primary" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="text-xl font-bold mb-3 text-text-primary" {...props}>
                  {children}
                </h3>
              ),
              h4: ({ children, ...props }) => (
                <h4 className="text-lg font-bold mb-2 text-text-primary" {...props}>
                  {children}
                </h4>
              ),
              h5: ({ children, ...props }) => (
                <h5 className="font-bold mb-2 text-text-primary" {...props}>
                  {children}
                </h5>
              ),
              h6: ({ children, ...props }) => (
                <h6 className="font-bold mb-2 text-text-secondary" {...props}>
                  {children}
                </h6>
              ),
              a: ({ children, href, ...props }) => (
                <a 
                  href={href} 
                  className="text-blue-400 hover:text-blue-300 underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              )
            }}
          >
            {testMdContent}
          </ReactMarkdown>
        </div>
      </article>
    </DetailContainer>
  );
};

export default TestMdPage;