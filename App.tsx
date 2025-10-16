import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar } from './components/Sidebar';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { Reels } from './components/Reels';
import type { User } from './types';
import { useMockData } from './hooks/useMockData';
import { ProfileIcon, BellIcon, ReelsIcon } from './components/icons';

type View = 'profile' | 'notifications' | 'reels';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('profile');
  const { mockUser, notifications, posts } = useMockData();

  const handleLogin = (username: string) => {
    // In a real app, you'd authenticate here.
    // For this lite version, we'll just use the mock user.
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const reels = posts.filter(p => p.type === 'reel');

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar currentView={view} setView={setView} onLogout={handleLogout} user={user}/>
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto h-full">
           {/* Mobile bottom nav */}
           <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-ig-dark-secondary-bg border-t border-ig-dark-border flex justify-around p-2 z-10">
                <button onClick={() => setView('profile')} className={`p-2 rounded-lg ${view === 'profile' ? 'bg-ig-dark-tertiary-bg' : ''}`} aria-label="Profile">
                    <ProfileIcon className="w-6 h-6" />
                </button>
                <button onClick={() => setView('reels')} className={`p-2 rounded-lg ${view === 'reels' ? 'bg-ig-dark-tertiary-bg' : ''}`} aria-label="Reels">
                    <ReelsIcon className="w-6 h-6" />
                </button>
                <button onClick={() => setView('notifications')} className={`p-2 rounded-lg ${view === 'notifications' ? 'bg-ig-dark-tertiary-bg' : ''}`} aria-label="Notifications">
                    <BellIcon className="w-6 h-6" />
                </button>
           </div>
          {view === 'profile' && <Profile user={user} posts={posts} />}
          {view === 'notifications' && <Notifications notifications={notifications} />}
          {view === 'reels' && <Reels reels={reels} user={user} />}
        </div>
      </main>
    </div>
  );
};

export default App;