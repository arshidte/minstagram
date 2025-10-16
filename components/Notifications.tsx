
import React from 'react';
import type { Notification } from '../types';
import { HeartIcon, CommentIcon, ProfileIcon } from './icons';

interface NotificationsProps {
    notifications: Notification[];
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { user, type, timestamp, postImageUrl, commentText } = notification;

    const renderText = () => {
        switch(type) {
            case 'like':
                return <p><span className="font-semibold">{user.username}</span> liked your post.</p>;
            case 'comment':
                return <p><span className="font-semibold">{user.username}</span> commented: "{commentText}"</p>;
            case 'follow':
                return <p><span className="font-semibold">{user.username}</span> started following you.</p>;
        }
    };
    
    const renderIcon = () => {
        const baseClass = "w-6 h-6 absolute -bottom-1 -right-1 rounded-full p-1";
        switch(type) {
            case 'like': return <HeartIcon className={`${baseClass} bg-red-500 text-white`} />;
            case 'comment': return <CommentIcon className={`${baseClass} bg-blue-500 text-white`} />;
            case 'follow': return <ProfileIcon className={`${baseClass} bg-green-500 text-white`} />;
        }
    }

    return (
        <li className="flex items-center p-4 space-x-4 hover:bg-ig-dark-secondary-bg rounded-lg transition-colors duration-200">
            <div className="relative">
                <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 rounded-full" />
                {renderIcon()}
            </div>
            <div className="flex-1">
                {renderText()}
                <p className="text-xs text-ig-secondary-text">{timestamp}</p>
            </div>
            {postImageUrl && (
                <img src={postImageUrl} alt="Post thumbnail" className="w-12 h-12 object-cover rounded-md" />
            )}
            {type === 'follow' && (
                 <button className="bg-ig-accent text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-ig-accent-hover transition-colors">Follow</button>
            )}
        </li>
    );
};

export const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            <ul className="space-y-2">
                {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
            </ul>
        </div>
    );
};
