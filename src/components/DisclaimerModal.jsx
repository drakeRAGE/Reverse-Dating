import React from 'react';

const DisclaimerModal = ({ onDismiss }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div 
                className="bg-white/95 rounded-2xl p-8 max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-[slideIn_0.3s_ease-out]"
                style={{
                    boxShadow: '0 0 50px rgba(168, 85, 247, 0.15)',
                }}
            >
                <div className="text-center">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-purple-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                        Important Notice
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Please note that our AI predictions are meant to be informative guides, not definitive answers. Every relationship is unique, and the outcome may vary based on numerous factors not captured in the prediction model.
                    </p>
                    <button
                        onClick={onDismiss}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    >
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;