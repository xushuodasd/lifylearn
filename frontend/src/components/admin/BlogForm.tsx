/**
 * 博客表单组件
 */

import { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../../types/blog';
import { Category } from '../../types/category';
import { createBlogPost, updateBlogPost } from '../../services/adminService';
import { getCategoriesByModule } from '../../services/categoryService';
import { uploadImage, importWord } from '../../services/uploadService';

interface BlogFormProps {
  blog: BlogPost | null;
  onClose: () => void;
}

const BlogForm = ({ blog, onClose }: BlogFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileUploadError, setFileUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 处理图片和Word文件上传
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型 (图片或Word文档)
    const isImage = file.type.startsWith('image/');
    const isWord = file.type === 'application/msword' || 
                   file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (!isImage && !isWord) {
      setFileUploadError('请上传图片或Word文档');
      return;
    }

    // 检查文件大小 (200MB)
    if (file.size > 200 * 1024 * 1024) {
      setFileUploadError('文件大小不能超过 200MB');
      return;
    }

    try {
      setIsUploading(true);
      setFileUploadError('');
      
      let markdown = '';
      if (isImage) {
        const fileUrl = await uploadImage(file);
        markdown = `![${file.name}](${fileUrl})`;
      } else {
        // 导入 Word 文档内容
        markdown = await importWord(file);
      }
      
      insertAtCursor(markdown);
      
    } catch (err) {
      console.error('文件上传/导入失败:', err);
      setFileUploadError('文件上传/导入失败，请重试');
    } finally {
      setIsUploading(false);
      // 清空 input，允许重复上传同一文件
      e.target.value = '';
    }
  };

  // 在光标位置插入文本
  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = content;
    
    const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
    setContent(newContent);
    
    // 恢复焦点并移动光标
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  // 处理MD文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.name.endsWith('.md')) {
      setFileUploadError('请上传MD格式的文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const mdContent = event.target?.result as string;
      if (mdContent) {
        // 解析MD文件内容
        parseMdContent(mdContent);
      }
    };
    reader.onerror = () => {
      setFileUploadError('文件读取失败');
    };
    reader.readAsText(file);
  };

  // 解析MD文件内容
  const parseMdContent = (mdContent: string) => {
    // 提取标题（假设标题在文件第一行，以#开头）
    const titleMatch = mdContent.match(/^#\s+(.*)$/m);
    if (titleMatch) {
      setTitle(titleMatch[1]);
    }

    // 设置内容
    setContent(mdContent);
    setFileUploadError('');
  };

  // 获取博客分类列表
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const blogCategories = await getCategoriesByModule('blog');
        setCategories(blogCategories);
      } catch (error) {
        console.error('获取分类列表失败:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 初始化表单数据
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setCategory(blog.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [blog]);

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (blog) {
        // 更新博客
        await updateBlogPost(blog.id.toString(), { title, content, category });
      } else {
        // 创建博客
        await createBlogPost({ title, content, category });
      }

      onClose();
    } catch (err) {
      setError('保存失败，请重试');
      console.error('保存博客失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          {blog ? '编辑博客' : '添加博客'}
        </h2>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
          {error}
        </div>
      )}

      {fileUploadError && (
        <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
          {fileUploadError}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-text-secondary mb-1">
          上传MD文件
        </label>
        <input
          type="file"
          accept=".md"
          onChange={handleFileUpload}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
        />
        <p className="mt-1 text-xs text-text-muted">
          上传MD文件后，系统会自动提取标题和内容
        </p>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-text-secondary mb-1"
        >
          插入图片或附件
        </label>
        <input
          type="file"
          accept="image/*,.doc,.docx"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleImageUpload(e);
            }
          }}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
        />
        <p className="mt-1 text-xs text-text-muted">
          选择图片会自动插入图片链接，选择 Word 文档会自动转换为 Markdown 内容插入（文件大小不超过 200MB）
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            标题
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            内容 {isUploading && <span className="text-blue-400 text-xs ml-2">正在上传图片...</span>}
          </label>
          <textarea
            id="content"
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight font-mono text-sm"
            rows={15}
            required
            placeholder="支持 Markdown 格式"
          />
        </div>



        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-text-secondary mb-1"
          >
            分类
          </label>
          {categoriesLoading ? (
            <div className="flex justify-center items-center h-10">
              <div className="text-text-secondary">加载中...</div>
            </div>
          ) : (
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-highlight"
              required
            >
              <option value="">请选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-md text-text-secondary hover:bg-surface-highlight transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;