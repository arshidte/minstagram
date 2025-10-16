import React from 'react';
import type { Post, User } from '../types';
import { HeartIcon, CommentIcon } from './icons';

interface ReelsProps {
  reels: Post[];
  user: User;
}

const ReelItem: React.FC<{ reel: Post; user: User }> = ({ reel, user }) => {
  return (
    <div className="relative h-full w-full snap-start flex-shrink-0" role="group" aria-roledescription="slide">
      <img src={reel.imageUrl} alt={reel.caption} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white w-full">
        <div className="flex items-center space-x-2 mb-2">
          <img src={user.avatarUrl} alt={user.username} className="w-8 h-8 rounded-full border-2 border-white" />
          <p className="font-semibold">{user.username}</p>
        </div>
        <p className="text-sm mb-4">{reel.caption}</p>
        <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center">
                <HeartIcon className="w-5 h-5 mr-1" />
                <span>{reel.likesCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
                <CommentIcon className="w-5 h-5 mr-1" />
                <span>{reel.commentsCount.toLocaleString()}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export const Reels: React.FC<ReelsProps> = ({ reels, user }) => {
  if (!reels || reels.length === 0) {
    return <div className="text-center p-8 text-ig-secondary-text">You have no reels to display.</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-sm bg-black rounded-lg h-full overflow-y-auto snap-y snap-mandatory">
        {reels.map((reel) => (
          <ReelItem key={reel.id} reel={reel} user={user} />
        ))}
      </div>
    </div>
  );
};