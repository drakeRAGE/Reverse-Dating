import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../authentication/authService';

export function Profile() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        bio: '',
        profilePicture: 'https://via.placeholder.com/150' // Default profile picture
    });

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
        <div className="min-h-screen bg-gray-50 pt-24 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-10 text-white">
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <img 
                                    src={userInfo.profilePicture} 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">{userInfo.name}</h1>
                                <p className="text-purple-100 mt-2">{userInfo.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={userInfo.name}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={userInfo.email}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={userInfo.password}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                                    <textarea
                                        value={userInfo.bio}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 h-32 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={handleLogout}
                                className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                            >
                                <span>Logout</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414 0L4 7.414 5.414 6l3.293 3.293L12 6l2 1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
