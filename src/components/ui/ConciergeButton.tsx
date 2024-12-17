import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export const ConciergeButton = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowChat(!showChat)}
        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        <MessageSquare className="w-4 h-4" />
        Need help? Try Sniper.AI concierge
      </button>

      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Sniper.AI Concierge</h3>
            <button onClick={() => setShowChat(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[calc(100%-4rem)] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="bg-blue-50 p-3 rounded-lg mb-2">
                👋 Hi! How can I help you today?
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};