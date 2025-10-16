
import React, { useState, useEffect } from 'react';
import type { Post } from '../types';
import { CloseIcon, HeartIcon, CommentIcon, SparklesIcon } from './icons';
import { generateCaptionIdeas } from '../services/geminiService';


interface PostModalProps {
  post: Post;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
    const [captionIdeas, setCaptionIdeas] = useState<string[]>([]);
    const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateCaptions = async () => {
        setIsLoadingIdeas(true);
        setError(null);
        setCaptionIdeas([]);
        
        const ideas = await generateCaptionIdeas(post.caption);
        if (ideas) {
            setCaptionIdeas(ideas);
        } else {
             if (!process.env.API_KEY) {
                setError("Gemini API key is not configured. This feature is disabled.");
            } else {
                setError("Failed to generate caption ideas. Please try again.");
            }
        }
        setIsLoadingIdeas(false);
    };
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-ig-dark-secondary-bg rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="w-full md:w-1/2 lg:w-3/5 bg-black flex items-center justify-center">
                 <img src={post.imageUrl} alt="Post" className="object-contain w-full h-full" />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col p-6">
                <div className="flex-shrink-0 pb-4 border-b border-ig-dark-border">
                    <p className="text-ig-primary-text">{post.caption}</p>
                    <div className="flex items-center space-x-4 text-ig-secondary-text mt-4">
                        <div className="flex items-center"><HeartIcon className="w-5 h-5 mr-1.5"/> {post.likesCount.toLocaleString()} likes</div>
                        <div className="flex items-center"><CommentIcon className="w-5 h-5 mr-1.5"/> {post.commentsCount.toLocaleString()} comments</div>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto my-4 space-y-4">
                    {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start space-x-3">
                            <img src={comment.user.avatarUrl} alt={comment.user.username} className="w-8 h-8 rounded-full" />
                            <div>
                                <p><span className="font-semibold">{comment.user.username}</span> {comment.text}</p>
                                <p className="text-xs text-ig-secondary-text">{comment.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex-shrink-0 pt-4 border-t border-ig-dark-border">
                    <h3 className="font-semibold text-lg mb-2">Caption Analysis</h3>
                    <button onClick={handleGenerateCaptions} disabled={isLoadingIdeas || !process.env.API_KEY} className="w-full flex items-center justify-center space-x-2 bg-ig-accent text-white font-semibold px-4 py-2 rounded-md hover:bg-ig-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <SparklesIcon className="w-5 h-5"/>
                        <span>{isLoadingIdeas ? 'Generating...' : 'Generate Caption Ideas'}</span>
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {captionIdeas.length > 0 && (
                        <div className="mt-4 space-y-2 text-sm bg-ig-dark-tertiary-bg p-3 rounded-md">
                            {captionIdeas.map((idea, index) => (
                                <p key={index} className="border-b border-ig-dark-border last:border-b-0 pb-2 last:pb-0">{idea}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
             <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors">
                <CloseIcon className="w-6 h-6"/>
            </button>
        </div>
    </div>
  );
};
