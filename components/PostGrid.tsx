import React from 'react';
import type { Post } from '../types';
import { HeartIcon, CommentIcon, ReelsIcon } from './icons';

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const PostThumbnail: React.FC<{ post: Post; onClick: () => void }> = ({ post, onClick }) => (
  <div
    className="relative group aspect-square cursor-pointer overflow-hidden"
    onClick={onClick}
  >
    <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    {post.type === 'reel' && (
        <ReelsIcon className="absolute top-2 right-2 text-white drop-shadow-lg w-5 h-5" />
    )}
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-4 text-white font-bold">
        <div className="flex items-center">
          <HeartIcon className="w-5 h-5 mr-1" />
          <span>{post.likesCount}</span>
        </div>
        <div className="flex items-center">
          <CommentIcon className="w-5 h-5 mr-1" />
          <span>{post.commentsCount}</span>
        </div>
      </div>
    </div>
  </div>
);

export const PostGrid: React.FC<PostGridProps> = ({ posts, onPostClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-4">
      {posts.map(post => (
        <PostThumbnail key={post.id} post={post} onClick={() => onPostClick(post)} />
      ))}
    </div>
  );
};