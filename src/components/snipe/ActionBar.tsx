import React from 'react';
import { ThumbsDown, SkipForward, Send, Plus, RefreshCw, ArrowLeft } from 'lucide-react';

interface ActionBarProps {
  onBack: () => void;
  onReject: () => void;
  onSkip: () => void;
  onAddStep: () => void;
  onToggleRegenerate: () => void;
  isSending: boolean;
  onSendAndNext: () => void;
}

export const ActionBar = ({
  onBack,
  onReject,
  onSkip,
  onAddStep,
  onToggleRegenerate,
  isSending,
  onSendAndNext
}: ActionBarProps) => {
  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Sniper List
        </button>
        <div className="flex gap-2">
          <button
            onClick={onReject}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ThumbsDown className="w-5 h-5" />
            Reject
          </button>
          <button
            onClick={onSkip}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SkipForward className="w-5 h-5" />
            Skip
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAddStep}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Plus className="w-5 h-5" />
          Add Step
        </button>
        <button
          onClick={onToggleRegenerate}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw className="w-5 h-5" />
          Regenerate
        </button>
        <button
          onClick={onSendAndNext}
          disabled={isSending}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className={`w-5 h-5 ${isSending ? 'animate-spin' : ''}`} />
          Send & Next
        </button>
      </div>
    </div>
  );
};