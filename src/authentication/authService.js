import { supabase } from './supabase';

export const authService = {
    // Sign up with email and password
    async signUp(email, password, fullName) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                    emailRedirectTo: `${window.location.origin}/auth`
                }
            });
            
            if (error) throw error;
            
            // Check if user needs to confirm their email
            if (data?.user && data?.session === null) {
                return {
                    data,
                    error: null,
                    message: "Please check your email for confirmation link"
                };
            }

            return { data, error: null };
        } catch (error) {
            return { 
                data: null, 
                error: error.message || "An error occurred during sign up" 
            };
        }
    },

    // Sign in with email and password
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },

    // Sign out
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    // Password reset
    async resetPassword(email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    // OAuth sign in
    async signInWithProvider(provider) {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider
            });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },
    // Add this method to your authService
    async resendVerificationEmail(email) {
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth`
                }
            });
            
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    },

    async getSession() {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
    }

};