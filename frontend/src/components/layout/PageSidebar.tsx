import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface PageSidebarProps {
  sections: SidebarSection[];
  className?: string;
}

const PageSidebar: React.FC<PageSidebarProps> = ({ sections, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const checkActive = (itemHref: string) => {
    const [itemPath, itemQuery] = itemHref.split('?');
    const currentPath = location.pathname;
    const currentSearch = location.search;

    // Check if paths match
    if (itemPath !== currentPath) {
        return false;
    }

    // If paths match, check query params
    if (itemQuery) {
        // Simple check: if item has query, current search must contain it
        // This handles multiple params (e.g. category=X&difficulty=Y) partially
        // But for sidebar links usually we set one param.
        // If sidebar link is "?category=A", it matches "?category=A" or "?category=A&difficulty=B" ?
        // Usually sidebar sets the "primary" filter.
        // Let's stick to exact match for now to avoid confusion, or loose match if needed.
        // Given current usage: sidebar sets ?category=X. 
        // If user adds difficulty, ?category=X&difficulty=Y. Sidebar item for category X should probably stay active.
        const itemParams = new URLSearchParams(itemQuery);
        const currentParams = new URLSearchParams(currentSearch);
        
        for (const [key, value] of itemParams.entries()) {
            if (currentParams.get(key) !== value) {
                return false;
            }
        }
        return true;
    } else {
        // If sidebar item has no query (e.g. "All"), it matches if current search is empty 
        // OR if we want "All" to be active only when no filters?
        // Usually "All" means no query params.
        return currentSearch === '';
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-16 left-0 bottom-0 z-40 w-64 bg-[#0b0b0f] lg:bg-transparent transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${className}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto py-8 px-4 scrollbar-hide">
            {sections.map((section, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                {section.title && (
                  <h2 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    {section.title}
                  </h2>
                )}
                
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = checkActive(item.href);
                    return (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        className={`
                          flex items-center px-4 py-3 text-sm font-medium rounded-full transition-all duration-200 group
                          ${isActive 
                            ? 'bg-blue-500/10 text-blue-400' 
                            : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}
                        `}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && (
                          <span className={`mr-3 transition-colors ${item.icon ? '' : 'hidden'}`}>
                            {item.icon}
                          </span>
                        )}
                        {item.label}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
          
          {/* Optional Footer/Extra info in Sidebar */}
          <div className="px-4 pb-8">
            <div className="p-4 rounded-2xl bg-[#1e1e21] border border-white/5 flex items-center justify-center">
              <p className="text-xs text-gray-400 leading-relaxed text-center">
                Lify — 让知识与工具触手可及
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default PageSidebar;
