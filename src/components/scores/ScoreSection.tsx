import React from 'react';
import { ScoreDisplay } from './ScoreDisplay';
import { ScoreFeedback } from './ScoreFeedback';

interface ScoreSectionProps {
  type: 'icp' | 'timing';
  score: number;
  onFeedback: (type: string, isPositive: boolean, reason?: string) => void;
  onScoreClick?: () => void;
}

export const ScoreSection = ({ type, score, onFeedback, onScoreClick }: ScoreSectionProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        {type === 'timing' && score >= 60 && (
          <span className="text-xl">
            {score >= 80 ? '🔥🔥' : '🔥'}
          </span>
        )}
        <ScoreDisplay 
          score={score} 
          label={type.toUpperCase()} 
          onClick={onScoreClick}
        />
      </div>
      <ScoreFeedback 
        scoreType={type} 
        onFeedback={onFeedback}
      />
    </div>
  );
};