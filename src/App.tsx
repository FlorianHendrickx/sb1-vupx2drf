import React, { useEffect } from 'react';
import { AuthForm } from './components/auth/AuthForm';
import { ProspectList } from './components/prospects/ProspectList';
import { SnipeMode } from './components/snipe/SnipeMode';
import { Inbox } from './components/inbox/Inbox';
import { NetworkView } from './components/network/NetworkView';
import { useStore } from './store/useStore';
import { Navigation } from './components/layout/Navigation';

function App() {
  const { user, currentProspect, currentView, theme } = useStore();

  // Initialize theme on mount
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Navigation />
      <main className="flex-1 transition-all duration-300 ease-in-out" style={{ 
        marginLeft: 'var(--nav-width, 64px)',
        maxWidth: 'calc(100vw - var(--nav-width, 64px))'
      }}>
        <div className="p-8 max-w-none">
          {currentView === 'network' ? (
            <NetworkView />
          ) : currentView === 'inbox' ? (
            <Inbox />
          ) : currentProspect ? (
            <SnipeMode />
          ) : (
            <ProspectList />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;