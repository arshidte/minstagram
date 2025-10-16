import React from 'react';
import type { User } from '../types';
import { ProfileIcon, BellIcon, LogoutIcon, ReelsIcon } from './icons';

type View = 'profile' | 'notifications' | 'reels';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  onLogout: () => void;
  user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout, user }) => {
    const navItems = [
        { id: 'profile', label: 'Profile', icon: ProfileIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
        { id: 'reels', label: 'Reels', icon: ReelsIcon },
    ];

    return (
        <aside className="fixed top-0 left-0 h-full w-64 bg-ig-dark-secondary-bg border-r border-ig-dark-border p-6 flex-col justify-between hidden lg:flex">
            <div>
                <h1 className="text-2xl font-bold mb-10 text-ig-primary-text">Insta-Lite</h1>
                <nav>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setView(item.id as View)}
                                    className={`w-full flex items-center space-x-3 p-3 my-2 rounded-lg transition-colors duration-200 ${
                                        currentView === item.id ? 'bg-ig-accent text-white' : 'hover:bg-ig-dark-tertiary-bg'
                                    }`}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span className="font-semibold">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            
            <div className="mt-auto">
                 <div className="flex items-center space-x-3 p-3 mb-4">
                    <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-ig-primary-text">{user.fullName}</p>
                        <p className="text-sm text-ig-secondary-text">@{user.username}</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-ig-dark-tertiary-bg text-ig-secondary-text hover:text-ig-primary-text transition-colors duration-200"
                >
                    <LogoutIcon className="w-6 h-6" />
                    <span className="font-semibold">Logout</span>
                </button>
            </div>
        </aside>
    );
};