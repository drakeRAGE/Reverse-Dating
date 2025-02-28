import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const subscribeToComments = (targetId, type, callback) => {
    return supabase
        .channel(`comments-${targetId}-${type}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'comments',
                filter: `target_id=eq.${targetId}&type=eq.${type}`
            },
            async (payload) => {
                const { data, error } = await supabase
                    .from('comments')
                    .select(`
                        *,
                        user:user_profiles!user_id (
                            username,
                            avatar_url
                        )
                    `)
                    .eq('id', payload.new.id)
                    .single();

                if (!error && data) {
                    const transformedComment = {
                        ...data,
                        profiles: {
                            username: data.user?.username || 'User',
                            avatar_url: data.user?.avatar_url || 
                                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user_id}&backgroundColor=random`
                        }
                    };
                    callback(transformedComment);
                }
            }
        )
        .subscribe();
};

// Likes related functions
export const likeService = {
    async addLike(userId, targetId, type) {
        const { data, error } = await supabase
            .from('likes')
            .insert([{
                user_id: userId,
                target_id: Number(targetId),
                type: type
            }])
            .select();
        return { data, error };
    },

    async removeLike(userId, targetId, type) {
        const { data, error } = await supabase
            .from('likes')
            .delete()
            .eq('user_id', userId)
            .eq('target_id', Number(targetId))
            .eq('type', type);
        return { data, error };
    },

    async getLikes(targetId, type) {
        const { data, error } = await supabase
            .from('likes')
            .select('*')
            .eq('target_id', Number(targetId))
            .eq('type', type);
        return { data, error };
    }
};

// Comments related functions
export const commentService = {
    async addComment(userId, targetId, type, content) {
        const { data: newComment, error: insertError } = await supabase
            .from('comments')
            .insert([{ 
                user_id: userId, 
                target_id: Number(targetId), 
                type: type, 
                content: content 
            }])
            .select(`
                *,
                user:user_profiles!user_id (
                    username,
                    avatar_url
                )
            `);
        if (insertError) {
            console.error('Error adding comment:', insertError);
            return { data: null, error: insertError };
        }

        // Transform the new comment to match the expected format
        const transformedComment = newComment?.map(comment => ({
            ...comment,
            profiles: {
                username: comment.user?.username || 'User',
                avatar_url: comment.user?.avatar_url || 
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}&backgroundColor=random`
            }
        }));

        return { data: transformedComment, error: null };
    },
    async getComments(targetId, type) {
        const { data, error } = await supabase
            .from('comments')
            .select(`
                *,
                user:user_profiles!user_id (
                    username,
                    avatar_url
                )
            `)
            .eq('target_id', Number(targetId))
            .eq('type', type)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
            return { data: [], error };
        }
        
        return { 
            data: data?.map(comment => ({
                ...comment,
                profiles: {
                    username: comment.user?.username || 'User',
                    avatar_url: comment.user?.avatar_url || 
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}&backgroundColor=random`
                }
            })) || [],
            error
        };
    }
};
// Stories related functions
export const storyService = {
    async getStories() {
        const { data, error } = await supabase
            .from('success_stories')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    },
    async getTotalStories() {
        const { count, error } = await supabase
            .from('success_stories')
            .count();
        return { count, error };
    },
    async addStory(story) {
        const { data, error } = await supabase
            .from('success_stories')
            .insert([{
                title: story.title,
                preview: story.preview,
                full_story: story.full_story,  // Make sure this matches the incoming data
                emotion: story.emotion,
                image_url: story.image_url,
                user_id: story.user_id,
                time_ago: story.time_ago,
                created_at: new Date().toISOString()
            }]);
        return { data, error };
    },
};
