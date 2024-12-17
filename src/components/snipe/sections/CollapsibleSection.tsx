import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  count?: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const CollapsibleSection = ({
  title,
  count,
  isOpen,
  onToggle,
  children
}: CollapsibleSectionProps) => {
  return (
    <div className="border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
      >
        <span className="font-medium flex items-center gap-2">
          {title}
          {count !== undefined && (
            <span className="text-sm text-gray-500">({count})</span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isOpen && <div className="p-3 border-t">{children}</div>}
    </div>
  );
};