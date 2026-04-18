import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTutorials, clearApiCache } from '../../services/tutorialService';
import { Tutorial } from '../../types/tutorial';
import ContentCard from '../common/ContentCard';
import ListContainer from '../common/ListContainer';

const TutorialList = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const difficultyParam = searchParams.get('difficulty');

  const fetchTutorials = useCallback(async () => {
    // Clear cache to ensure fresh data
    clearApiCache('/tutorials');
    const tutorials = await getTutorials();
    return tutorials.filter((tutorial) => {
      const matchesCategory = categoryParam ? tutorial.category === categoryParam : true;
      const matchesDifficulty = difficultyParam ? tutorial.difficulty === difficultyParam : true;
      return matchesCategory && matchesDifficulty;
    });
  }, [categoryParam, difficultyParam]);

  const renderTutorialItem = (tutorial: Tutorial) => (
    <div key={tutorial.id} className="h-full">
      <ContentCard
        to={`/tutorials/${tutorial.id}`}
        title={tutorial.title}
        description={tutorial.content}
        category={tutorial.category}
        difficulty={tutorial.difficulty as 'Beginner' | 'Intermediate' | 'Advanced'}
        readTime={`${tutorial.duration} min read`}
      />
    </div>
  );

  const renderEmpty = () => (
    <div className="text-center py-20 px-8">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 text-4xl">
        📚
      </div>
      <h3 className="text-2xl font-bold text-gray-200 mb-2">暂无教程</h3>
      <p className="text-gray-500 text-[15px]">该分类下暂无相关教程。</p>
    </div>
  );

  return (
    <ListContainer
      fetchData={fetchTutorials}
      renderItem={renderTutorialItem}
      renderEmpty={renderEmpty}
    />
  );
};

export default TutorialList;
