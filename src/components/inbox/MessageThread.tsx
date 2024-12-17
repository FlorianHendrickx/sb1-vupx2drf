import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
import type { Thread } from '../../types';

interface MessageThreadProps {
  thread: Thread;
  onChangeTag: (newTag: Thread['tag']) => void;
}

const TAGS = [
  { value: 'meeting-request', label: 'Meeting Request' },
  { value: 'positive-reply', label: 'Positive Reply' },
  { value: 'negative-reply', label: 'Negative Reply' },
  { value: 'wrong-person', label: 'Wrong Person' },
  { value: 'out-of-office', label: 'Out of Office' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'other', label: 'Other' }
] as const;

export const MessageThread = ({ thread, onChangeTag }: MessageThreadProps) => {
  const getChannelIcon = (channel: 'email' | 'linkedin') => {
    return channel === 'email' ? (
      <Mail className="w-4 h-4 text-gray-500" />
    ) : (
      <Linkedin className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{thread.subject}</h2>
        <select
          value={thread.tag}
          onChange={(e) => onChangeTag(e.target.value as Thread['tag'])}
          className="px-3 py-1 border rounded-lg text-sm"
        >
          {TAGS.map((tag) => (
            <option key={tag.value} value={tag.value}>
              {tag.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-6">
        {thread.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === 'sent' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-lg rounded-lg p-4 ${
                message.type === 'sent'
                  ? 'bg-blue-50 text-blue-900'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.from}</span>
                  {getChannelIcon(message.channel)}
                </div>
                <span className="text-sm text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};