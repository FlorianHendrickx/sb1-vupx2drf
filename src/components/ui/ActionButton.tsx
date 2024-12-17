import React, { ReactNode } from 'react';

interface ActionButtonProps {
  icon: ReactNode;
  onClick?: () => void;
}

export const ActionButton = ({ icon, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
    >
      {icon}
    </button>
  );
};