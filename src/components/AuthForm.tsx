import React, { useState } from 'react';
import { Mail, Lock, Github, PlayCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      
      <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg mb-4 hover:bg-gray-50 transition-colors">
        <Github className="w-5 h-5" />
        Continue with Google
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

      <button
        onClick={startDemo}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors mt-4"
      >
        <PlayCircle className="w-5 h-5" />
        Try Demo Mode
      </button>
    </div>
  );
};