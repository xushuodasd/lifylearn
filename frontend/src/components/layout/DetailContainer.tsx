import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface DetailContainerProps {
  children: ReactNode;
  maxWidth?: '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  className?: string;
}

/**
 * 详情页统一布局容器
 * 
 * 符合模块化原则：
 * 1. 封装了详情页通用的容器样式（container, padding, relative positioning）
 * 2. 提供接口（Props）灵活配置最大宽度和额外样式
 * 3. 实现了最小化完成模块（仅关注布局容器职责）
 */
export const DetailContainer: React.FC<DetailContainerProps> = ({ 
  children, 
  maxWidth = '4xl',
  className 
}) => {
  const maxWidthClass = {
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
  }[maxWidth];

  return (
    <div className={classNames(
      "container mx-auto px-4 py-12 relative",
      maxWidthClass,
      className
    )}>
      {children}
    </div>
  );
};
