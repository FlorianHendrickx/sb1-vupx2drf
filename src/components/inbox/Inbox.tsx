import React, { useState, useEffect } from 'react';
import { MessageThread } from './MessageThread';
import { MessageComposer } from './MessageComposer';
import { ThreadList } from './ThreadList';
import { RegenerationPanel } from '../snipe/RegenerationPanel';
import type { Thread } from '../../types';

const mockThread: Thread = {
  id: '1',
  subject: 'Re: Our AI Solution Demo',
  contact: 'Sarah Johnson',
  preview: "Thanks for reaching out! I'd love to learn more about your solution.",
  timestamp: '2 days ago',
  unread: true,
  tag: 'positive-reply',
  messages: [
    {
      id: '1',
      from: 'Sarah Johnson',
      content: "Thanks for reaching out! I'd love to learn more about your solution.",
      timestamp: '2 days ago',
      type: 'received',
      channel: 'email'
    },
    {
      id: '2',
      from: 'You',
      content: "Hi Sarah, great to hear from you! Let me know what time works best for a quick call.",
      timestamp: '1 day ago',
      type: 'sent',
      channel: 'linkedin'
    }
  ]
};

export const Inbox = () => {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [showRegeneration, setShowRegeneration] = useState(false);

  useEffect(() => {
    // Auto-select first thread
    setSelectedThread(mockThread);
  }, []);

  const handleChangeTag = (newTag: Thread['tag']) => {
    if (selectedThread) {
      setSelectedThread({ ...selectedThread, tag: newTag });
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <ThreadList 
          onSelectThread={setSelectedThread} 
          selectedThreadId={selectedThread?.id || null} 
        />
      </div>
      
      <div className="flex-1">
        {selectedThread && (
          <div className="bg-white rounded-lg shadow">
            <MessageComposer onToggleRegenerate={() => setShowRegeneration(!showRegeneration)} />
            <MessageThread 
              thread={selectedThread}
              onChangeTag={handleChangeTag}
            />
          </div>
        )}
      </div>

      {showRegeneration && (
        <div className="w-1/4">
          <RegenerationPanel
            selectedSteps={[]}
            onClose={() => setShowRegeneration(false)}
          />
        </div>
      )}
    </div>
  );
};