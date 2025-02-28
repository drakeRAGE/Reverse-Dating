import React, { useState } from 'react';
import { usePrediction } from '../../context/PredictionContext';
import PredictionResults from './PredictionResults';

const PersonalFeelings = () => {
    const [happiness, setHappiness] = useState(5);
    const [futureView, setFutureView] = useState('');
    const [showResults, setShowResults] = useState(false);
    const { saveFormData, loading, error } = usePrediction();

    const handlePrediction = () => {
        if (happiness && futureView) {
            saveFormData('personalFeelings', { happiness, futureView });
            if (!error) {
                setShowResults(true);
            }
        }
    };

    // Add error message display
    {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-red-50 text-red-500 px-6 py-3 rounded-xl shadow-lg border border-red-200">
                {error}
            </div>
        </div>
    )}
    if (showResults) {
        return <PredictionResults />;
    }

    return (
        <>
            <div className="max-w-3xl mx-auto py-8">
                <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-pink-100 backdrop-blur-lg">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                                Future Together ✨
                            </h2>
                            <p className="text-gray-600">Share your feelings about your relationship's future</p>
                        </div>

                        <div className="w-full max-w-md space-y-3">
                            <label className="block text-gray-700 font-medium">
                                How happy are you in this relationship? 💝
                            </label>
                            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-100 shadow-inner space-y-6">
                                <div className="relative">
                                    <div className="absolute -top-3 left-0 right-0 flex justify-between px-1">
                                        {['😔', '😕', '😐', '🙂', '😊', '🥰', '💝', '✨', '💫', '💖'].map((emoji, index) => (
                                            <div key={index}
                                                className={`flex flex-col items-center transition-all duration-300 ${happiness == index + 1 ? 'scale-125 opacity-100' : 'opacity-40'
                                                    }`}
                                            >
                                                <div className={`text-lg mb-2 ${happiness == index + 1 ? 'animate-bounce' : ''}`}>
                                                    {emoji}
                                                </div>
                                                <div className={`h-1 w-1 rounded-full ${happiness == index + 1
                                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                                                    : 'bg-gray-200'
                                                    }`} />
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={happiness}
                                        onChange={(e) => setHappiness(e.target.value)}
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
                                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Not Happy</span>
                                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Extremely Happy</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-md space-y-3">
                            <label className="block text-gray-700 font-medium">
                                How do you see your future together? 💫
                            </label>
                            <div className="grid gap-2">
                                {[
                                    { label: "Growing Together", icon: "💑", desc: "I see a beautiful future with them" },
                                    { label: "Taking it Slow", icon: "💭", desc: "Still figuring things out" },
                                    { label: "Uncertain Path", icon: "✨", desc: "Not sure about long-term compatibility" }
                                ].map(({ label, icon, desc }, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center p-3 space-x-4 cursor-pointer bg-gray-50 rounded-xl hover:bg-pink-50 transition-all group border-2 border-transparent hover:border-pink-200"
                                    >
                                        <input
                                            type="radio"
                                            name="future"
                                            value={label.toLowerCase().replace(/\s+/g, '-')}
                                            onChange={(e) => setFutureView(e.target.value)}
                                            checked={futureView === label.toLowerCase().replace(/\s+/g, '-')}
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
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    type="button"
                    onClick={handlePrediction}
                    disabled={!happiness || !futureView}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl 
                    font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    border border-white/20 backdrop-blur-sm"
                >
                    Get Your Relationship Prediction 💫
                </button>

                {showResults && (
                    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100">
                        <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Relationship Data Summary 💝
                        </h3>
                        <div className="space-y-4 text-gray-700">
                            <div className="grid gap-2">
                                <p><span className="font-medium">Relationship Duration:</span> {formData.relationshipOverview?.duration}</p>
                                <p><span className="font-medium">Current Status:</span> {formData.relationshipOverview?.status}</p>
                                <p><span className="font-medium">Communication Satisfaction:</span> {formData.communicationConflict?.satisfaction}/5</p>
                                <p><span className="font-medium">Trust Level:</span> {formData.emotionalTrust?.trustLevel}/5</p>
                                <p><span className="font-medium">Sharing Level:</span> {formData.emotionalTrust?.sharingLevel}</p>
                                <p><span className="font-medium">Happiness Level:</span> {happiness}/10</p>
                                <p><span className="font-medium">Future Outlook:</span> {futureView}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PersonalFeelings;