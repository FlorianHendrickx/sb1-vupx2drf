import React from 'react';
import { ScoreDisplay } from '../../scores/ScoreDisplay';
import { ScoreFeedback } from '../../scores/ScoreFeedback';

interface ScoreSectionProps {
  type: 'icp' | 'timing';
  score: number;
  onFeedback: (type: string, isPositive: boolean, reason?: string) => void;
}

export const ScoreSection = ({ type, score, onFeedback }: ScoreSectionProps) => {
  return (
    <div className="flex items-center gap-2">
      {type === 'timing' && score >= 60 && (
        <span className="text-xl">
          {score >= 80 ? '🔥🔥' : '🔥'}
        </span>
      )}
      <ScoreDisplay score={score} label={type.toUpperCase()} />
    </div>
  );
};