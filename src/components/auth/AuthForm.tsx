import React, { useState } from 'react';
import { Mail, Lock, Github } from 'lucide-react';
import { DemoButton } from './DemoButton';
import { SocialButton } from './SocialButton';
import { EmailForm } from './EmailForm';
import { Divider } from '../ui/Divider';

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      
      <SocialButton
        icon={<Github className="w-5 h-5" />}
        text="Continue with Google"
      />

      <Divider text="Or continue with" />

      <EmailForm isSignUp={isSignUp} />

      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

      <DemoButton />
    </div>
  );
};