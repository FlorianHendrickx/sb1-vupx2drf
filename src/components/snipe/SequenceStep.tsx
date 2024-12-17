import React from 'react';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import type { SequenceStep as SequenceStepType } from '../../types';
import { ScoreCircle } from './ScoreCircle';

interface SequenceStepProps {
  step: SequenceStepType;
  index: number;
  onToggle: () => void;
  onRegenerate: () => void;
}

export const SequenceStep = ({
  step,
  index,
  onToggle,
  onRegenerate,
}: SequenceStepProps) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'linkedin':
        return '💼';
      case 'call':
        return '📞';
      default:
        return '📝';
    }
  };

  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-t-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{getStepIcon(step.type)}</span>
          <span className="font-medium">
            Step {index + 1} - {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ScoreCircle score={85} size="sm" />
          {step.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {step.isOpen && (
        <div className="p-4">
          {step.type === 'email' && (
            <input
              type="text"
              value={step.subject}
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
          )}
          <textarea
            value={step.message}
            className="w-full h-32 px-4 py-2 border rounded-lg mb-4 resize-none"
          />
          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <RefreshCw size={16} />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
};