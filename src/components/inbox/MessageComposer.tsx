import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { ScoreDisplay } from '../snipe/ScoreDisplay';

interface MessageComposerProps {
  onToggleRegenerate: () => void;
}

export const MessageComposer = ({ onToggleRegenerate }: MessageComposerProps) => {
  const [message, setMessage] = useState(
    "Thanks for your interest! I'd be happy to schedule a quick call to discuss how we can help. Would you have 30 minutes this week?"
  );

  return (
    <div className="p-6 border-b">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Reply Message</h3>
        <ScoreDisplay score={85} label="Message Score" />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply..."
        className="w-full h-32 px-4 py-2 border rounded-lg mb-4 resize-none"
      />
      <div className="flex justify-between">
        <button
          onClick={onToggleRegenerate}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <RefreshCw className="w-5 h-5" />
          Regenerate Message
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Send Reply
        </button>
      </div>
    </div>
  );
};