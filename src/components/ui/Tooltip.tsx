import React, { ReactNode, useState, useEffect } from 'react';

let activeTooltipId: string | null = null;
const tooltipSubscribers = new Set<() => void>();

const notifySubscribers = () => {
  tooltipSubscribers.forEach(callback => callback());
};

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip = ({ content, children, position = 'top', className = '' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipId] = useState(() => Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    const handleUpdate = () => {
      if (activeTooltipId !== tooltipId) {
        setIsVisible(false);
      }
    };

    tooltipSubscribers.add(handleUpdate);
    return () => {
      tooltipSubscribers.delete(handleUpdate);
    };
  }, [tooltipId]);

  const showTooltip = () => {
    if (activeTooltipId !== tooltipId) {
      activeTooltipId = tooltipId;
      setIsVisible(true);
      notifySubscribers();
    }
  };

  const hideTooltip = () => {
    if (activeTooltipId === tooltipId) {
      activeTooltipId = null;
      setIsVisible(false);
      notifySubscribers();
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'bottom-full mb-2';
    }
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div 
          className={`absolute left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg z-50 pointer-events-none ${getPositionClasses()}`}
          style={{ minWidth: '200px', maxWidth: '300px' }}
        >
          <div className="whitespace-pre-wrap">
            {typeof content === 'string' 
              ? content.split('\n').map((line, i) => (
                  <div key={i} className="mb-1 last:mb-0">{line}</div>
                ))
              : content
            }
          </div>
          <div className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
            position === 'bottom' ? '-top-2 border-b-gray-900' : '-bottom-2 border-t-gray-900'
          }`} />
        </div>
      )}
    </div>
  );
};