import React from 'react';
import { Tooltip } from './Tooltip';

interface ScoreDisplayProps {
  score: number;
  label: string;
  showFire?: boolean;
}

export const ScoreDisplay = ({ score, label, showFire }: ScoreDisplayProps) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getFireEmoji = (score: number) => {
    if (!showFire) return null;
    if (score >= 80) return '🔥🔥';
    if (score >= 60) return '🔥';
    return null;
  };

  const getScoreTooltip = (score: number) => {
    if (score >= 80) return 'Excellent match with high potential';
    if (score >= 60) return 'Good match with moderate potential';
    return 'Low match, consider reviewing criteria';
  };

  return (
    <Tooltip content={getScoreTooltip(score)}>
      <div className="flex flex-col items-center gap-1">
        <div
          className={`w-12 h-12 ${getColor(
            score
          )} rounded-full flex items-center justify-center font-semibold`}
        >
          {score}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">{label}</span>
          {getFireEmoji(score)}
        </div>
      </div>
    </Tooltip>
  );
};