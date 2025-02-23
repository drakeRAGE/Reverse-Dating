import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../authentication/authService';

// Add these at the top of your component
function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    // Add this function to toggle between login and signup
    const toggleMode = (mode) => {
        setIsLogin(mode);
        setError(null);
        setSuccessMessage(null);
    };

    React.useEffect(() => {
        // Check for email verification response
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (error === 'access_denied' && errorDescription) {
            setError('Your verification link has expired. Please sign up again or request a new verification email.');
            setIsLogin(false);
        }
    }, []);

    // Add resend verification email function
    const handleResendVerification = async () => {
        if (!formData.email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        try {
            const { error } = await authService.resendVerificationEmail(formData.email);
            if (error) throw error;
            setSuccessMessage('Verification email has been resent. Please check your inbox.');
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                const { data, error } = await authService.signIn(
                    formData.email,
                    formData.password
                );
                if (error) throw error;
                navigate('/');
            } else {
                const { data, error } = await authService.signUp(
                    formData.email,
                    formData.password,
                    formData.fullName
                );
                if (error) throw error;

                setSuccessMessage('Please check your email for verification link');
                setFormData({ email: '', password: '', fullName: '' });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleOAuthSignIn = async (provider) => {
        try {
            const { error } = await authService.signInWithProvider(provider.toLowerCase());
            if (error) throw error;
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-white py-20">
            {/* Enhanced Background Animations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Container */}
            <div className="container mx-auto px-4 relative">
                <motion.div
                    className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="flex flex-col md:flex-row">
                        {/* Left Side - Enhanced Branding */}
                        <div className="md:w-1/2 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-12 text-white flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute inset-0">
                                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                            </div>

                            <motion.div
                                className="relative z-10"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-4xl font-bold mb-6 leading-tight whitespace-pre-line">
                                    {isLogin ? "Welcome\nBack!" : "Start Your\nLove Journey"}
                                </h2>
                                <p className="mb-8 text-white/90 text-lg">
                                    {isLogin
                                        ? "Discover if your crush is your perfect match with our AI-powered analysis."
                                        : "Join thousands of couples who found their true love through HeartSplit's intelligent matching."}
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-10 h-10 rounded-full border-2 border-white/80 bg-gradient-to-r from-pink-200 to-purple-200 shadow-lg"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium">10K+ happy couples</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="flex items-center gap-1">
                                            ⭐⭐⭐⭐
                                        </span>
                                        <span className="text-white/90">4.3/5 rating</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side - Auth Form */}
                        <div className="md:w-1/2 p-12">
                            <div className="text-center mb-8">
                                <div className="inline-flex p-1 bg-gray-100 rounded-xl">
                                    <button
                                        type="button"
                                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                                            isLogin ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                        onClick={() => toggleMode(true)}
                                    >
                                        Login
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                                            !isLogin ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                        onClick={() => toggleMode(false)}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>

                            {/* Success/Error Messages */}
                            {successMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm text-center"
                                >
                                    {successMessage}
                                </motion.div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center"
                                >
                                    {error}
                                    {error.includes('verification link has expired') && (
                                        <button
                                            type="button"
                                            onClick={handleResendVerification}
                                            className="ml-2 text-purple-600 hover:text-purple-700 font-medium"
                                        >
                                            Resend verification email
                                        </button>
                                    )}
                                </motion.div>
                            )}

                            <AnimatePresence mode="wait">
                                <motion.form
                                    key={isLogin ? 'login' : 'signup'}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    {!isLogin && (
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-medium shadow-lg shadow-purple-500/30 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            isLogin ? 'Login' : 'Create Account'
                                        )}
                                    </button>

                                    <div className="relative flex items-center gap-4 my-8">
                                        <div className="h-px flex-1 bg-gray-200"></div>
                                        <span className="text-sm text-gray-500">or continue with</span>
                                        <div className="h-px flex-1 bg-gray-200"></div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {['Google', 'Discord'].map((provider) => (
                                            <button
                                                key={provider}
                                                type="button"
                                                onClick={() => handleOAuthSignIn(provider)}
                                                className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                {provider}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="text-center text-sm text-gray-600">
                                        {isLogin ? (
                                            <p>Don't have an account? <button type="button" onClick={() => toggleMode(false)} className="text-purple-600 hover:text-purple-700 font-medium">Sign up</button></p>
                                        ) : (
                                            <p>Already have an account? <button type="button" onClick={() => toggleMode(true)} className="text-purple-600 hover:text-purple-700 font-medium">Login</button></p>
                                        )}
                                    </div>
                                </motion.form>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
export default Auth;