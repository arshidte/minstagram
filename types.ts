export interface User {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface Comment {
  id: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  imageUrl: string;
  type: 'post' | 'reel';
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  caption: string;
}

export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow';
    user: {
        username: string;
        avatarUrl: string;
    };
    postImageUrl?: string;
    commentText?: string;
    timestamp: string;
}