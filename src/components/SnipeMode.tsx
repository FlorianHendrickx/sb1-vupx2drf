import React from 'react';
import { useStore } from '../store/useStore';
import { ThumbsUp, ThumbsDown, SkipForward, Send } from 'lucide-react';

export const SnipeMode = () => {
  const { currentProspect } = useStore();

  if (!currentProspect) return null;

  return (
    <div className="flex h-full gap-6">
      {/* Prospect Briefing */}
      <div className="w-1/3 bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={currentProspect.profilePicture}
            alt={`${currentProspect.firstName} ${currentProspect.lastName}`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {currentProspect.firstName} {currentProspect.lastName}
            </h2>
            <p className="text-gray-600">
              {currentProspect.position} at {currentProspect.company}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Engagement Signals</h3>
            <ul className="space-y-2 text-sm">
              <li>✨ Visited pricing page 2 days ago</li>
              <li>📈 Company growing rapidly</li>
              <li>🎯 Perfect ICP match</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Company Info</h3>
            <p className="text-sm text-gray-600">
              A fast-growing technology company specializing in AI-powered
              solutions...
            </p>
          </div>
        </div>
      </div>

      {/* Email Sequence */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Email Sequence</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-64"
                placeholder="Enter your message"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ThumbsDown className="w-5 h-5" />
              Reject
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <SkipForward className="w-5 h-5" />
              Skip
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send className="w-5 h-5" />
            Send & Next
          </button>
        </div>
      </div>
    </div>
  );
};