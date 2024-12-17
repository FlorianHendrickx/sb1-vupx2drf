import React from 'react';
import type { Thread } from '../../types';

interface ThreadListProps {
  onSelectThread: (thread: Thread) => void;
  selectedThreadId: string | null;
}

const mockThreads: Thread[] = [
  {
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
      }
    ]
  },
  {
    id: '2',
    subject: 'Out of Office: Meeting Request',
    contact: 'Michael Chen',
    preview: 'I will be out of the office until March 15th...',
    timestamp: '1 day ago',
    unread: false,
    tag: 'out-of-office',
    messages: [
      {
        id: '1',
        from: 'Michael Chen',
        content: 'I will be out of the office until March 15th...',
        timestamp: '1 day ago',
        type: 'received',
        channel: 'email'
      }
    ]
  },
  {
    id: '3',
    subject: 'Not Interested',
    contact: 'David Brown',
    preview: "Thanks, but we're not looking for this solution at the moment.",
    timestamp: '1 day ago',
    unread: false,
    tag: 'negative-reply',
    messages: [
      {
        id: '1',
        from: 'David Brown',
        content: "Thanks, but we're not looking for this solution at the moment.",
        timestamp: '1 day ago',
        type: 'received',
        channel: 'email'
      }
    ]
  }
];

export const ThreadList: React.FC<ThreadListProps> = ({ onSelectThread, selectedThreadId }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Messages</h2>
      </div>
      <div className="divide-y">
        {mockThreads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread)}
            className={`w-full p-4 text-left hover:bg-gray-50 ${
              thread.id === selectedThreadId ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium flex items-center gap-2">
                {thread.contact}
                {thread.unread && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </span>
              <span className="text-sm text-gray-500">{thread.timestamp}</span>
            </div>
            <div className="text-sm font-medium text-gray-900 mb-1">
              {thread.subject}
            </div>
            <div className="text-sm text-gray-600 truncate">{thread.preview}</div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                thread.tag === 'positive-reply'
                  ? 'bg-green-100 text-green-800'
                  : thread.tag === 'negative-reply'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {thread.tag.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};