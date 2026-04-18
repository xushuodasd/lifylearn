import { Link } from 'react-router-dom';
import Particles from '../components/common/Particles';

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-white flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      {/* Main Text - Absolute Center (Shifted Up) */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center px-4 w-full max-w-5xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-wide mb-10 sm:mb-12 text-white">
          Lify
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
          探索我们精心策划的工具、教程和见解，开启全新的学习体验。
        </p>
      </div>

      {/* Buttons - Absolute 80% Top (4/5 Position) */}
      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-center px-4">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
          <Link 
            to="/knowledge" 
            className="px-8 py-3 rounded-full bg-white text-black text-base font-medium hover:bg-gray-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5 min-w-[160px] flex items-center justify-center text-center tracking-wide"
          >
            知识碎片
          </Link>
          <Link 
            to="/tools" 
            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-base font-medium hover:bg-white/10 transition-all duration-300 hover:border-white/30 min-w-[160px] flex items-center justify-center text-center tracking-wide"
          >
            发现工具
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
