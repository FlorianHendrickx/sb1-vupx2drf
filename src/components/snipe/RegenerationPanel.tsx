import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { SequenceStep } from '../../types';

const COMMON_INSTRUCTIONS = [
  'Make it more informal',
  'Make it shorter',
  'Make it longer',
  'Add more social proof',
  'Focus on pain points',
  'Add more personalization',
  'Make it more direct',
  'Add a clear call to action',
];

interface RegenerationPanelProps {
  onClose: () => void;
  selectedSteps: SequenceStep[];
}

export const RegenerationPanel = ({ onClose, selectedSteps }: RegenerationPanelProps) => {
  const [prompt, setPrompt] = useState('');

  const addInstruction = (instruction: string) => {
    setPrompt((prev) => (prev ? `${prev}, ${instruction.toLowerCase()}` : instruction));
  };

  const handleRegenerate = () => {
    // TODO: Implement regeneration logic
    console.log('Regenerating with prompt:', prompt);
    console.log('Selected steps:', selectedSteps);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <h3 className="font-medium mb-2">Message Regeneration</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Instructions for message regeneration"
          className="w-full h-32 px-4 py-2 border rounded-lg resize-none"
        />
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Common Instructions</h4>
        <div className="flex flex-wrap gap-2">
          {COMMON_INSTRUCTIONS.map((instruction) => (
            <button
              key={instruction}
              onClick={() => addInstruction(instruction)}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
            >
              {instruction}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleRegenerate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate Messages
        </button>
      </div>
    </div>
  );
};