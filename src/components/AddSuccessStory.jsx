import React, { useState } from 'react';
import { authService } from '../authentication/authService';
import { storyService } from '../database/supabaseService';
import { supabase } from '../database/supabaseService';

function AddSuccessStory({ onSuccess }) {
    const [story, setStory] = useState({
        title: '',
        preview: '',
        fullStory: '',
        emotion: '❤️',
        image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setStory(prev => ({ ...prev, image: file }));
        } else {
            setError('Please select a valid image file');
        }
    };

    const uploadImage = async (imageFile) => {
        const fileName = `story${Date.now()}.jpg`;
        const { data, error } = await supabase.storage
            .from('story-images')
            .upload(fileName, imageFile, {
                cacheControl: '31536000',
                upsert: true
            });

        if (error) throw error;

        // Get the public URL instead of signed URL
        const { data: { publicUrl } } = supabase.storage
            .from('story-images')
            .getPublicUrl(fileName);

        return publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!story.image) {
            setError('Please upload an image for your story');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const session = await authService.getSession();
            if (!session?.user) {
                throw new Error('Please sign in to share your story');
            }

            // First upload the image and get public URL
            const imageUrl = await uploadImage(story.image);

            // Then create the story with the image URL
            const { data, error: uploadError } = await storyService.addStory({
                title: story.title,
                preview: story.preview,
                full_story: story.fullStory,  // This should match the database column name
                emotion: story.emotion,
                image_url: imageUrl,
                user_id: session.user.id,
                time_ago: 'Just now'
            });

            if (uploadError) throw uploadError;
            
            setStory({
                title: '',
                preview: '',
                fullStory: '', // Keep the React state name consistent
                emotion: '❤️',
                image: null
            });
            onSuccess?.(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Share Your Success Story</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Story Image *
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        value={story.title}
                        onChange={(e) => setStory(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview *
                    </label>
                    <textarea
                        value={story.preview}
                        onChange={(e) => setStory(prev => ({ ...prev, preview: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        rows="3"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Story *
                    </label>
                    <textarea
                        value={story.fullStory}
                        onChange={(e) => setStory(prev => ({ ...prev, fullStory: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        rows="6"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emotion
                    </label>
                    <select
                        value={story.emotion}
                        onChange={(e) => setStory(prev => ({ ...prev, emotion: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200"
                    >
                        <option value="❤️">❤️ Love</option>
                        <option value="✨">✨ Hope</option>
                        <option value="💪">💪 Strength</option>
                        <option value="🌟">🌟 Growth</option>
                        <option value="🙏">🙏 Gratitude</option>
                    </select>
                </div>

                {error && (
                    <p className="text-rose-500 text-sm">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? 'Sharing...' : 'Share Your Story'}
                </button>
            </form>
        </div>
    );
}

export default AddSuccessStory;