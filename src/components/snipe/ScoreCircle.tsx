import React from 'react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const ScoreCircle = ({ score, size = 'md', label }: ScoreCircleProps) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-12 h-12 text-lg';
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${getSizeClasses(
          size
        )} ${getColor(score)} rounded-full flex items-center justify-center font-semibold`}
      >
        {score}
      </div>
      {label && <span className="text-xs text-gray-600">{label}</span>}
    </div>
  );
};