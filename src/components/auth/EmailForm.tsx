import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../ui/Input';

interface EmailFormProps {
  isSignUp: boolean;
}

export const EmailForm = ({ isSignUp }: EmailFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // To be implemented with backend integration
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        icon={<Mail className="w-5 h-5" />}
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        icon={<Lock className="w-5 h-5" />}
        placeholder="Enter your password"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};