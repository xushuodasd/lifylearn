import { useState, useEffect, useCallback, ReactNode } from 'react';

interface ListContainerProps<T> {
  fetchData: () => Promise<T[]>;
  renderItem: (item: T) => ReactNode;
  renderEmpty?: () => ReactNode;
  title?: string;
  renderLoading?: () => ReactNode;
  renderError?: (error: string, onRetry: () => void) => ReactNode;
}

function ListContainer<T>({
  fetchData,
  renderItem,
  renderEmpty,
  title,
  renderLoading,
  renderError,
}: ListContainerProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchData();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error('Failed to fetch data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  if (isLoading) {
    if (renderLoading) {
      return renderLoading();
    }
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-400 animate-pulse">加载数据中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    if (renderError) {
      return renderError(error, handleFetchData);
    }
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-red-400 mb-2">出错了</h3>
          <p className="text-red-300/70 mb-6">{error}</p>
          <button 
            onClick={handleFetchData}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-red-500/20"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return renderEmpty ? renderEmpty() : (
      <div className="container mx-auto p-4 text-center py-20">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">未找到内容</h3>
        <p className="text-gray-500">稍后再来看看吧。</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
      {title && (
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-gradient inline-block">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full mt-2 opacity-50"></div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListContainer;
