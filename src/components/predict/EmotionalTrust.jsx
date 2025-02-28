import React, { useState } from 'react';
import { usePrediction } from '../../context/PredictionContext';

const EmotionalTrust = ({ onNext }) => {
    const [trustLevel, setTrustLevel] = useState(3);
    const [sharingLevel, setSharingLevel] = useState('');
    const { saveFormData } = usePrediction();

    const handleSaveAndContinue = () => {
        if (trustLevel && sharingLevel) {
            saveFormData('emotionalTrust', { trustLevel, sharingLevel });
            onNext();
        }
    };

    return (
        <>
            <div className="max-w-3xl mx-auto py-8">
                <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-pink-100 backdrop-blur-lg">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                                Trust & Emotions 💝
                            </h2>
                            <p className="text-gray-600">Let's explore the emotional connection between you two</p>
                        </div>
                
                        <div className="w-full max-w-md space-y-3">
                            <label className="block text-gray-700 font-medium">
                                How do you feel about sharing? ✨
                            </label>
                            <div className="grid gap-2">
                                {[
                                    { label: "Complete Trust", icon: "💖", desc: "We share everything openly" },
                                    { label: "Selective Sharing", icon: "💫", desc: "We're careful with sensitive topics" },
                                    { label: "Building Trust", icon: "✨", desc: "We're gradually opening up" },
                                    { label: "Trust Issues", icon: "💭", desc: "We find it hard to be vulnerable" }
                                ].map(({ label, icon, desc }, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center p-3 space-x-4 cursor-pointer bg-gray-50 rounded-xl hover:bg-pink-50 transition-all group border-2 border-transparent hover:border-pink-200"
                                    >
                                        <input
                                            type="radio"
                                            name="trust"
                                            value={label.toLowerCase().replace(/\s+/g, '-')}
                                            onChange={(e) => setSharingLevel(e.target.value)}
                                            checked={sharingLevel === label.toLowerCase().replace(/\s+/g, '-')}
                                            className="w-4 h-4 text-pink-500 focus:ring-pink-500/20 border-gray-300"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                                                {icon} {label}
                                            </span>
                                            <span className="text-sm text-gray-500">{desc}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                
                        <div className="w-full max-w-md space-y-3">
                            <label className="block text-gray-700 font-medium">
                                Rate your emotional connection 💫
                            </label>
                            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-100 shadow-inner space-y-6">
                                <div className="relative">
                                    <div className="absolute -top-3 left-0 right-0 flex justify-between px-1">
                                        {['💔', '💭', '💫', '✨', '💝'].map((emoji, index) => (
                                            <div key={index} 
                                                className={`flex flex-col items-center transition-all duration-300 ${
                                                    trustLevel == index + 1 ? 'scale-125 opacity-100' : 'opacity-40'
                                                }`}
                                            >
                                                <div className={`text-lg mb-2 ${trustLevel == index + 1 ? 'animate-bounce' : ''}`}>
                                                    {emoji}
                                                </div>
                                                <div className={`h-1 w-1 rounded-full ${
                                                    trustLevel == index + 1 
                                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                                                    : 'bg-gray-200'
                                                }`} />
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={trustLevel}
                                        onChange={(e) => setTrustLevel(e.target.value)}
                                        className="w-full h-1 mt-8 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 
                                        rounded-full appearance-none cursor-pointer
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r 
                                        [&::-webkit-slider-thumb]:from-pink-500 [&::-webkit-slider-thumb]:to-purple-500
                                        [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(236,72,153,0.5)] 
                                        hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-medium text-gray-500">
                                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                        Needs Work
                                    </span>
                                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                        Deep Connection
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleSaveAndContinue}
                    disabled={!trustLevel || !sharingLevel}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl 
                    font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    border border-white/20 backdrop-blur-sm"
                >
                    Save & Continue →
                </button>
            </div>
        </>
    );
};

export default EmotionalTrust;