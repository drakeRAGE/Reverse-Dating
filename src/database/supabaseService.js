import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const subscribeToComments = (targetId, type, callback) => {
    console.log(`[Realtime] Creating subscription for target ${targetId}, type: ${type}`);
    
    const channel = supabase
        .channel(`comments-${targetId}-${type}`, {
            config: {
                broadcast: { self: true }
            }
        })
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'comments',
                filter: `target_id=eq.${targetId}`
            },
            async (payload) => {
                console.log('[Realtime] Comment INSERT event received:', payload);
                
                // Check if this comment matches our type filter
                if (payload.new.type !== type) {
                    console.log('[Realtime] Comment type mismatch, ignoring');
                    return;
                }
                
                const { data: comment, error } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('id', payload.new.id)
                    .single();

                if (error) {
                    console.error('[Realtime] Error fetching comment:', error);
                    return;
                }

                if (comment) {
                    console.log('[Realtime] Fetched comment:', comment);
                    
                    // Fetch user profile separately
                    const { data: profile } = await supabase
                        .from('user_profiles')
                        .select('username, avatar_url')
                        .eq('user_id', comment.user_id)
                        .single();

                    console.log('[Realtime] Fetched profile:', profile);

                    const transformedComment = {
                        ...comment,
                        profiles: {
                            username: profile?.username || 'User',
                            avatar_url: profile?.avatar_url || 
                                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}&backgroundColor=random`
                        }
                    };
                    
                    console.log('[Realtime] Calling callback with transformed comment');
                    callback(transformedComment);
                }
            }
        )
        .subscribe((status) => {
            console.log(`[Realtime] Subscription status for target ${targetId}:`, status);
        });
    
    return channel;
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
            .select();
        
        if (insertError) {
            console.error('Error adding comment:', insertError);
            return { data: null, error: insertError };
        }

        // Fetch the user profile separately
        let { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('username, avatar_url')
            .eq('user_id', userId)
            .single();

        // If profile doesn't exist, create one
        if (profileError && profileError.code === 'PGRST116') {
            const { data: newProfile } = await supabase
                .from('user_profiles')
                .insert([{
                    user_id: userId,
                    username: 'User',
                    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
                }])
                .select()
                .single();
            profile = newProfile;
        }

        // Transform the new comment to match the expected format
        const transformedComment = newComment?.map(comment => ({
            ...comment,
            profiles: {
                username: profile?.username || 'User',
                avatar_url: profile?.avatar_url || 
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}&backgroundColor=random`
            }
        }));

        return { data: transformedComment, error: null };
    },
    async getComments(targetId, type) {
        const { data: comments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('target_id', Number(targetId))
            .eq('type', type)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
            return { data: [], error };
        }

        if (!comments || comments.length === 0) {
            return { data: [], error: null };
        }

        // Fetch all user profiles for these comments
        const userIds = [...new Set(comments.map(c => c.user_id))];
        const { data: profiles } = await supabase
            .from('user_profiles')
            .select('user_id, username, avatar_url')
            .in('user_id', userIds);

        // Create a map for quick lookup
        const profileMap = {};
        profiles?.forEach(p => {
            profileMap[p.user_id] = p;
        });
        
        return { 
            data: comments.map(comment => ({
                ...comment,
                profiles: {
                    username: profileMap[comment.user_id]?.username || 'User',
                    avatar_url: profileMap[comment.user_id]?.avatar_url || 
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}&backgroundColor=random`
                }
            })),
            error: null
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
