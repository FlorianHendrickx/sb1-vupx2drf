import React from 'react';
import type { SequenceStep } from '../../types';
import { StepEditor } from './StepEditor';

interface SequenceEditorProps {
  steps: SequenceStep[];
  setSteps: React.Dispatch<React.SetStateAction<SequenceStep[]>>;
  showRegeneration: boolean;
  onStepSelect: (steps: SequenceStep[]) => void;
  onToggleRegenerate: () => void;
}

export const SequenceEditor = ({ 
  steps, 
  setSteps, 
  showRegeneration, 
  onStepSelect,
  onToggleRegenerate
}: SequenceEditorProps) => {
  const toggleStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, isOpen: !step.isOpen } : step
    ));
  };

  const toggleStepSelection = (stepId: string) => {
    const newSteps = steps.map(step => 
      step.id === stepId ? { ...step, isSelected: !step.isSelected } : step
    );
    setSteps(newSteps);
    onStepSelect(newSteps.filter(step => step.isSelected));
  };

  const updateStep = (stepId: string, updates: Partial<SequenceStep>) => {
    setSteps(steps.map(step =>
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <StepEditor
            key={step.id}
            step={step}
            index={index}
            showSelection={showRegeneration}
            onToggle={() => toggleStep(step.id)}
            onSelect={() => toggleStepSelection(step.id)}
            onUpdateStep={updateStep}
            onScoreClick={onToggleRegenerate}
          />
        ))}
      </div>
    </div>
  );
};