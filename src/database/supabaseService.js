import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Likes related functions
export const likeService = {
    async addLike(userId, targetId, type) {
        const { data, error } = await supabase
            .from('likes')
            .insert([
                { user_id: userId, target_id: targetId, type: type }
            ]);
        return { data, error };
    },

    async removeLike(userId, targetId, type) {
        const { data, error } = await supabase
            .from('likes')
            .delete()
            .match({ user_id: userId, target_id: targetId, type: type });
        return { data, error };
    },

    async getLikes(targetId, type) {
        const { data, error } = await supabase
            .from('likes')
            .select('*')
            .match({ target_id: targetId, type: type });
        return { data, error };
    }
};

// Comments related functions
export const commentService = {
    async addComment(userId, targetId, type, content) {
        const { data, error } = await supabase
            .from('comments')
            .insert([
                { 
                    user_id: userId, 
                    target_id: targetId, 
                    type: type, 
                    content: content 
                }
            ]);
        return { data, error };
    },

    async getComments(targetId, type) {
        const { data, error } = await supabase
            .from('comments')
            .select(`
                *,
                profiles:user_id (username, avatar_url)
            `)
            .match({ target_id: targetId, type: type })
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async deleteComment(commentId, userId) {
        const { data, error } = await supabase
            .from('comments')
            .delete()
            .match({ id: commentId, user_id: userId });
        return { data, error };
    }
};