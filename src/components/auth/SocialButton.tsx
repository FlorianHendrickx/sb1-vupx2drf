import React, { ReactNode } from 'react';

interface SocialButtonProps {
  icon: ReactNode;
  text: string;
}

export const SocialButton = ({ icon, text }: SocialButtonProps) => {
  return (
    <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg mb-4 hover:bg-gray-50 transition-colors">
      {icon}
      {text}
    </button>
  );
};