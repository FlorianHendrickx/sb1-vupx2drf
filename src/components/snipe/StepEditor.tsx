import React from 'react';
import { ChevronDown, ChevronUp, Mail, Linkedin, Phone, MessageSquare } from 'lucide-react';
import type { SequenceStep, StepType } from '../../types';
import { ScoreDisplay } from '../scores/ScoreDisplay';
import { Tooltip } from '../ui/Tooltip';

interface StepEditorProps {
  step: SequenceStep;
  index: number;
  showSelection?: boolean;
  onToggle: () => void;
  onSelect?: () => void;
  onUpdateStep: (id: string, updates: Partial<SequenceStep>) => void;
  onScoreClick?: () => void;
}

export const StepEditor = ({
  step,
  index,
  showSelection,
  onToggle,
  onSelect,
  onUpdateStep,
  onScoreClick,
}: StepEditorProps) => {
  const getStepIcon = (type: StepType) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'call':
        return <Phone className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getScoreTooltip = (score: number) => {
    if (score >= 80) return 'Great message! Strong personalization and clear value proposition';
    if (score >= 60) return 'Good message, but could be improved with more personalization';
    return 'Message needs improvement. Consider adding more context and value';
  };

  return (
    <div className="border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-t-lg"
      >
        <div className="flex items-center gap-3">
          {showSelection && (
            <input
              type="checkbox"
              checked={step.isSelected}
              onChange={onSelect}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 rounded border-gray-300"
            />
          )}
          <div className="flex items-center gap-2">
            {getStepIcon(step.type)}
            <select
              value={step.type}
              onChange={(e) => onUpdateStep(step.id, { type: e.target.value as StepType })}
              onClick={(e) => e.stopPropagation()}
              className="bg-transparent border-none focus:ring-0 cursor-pointer"
            >
              <option value="email">Email</option>
              <option value="linkedin">LinkedIn</option>
              <option value="call">Call</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <span className="font-medium">Step {index + 1}</span>
        </div>
        <div className="flex items-center gap-4">
          <Tooltip content={getScoreTooltip(step.score || 85)}>
            <div onClick={(e) => {
              e.stopPropagation();
              onScoreClick?.();
            }}>
              <ScoreDisplay score={step.score || 85} label="" />
            </div>
          </Tooltip>
          {step.isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {step.isOpen && (
        <div className="p-4">
          {step.type === 'email' && (
            <input
              type="text"
              value={step.subject || ''}
              onChange={(e) => onUpdateStep(step.id, { subject: e.target.value })}
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
          )}
          <textarea
            value={step.message || ''}
            onChange={(e) => onUpdateStep(step.id, { message: e.target.value })}
            placeholder={`Enter your ${step.type} message...`}
            className="w-full h-32 px-4 py-2 border rounded-lg resize-none"
          />
        </div>
      )}
    </div>
  );
};