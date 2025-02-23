import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import success1 from '../assets/success_stories1.jpeg';
import success2 from '../assets/success_stories2.jpeg';
import success3 from '../assets/success_stories3.jpeg';
import { likeService, commentService, storyService, subscribeToComments } from '../database/supabaseService';
import { authService } from '../authentication/authService';

function SuccessStories() {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [visibleStories, setVisibleStories] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [storyLikes, setStoryLikes] = useState({});
    const [storyComments, setStoryComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadStories();
    }, []);

    useEffect(() => {
        if (stories.length > 0) {
            loadLikesAndComments();
            
            // Set up real-time subscriptions for each visible story
            const subscriptions = stories.slice(0, visibleStories).map(story => {
                return subscribeToComments(story.id, 'success_story', (newComment) => {
                    setStoryComments(prev => {
                        // Only add the comment if it's not already in the list
                        const existingComments = prev[story.id] || [];
                        const isCommentExists = existingComments.some(c => c.id === newComment.id);
                        
                        if (!isCommentExists) {
                            return {
                                ...prev,
                                [story.id]: [newComment, ...existingComments]
                            };
                        }
                        return prev;
                    });
                });
            });

            // Cleanup subscriptions
            return () => {
                subscriptions.forEach(subscription => {
                    if (subscription?.unsubscribe) {
                        subscription.unsubscribe();
                    }
                });
            };
        }
    }, [stories, visibleStories]);

    const loadStories = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await storyService.getStories();
            if (!error && data) {
                // Assign random images to stories
                const storiesWithImages = data.map(story => ({
                    ...story,
                    image: [success1, success2, success3][Math.floor(Math.random() * 3)]
                }));
                setStories(storiesWithImages);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreStories = () => {
        setVisibleStories(prev => prev + 6);
    };

    const loadLikesAndComments = async () => {
        const visibleStoryIds = stories.slice(0, visibleStories).map(story => story.id);

        for (const storyId of visibleStoryIds) {
            const [likesResponse, commentsResponse] = await Promise.all([
                likeService.getLikes(storyId, 'success_story'),
                commentService.getComments(storyId, 'success_story')
            ]);

            if (!likesResponse.error) {
                setStoryLikes(prev => ({
                    ...prev,
                    [storyId]: likesResponse.data
                }));
            }

            if (!commentsResponse.error) {
                setStoryComments(prev => ({
                    ...prev,
                    [storyId]: commentsResponse.data
                }));
            }
        }
    };

    const handleLike = async (storyId) => {
        const session = await authService.getSession();
        if (!session?.user) {
            // Handle not logged in state
            return;
        }

        const userId = session.user.id;
        const currentLikes = storyLikes[storyId] || [];
        const hasLiked = currentLikes.some(like => like.user_id === userId);

        if (hasLiked) {
            await likeService.removeLike(userId, storyId, 'success_story');
            setStoryLikes(prev => ({
                ...prev,
                [storyId]: prev[storyId].filter(like => like.user_id !== userId)
            }));
        } else {
            const { data } = await likeService.addLike(userId, storyId, 'success_story');
            if (data) {
                setStoryLikes(prev => ({
                    ...prev,
                    [storyId]: [...(prev[storyId] || []), data[0]]
                }));
            }
        }
    };

    const handleComment = async (storyId) => {
        if (!newComment.trim()) return;

        const session = await authService.getSession();
        if (!session?.user) return;

        setIsSubmitting(true);
        try {
            const { data } = await commentService.addComment(
                session.user.id,
                storyId,
                'success_story',
                newComment.trim()
            );

            if (data) {
                setStoryComments(prev => ({
                    ...prev,
                    [storyId]: [...(prev[storyId] || []), data[0]]
                }));
                setNewComment('');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // In your story card JSX, add this before the "Read More" button:
    return (
        <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-pink-50/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                        Real Stories of Healing
                    </h1>
                    <p className="text-lg text-gray-700">
                        Discover how others turned their heartbreak into growth with HeartSplit
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.slice(0, visibleStories).map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                        >
                            <div className="h-48 -mx-6 -mt-6 mb-6 relative bg-gradient-to-r from-pink-100 to-purple-100">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3';
                                        e.target.onerror = null;
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 m-4 text-3xl bg-white/80 rounded-full p-2">
                                    {story.emotion}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">{story.title}</h3>
                            <p className="text-gray-600 mb-4">{story.preview}</p>

                            {/* Social interactions section */}
                            <div className="mt-auto">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleLike(story.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${storyLikes[story.id]?.length > 0
                                                ? 'text-pink-500 bg-pink-50'
                                                : 'text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill={storyLikes[story.id]?.length > 0 ? "currentColor" : "none"}
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <span className="font-medium">{storyLikes[story.id]?.length || 0}</span>
                                        </button>
                                        <button
                                            onClick={() => setSelectedStory(story)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-full transition-all"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                            <span className="font-medium">{storyComments[story.id]?.length || 0}</span>
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-400">{story.timeAgo}</span>
                                </div>
                                {/* Recent comments */}
                                {storyComments[story.id]?.length > 0 && (
                                    <div className="space-y-2 mb-3">
                                        {storyComments[story.id]?.slice(0, 2).map((comment) => (
                                            <div key={comment.id} className="flex items-start gap-2 text-sm">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                                                <div className="flex-1 bg-gray-50 rounded-2xl p-2">
                                                    <p className="font-medium text-gray-900">{comment.profiles?.username || 'User'}</p>
                                                    <p className="text-gray-600">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Comment input */}
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-sm"
                                        />
                                        <button
                                            onClick={() => handleComment(story.id)}
                                            disabled={isSubmitting || !newComment.trim()}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 disabled:text-gray-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedStory(story)}
                                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium mt-4"
                            >
                                Read Full Story →
                            </button>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-500">{story.timeAgo}</span>
                                <button
                                    onClick={() => setSelectedStory(null)}
                                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Load More Button */}
                {visibleStories < stories.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={loadMoreStories}
                            disabled={isLoading}
                            className="px-8 py-3 bg-transparent text-pink-500 border border-pink-200 rounded-xl hover:bg-pink-50/30 transition-all duration-300 disabled:opacity-50 backdrop-blur-md bg-white/30"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    Loading...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    See More Stories
                                </span>
                            )}
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Full Story Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="text-3xl mb-4">{selectedStory.emotion}</div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedStory.title}</h2>
                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                {selectedStory.full_story}
                            </p>
                            <div className="mt-6 flex justify-between items-center">
                                <span className="text-sm text-gray-500">{selectedStory.timeAgo}</span>
                                <button
                                    onClick={() => setSelectedStory(null)}
                                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SuccessStories;