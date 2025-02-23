import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { storyService } from '../database/supabaseService';
import { authService } from '../authentication/authService';

function AddSuccessStory({ onSuccess }) {
    const [story, setStory] = useState({
        title: '',
        preview: '',
        fullStory: '',
        emotion: '💖'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emotions = ['💖', '💪', '🎯', '🌟', '🦋', '🔍', '🌱', '🗝️', '⛓️', '🧘‍♀️', '💭', '📈', '🧭', '📖'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const session = await authService.getSession();
            if (!session?.user) {
                alert('Please login to share your story');
                return;
            }

            const { error } = await storyService.addStory({
                ...story,
                user_id: session.user.id,
                created_at: new Date().toISOString()
            });

            if (error) {
                console.error('Error:', error.message);
                alert('Failed to add story. Please try again.');
                return;
            }
            
            setStory({
                title: '',
                preview: '',
                fullStory: '',
                emotion: '💖'
            });
            
            alert('Your story has been shared successfully!');
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error adding story:', error);
            alert('Failed to add story. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
        >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Share Your Success Story</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choose an Emotion
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {emotions.map((emoji) => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() => setStory(prev => ({ ...prev, emotion: emoji }))}
                                className={`text-2xl p-2 rounded-full transition-all ${
                                    story.emotion === emoji 
                                    ? 'bg-pink-100 scale-110' 
                                    : 'hover:bg-gray-100'
                                }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={story.title}
                        onChange={(e) => setStory(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                    </label>
                    <input
                        type="text"
                        value={story.preview}
                        onChange={(e) => setStory(prev => ({ ...prev, preview: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Story
                    </label>
                    <textarea
                        value={story.fullStory}
                        onChange={(e) => setStory(prev => ({ ...prev, fullStory: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent h-40"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 disabled:opacity-50 transition-colors"
                >
                    {isSubmitting ? 'Sharing...' : 'Share Your Story'}
                </button>
            </form>
        </motion.div>
    );
}

export default AddSuccessStory;