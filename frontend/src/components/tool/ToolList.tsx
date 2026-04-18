import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTools } from '../../services/toolService';
import { Tool } from '../../types/tool';
import ContentCard from '../common/ContentCard';
import ListContainer from '../common/ListContainer';

const ToolList = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const fetchTools = useCallback(async () => {
    const tools = await getTools();
    if (categoryParam) {
      return tools.filter((tool) => tool.category === categoryParam);
    }
    return tools;
  }, [categoryParam]);

  const renderToolItem = (tool: Tool) => (
    <div key={tool.id} className="h-full">
      <ContentCard
        to={`/tools/${tool.id}`}
        title={tool.name}
        description={tool.description}
        category={tool.category}
        // Using tool.url as metadata if needed
      />
    </div>
  );

  const renderEmpty = () => (
    <div className="text-center py-20 px-8">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 text-4xl">
        🔍
      </div>
      <h3 className="text-2xl font-bold text-gray-200 mb-2">暂无工具</h3>
      <p className="text-gray-500 text-[15px]">该分类下暂无相关工具。</p>
    </div>
  );

  return (
    <ListContainer
      fetchData={fetchTools}
      renderItem={renderToolItem}
      renderEmpty={renderEmpty}
    />
  );
};

export default ToolList;
