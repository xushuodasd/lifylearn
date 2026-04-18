import React from 'react';
import { Link } from 'react-router-dom';

interface ContentCardProps {
  to: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  author?: string;
  image?: string; // Optional image URL
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

const ContentCard: React.FC<ContentCardProps> = ({
  to,
  title,
  description,
  category,
  tags,
  author,
  image,
  difficulty,
}) => {
  return (
    <Link 
      to={to} 
      className="block group h-full"
    >
      <div className="h-full bg-[#1e1e21] hover:bg-[#252529] rounded-3xl p-6 transition-all duration-300 flex flex-col relative overflow-hidden">
        {/* Hover Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Header: Category & Difficulty */}
        {(category || difficulty) && (
          <div className="flex items-center gap-3 mb-4 relative z-10">
            {category && (
              <span className="text-xs font-medium text-blue-400 tracking-wide uppercase">
                {category}
              </span>
            )}
            {difficulty && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                difficulty === 'Beginner' ? 'text-green-400 border-green-400/20 bg-green-400/10' :
                difficulty === 'Intermediate' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' :
                'text-red-400 border-red-400/20 bg-red-400/10'
              }`}>
                {difficulty}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors relative z-10 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow relative z-10">
          {description}
        </p>

        {/* Footer: Arrow Icon */}
        <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/5 relative z-10">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
