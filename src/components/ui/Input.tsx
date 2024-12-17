import React, { ReactNode } from 'react';

interface InputProps {
  label: string;
  type: string;
  icon: ReactNode;
  placeholder: string;
}

export const Input = ({ label, type, icon, placeholder }: InputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};