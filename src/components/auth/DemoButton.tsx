import React from 'react';
import { PlayCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const DemoButton = () => {
  const { setUser } = useStore();

  const startDemo = () => {
    setUser({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      company: 'Demo Company',
      workEmail: 'demo@democompany.com'
    });
  };

  return (
    <button
      onClick={startDemo}
      className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors mt-4"
    >
      <PlayCircle className="w-5 h-5" />
      Try Demo Mode
    </button>
  );
};