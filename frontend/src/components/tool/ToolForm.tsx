import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTool } from '../../services/toolService';

interface FormErrors {
  name?: string;
  description?: string;
  url?: string;
  category?: string;
}

const ToolForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // 验证表单字段
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '工具名称不能为空';
        if (value.length < 2) return '工具名称至少需要2个字符';
        if (value.length > 50) return '工具名称不能超过50个字符';
        break;
      case 'description':
        if (!value.trim()) return '工具描述不能为空';
        if (value.length < 10) return '工具描述至少需要10个字符';
        if (value.length > 500) return '工具描述不能超过500个字符';
        break;
      case 'url':
        if (!value.trim()) return '工具链接不能为空';
        try {
          new URL(value);
        } catch {
          return '请输入有效的URL地址';
        }
        break;
      case 'category':
        if (!value.trim()) return '工具分类不能为空';
        if (value.length < 2) return '工具分类至少需要2个字符';
        if (value.length > 30) return '工具分类不能超过30个字符';
        break;
      default:
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // 实时验证
    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // 验证整个表单
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        errors[name as keyof FormErrors] = error;
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!validateForm()) {
      setError('请检查表单中的错误');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      await createTool(formData);
      navigate('/tools');
    } catch (err) {
      setError('创建工具失败，请重试');
      console.error('Error creating tool:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-text-primary">添加新工具</h1>
          <p className="text-text-secondary">分享您发现的实用工具，帮助更多人提升效率</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl mb-8 flex items-center gap-3 animate-slide-up">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2 ml-1">
              工具名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-surface-highlight/30 border ${
                formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'
              } text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="例如：JSON Formatter"
            />
            {formErrors.name && (
              <p className="mt-1 ml-1 text-xs text-red-400">{formErrors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-2 ml-1">
              分类 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-surface-highlight/30 border ${
                formErrors.category ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'
              } text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="例如：开发工具"
            />
            {formErrors.category && (
              <p className="mt-1 ml-1 text-xs text-red-400">{formErrors.category}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-text-secondary mb-2 ml-1">
              工具链接 <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-surface-highlight/30 border ${
                formErrors.url ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'
              } text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              placeholder="https://example.com"
            />
            {formErrors.url && (
              <p className="mt-1 ml-1 text-xs text-red-400">{formErrors.url}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2 ml-1">
              描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl bg-surface-highlight/30 border ${
                formErrors.description ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'
              } text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none`}
              placeholder="简要介绍这个工具的功能和用途..."
            />
            {formErrors.description && (
              <p className="mt-1 ml-1 text-xs text-red-400">{formErrors.description}</p>
            )}
          </div>
          
          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/tools')}
              className="flex-1 px-6 py-3.5 rounded-xl border border-white/10 text-text-secondary hover:bg-surface-highlight hover:text-text-primary font-medium transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>提交中...</span>
                </>
              ) : (
                <>
                  <span>提交工具</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToolForm;
