import type { User, Post, Notification } from '../types';

export const useMockData = () => {
    const mockUser: User = {
        id: '1',
        username: 'react_dev',
        fullName: 'React Developer',
        avatarUrl: 'https://picsum.photos/seed/reactdev/150/150',
        bio: 'Building beautiful & functional web apps. Just focusing on my content here. 🚀',
        postsCount: 12,
        followersCount: 1258,
        followingCount: 302,
    };

    const posts: Post[] = Array.from({ length: 12 }, (_, i) => ({
        id: `p${i + 1}`,
        imageUrl: `https://picsum.photos/seed/post${i + 1}/500/500`,
        type: i % 3 === 0 ? 'reel' : 'post',
        likesCount: Math.floor(Math.random() * 1000) + 50,
        commentsCount: Math.floor(Math.random() * 50) + 5,
        caption: `Exploring new horizons with this shot. What do you all think? #${i % 2 === 0 ? 'nature' : 'city'} #${'photography'}`,
        comments: [
            { id: `c${i}1`, user: { username: 'jane_doe', avatarUrl: 'https://picsum.photos/seed/jane/50/50' }, text: 'Amazing shot! 😍', timestamp: '2h ago' },
            { id: `c${i}2`, user: { username: 'john_smith', avatarUrl: 'https://picsum.photos/seed/john/50/50' }, text: 'Love the colors here.', timestamp: '1h ago' },
        ],
    }));

    const notifications: Notification[] = [
        { id: 'n1', type: 'follow', user: { username: 'alex_b', avatarUrl: 'https://picsum.photos/seed/alexb/50/50' }, timestamp: '15m ago' },
        { id: 'n2', type: 'like', user: { username: 'sara_c', avatarUrl: 'https://picsum.photos/seed/sarac/50/50' }, postImageUrl: posts[0].imageUrl, timestamp: '30m ago' },
        { id: 'n3', type: 'comment', user: { username: 'mike_p', avatarUrl: 'https://picsum.photos/seed/mikep/50/50' }, postImageUrl: posts[1].imageUrl, commentText: "This is incredible!", timestamp: '1h ago' },
        { id: 'n4', type: 'like', user: { username: 'jane_doe', avatarUrl: 'https://picsum.photos/seed/jane/50/50' }, postImageUrl: posts[2].imageUrl, timestamp: '2h ago' },
        { id: 'n5', type: 'follow', user: { username: 'chris_g', avatarUrl: 'https://picsum.photos/seed/chrisg/50/50' }, timestamp: '3h ago' },
        { id: 'n6', type: 'comment', user: { username: 'john_smith', avatarUrl: 'https://picsum.photos/seed/john/50/50' }, postImageUrl: posts[0].imageUrl, commentText: "Great work!", timestamp: '5h ago' },
    ];

    return { mockUser, posts, notifications };
};