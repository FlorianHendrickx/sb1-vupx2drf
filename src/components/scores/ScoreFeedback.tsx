import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface ScoreFeedbackProps {
  scoreType: string;
  onFeedback: (type: string, isPositive: boolean, reason?: string) => void;
}

export const ScoreFeedback = ({ scoreType, onFeedback }: ScoreFeedbackProps) => {
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState('');

  const handleNegativeFeedback = () => {
    setShowFeedbackInput(true);
  };

  const handleSubmitFeedback = () => {
    onFeedback(scoreType, false, feedbackReason);
    setShowFeedbackInput(false);
    setFeedbackReason('');
  };

  if (showFeedbackInput) {
    return (
      <div className="mt-2">
        <textarea
          value={feedbackReason}
          onChange={(e) => setFeedbackReason(e.target.value)}
          placeholder="Why do you think this score needs adjustment?"
          className="w-full px-3 py-2 text-sm border rounded-lg mb-2"
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowFeedbackInput(false)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitFeedback}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!feedbackReason.trim()}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      <Tooltip content="Score is accurate">
        <button
          onClick={() => onFeedback(scoreType, true)}
          className="p-1 hover:bg-green-50 rounded-full"
        >
          <ThumbsUp className="w-4 h-4 text-gray-400 hover:text-green-600" />
        </button>
      </Tooltip>
      <Tooltip content="Score needs adjustment">
        <button
          onClick={handleNegativeFeedback}
          className="p-1 hover:bg-red-50 rounded-full"
        >
          <ThumbsDown className="w-4 h-4 text-gray-400 hover:text-red-600" />
        </button>
      </Tooltip>
    </div>
  );
};