
import React, { useState } from 'react';
import type { User, Post } from '../types';
import { PostGrid } from './PostGrid';
import { PostModal } from './PostModal';

interface ProfileProps {
  user: User;
  posts: Post[];
}

const ProfileHeader: React.FC<{ user: User }> = ({ user }) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left p-4 mb-8">
    <img src={user.avatarUrl} alt={user.username} className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 border-ig-dark-border" />
    <div className="sm:ml-10 mt-4 sm:mt-0">
      <h2 className="text-2xl font-light">{user.username}</h2>
      <div className="flex justify-center sm:justify-start space-x-6 my-4">
        <div><span className="font-semibold">{user.postsCount}</span> posts</div>
        <div><span className="font-semibold">{user.followersCount.toLocaleString()}</span> followers</div>
        <div><span className="font-semibold">{user.followingCount}</span> following</div>
      </div>
      <p className="font-semibold">{user.fullName}</p>
      <p className="text-ig-secondary-text mt-1">{user.bio}</p>
    </div>
  </div>
);


export const Profile: React.FC<ProfileProps> = ({ user, posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      <ProfileHeader user={user} />
      <hr className="border-ig-dark-border my-4"/>
      <PostGrid posts={posts} onPostClick={setSelectedPost} />
      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </>
  );
};
