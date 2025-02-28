import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../authentication/authService';
import { likeService, commentService } from '../database/supabaseService';
import AddSuccessStory from '../components/AddSuccessStory';

export function Profile() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        username: '',
        name: '',
        email: '',
        bio: '',
        profilePicture: 'https://via.placeholder.com/150'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Add success state
    const [showSuccess, setShowSuccess] = useState(false);
    // Update the handleUpdatePassword function
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await authService.updatePassword(newPassword);
            if (error) throw error;

            setNewPassword('');
            setConfirmPassword('');
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setIsEditing(false);
            }, 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const session = await authService.getSession();
                if (session?.user) {
                    setUserInfo({
                        name: session.user.user_metadata?.name || '',
                        email: session.user.email || '',
                        bio: session.user.user_metadata?.bio || '',
                        password: '********', // For display purposes only
                        profilePicture: session.user.user_metadata?.avatar_url || 'https://via.placeholder.com/150'
                    });
                }
            } catch (error) {
                console.error('Error loading user info:', error);
            }
        };
        loadUserInfo();
    }, []);

    const handleLogout = async () => {
        try {
            await authService.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-sky-50">
            <div className="max-w-5xl mx-auto px-4 py-24">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="relative h-64 bg-gradient-to-r from-violet-400 to-fuchsia-400">
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-white rounded-full"></div>
                                <div className="relative">
                                    <img
                                        src={userInfo.profilePicture}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-violet-500 p-2 rounded-full text-white shadow-lg hover:bg-violet-600 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Profile Info */}
                    <div className="pt-20 px-8 pb-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{userInfo.name}</h1>
                        <p className="text-violet-500 font-medium text-lg">@{userInfo.username}</p>
                    </div>
                    {/* Profile Content */}
                    <div className="p-8 bg-gray-50">
                        <div className="max-w-2xl mx-auto space-y-8">
                            {/* Info Cards */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <label className="text-sm font-medium text-gray-600">Email</label>
                                    <p className="mt-2 text-gray-900">{userInfo.email}</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <label className="text-sm font-medium text-gray-600">Username</label>
                                    <p className="mt-2 text-gray-900">@{userInfo.username}</p>
                                </div>
                            </div>
                            {/* Bio with icon */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                    <label className="text-sm font-medium text-gray-600">Bio</label>
                                </div>
                                <p className="text-gray-900 whitespace-pre-wrap">{userInfo.bio || "No bio yet..."}</p>
                            </div>
                            {/* Password Section */}
                            <div className="border-t pt-8">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        Change Password
                                    </button>
                                ) : (
                                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>
                                        {error && (
                                            <p className="text-rose-500 text-sm">{error}</p>
                                        )}
                                        {showSuccess && (
                                            <p className="text-emerald-500 text-sm">Password updated successfully!</p>
                                        )}
                                        <div className="flex gap-3">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="flex-1 px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-all disabled:opacity-50"
                                            >
                                                {isLoading ? 'Updating...' : 'Update Password'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full px-6 py-3 text-rose-600 font-medium rounded-xl hover:bg-rose-50 transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <AddSuccessStory
                        onSuccess={() => {
                            // You can add a success message or refresh the stories list
                            alert('Your story has been shared successfully!');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
