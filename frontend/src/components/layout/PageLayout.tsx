import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen bg-background text-white pt-16 flex flex-col lg:flex-row relative">
      {/* Background Ambient Effects - Removed per user request for a cleaner look */}
      
      {/* Sidebar Area */}
      <div className="lg:w-64 lg:shrink-0 lg:border-r lg:border-white/5 relative z-10">
        <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          {sidebar}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 relative z-10">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
