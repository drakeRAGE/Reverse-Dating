import React, { useState } from 'react';
import { usePrediction } from '../../context/PredictionContext';

const RelationshipOverview = ({ onNext }) => {
    const [duration, setDuration] = useState('');
    const [status, setStatus] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const { saveFormData, loading, error } = usePrediction();

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
        setShowMessage(false);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setShowMessage(false);
    };

    const handleSaveAndContinue = () => {
        if (duration && status) {
            saveFormData('relationshipOverview', { duration, status });
            if (!error) {
                onNext();
            }
        } else {
            setShowMessage(true);
        }
    };

    // Add loading state to button
    <button
        type="button"
        onClick={handleSaveAndContinue}
        disabled={!duration || !status || loading}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl 
        font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        border border-white/20 backdrop-blur-sm"
    >
        {loading ? (
            <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
            </span>
        ) : (
            'Save & Continue →'
        )}
    </button>
    return (
        <>
            <div className="max-w-3xl mx-auto relative">
                {showMessage && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-pink-200 flex items-center gap-3">
                            <span className="text-pink-500">💝</span>
                            <p className="text-gray-700">Please share both your relationship duration and status</p>
                        </div>
                    </div>
                )}

                <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-pink-100 backdrop-blur-lg">
                    <div className="flex flex-col items-center space-y-6">
                        {/* Header Section */}
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                                Tell Us Your Story 💕
                            </h2>
                            <p className="text-gray-600">Let's understand your relationship journey</p>
                        </div>

                        {/* Duration Section */}
                        <div className="w-full max-w-md space-y-6">
                            <label className="block text-gray-700 font-medium">
                                How long has your love story been unfolding? ✨
                            </label>
                            <div className="relative">
                                <select
                                    value={duration}
                                    onChange={handleDurationChange}
                                    className="w-full px-5 py-6 bg-gradient-to-r from-gray-50 to-white appearance-none border-2 border-pink-100 rounded-2xl focus:outline-none focus:border-pink-500 transition-all text-gray-700 cursor-pointer hover:bg-pink-50/50 shadow-sm"
                                >
                                    <option value="" disabled>Choose your journey length</option>
                                    <option value="less-6">Fresh & New (Less than 6 months)</option>
                                    <option value="6-12">Getting Serious (6-12 months)</option>
                                    <option value="1-3">Strong Bond (1-3 years)</option>
                                    <option value="more-3">Long-lasting Love (3+ years)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Section with reduced spacing */}
                        <div className="w-full max-w-md space-y-3">
                            <label className="block text-gray-700 font-medium">
                                Where are you both right now? 🌟
                            </label>
                            <div className="grid gap-2">
                                {[
                                    { label: "Dating Exclusively", icon: "💑" },
                                    { label: "Living Together", icon: "🏠" },
                                    { label: "Engaged/Married", icon: "💍" },
                                    { label: "Long-distance relationship", icon: "✈️" },
                                    { label: "Open relationship", icon: "🤝" }
                                ].map(({ label, icon }, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center p-3 space-x-4 cursor-pointer bg-gray-50 rounded-xl hover:bg-pink-50 transition-all group border-2 border-transparent hover:border-pink-200"
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={label.toLowerCase().replace(/\s+/g, '-')}
                                            onChange={handleStatusChange}
                                            checked={status === label.toLowerCase().replace(/\s+/g, '-')}
                                            className="w-4 h-4 text-pink-500 focus:ring-pink-500/20 border-gray-300"
                                        />
                                        <span className="text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                                            {icon} {label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleSaveAndContinue}
                    disabled={!duration || !status}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl 
                    font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    border border-white/20 backdrop-blur-sm"
                >
                    Save & Continue →
                </button>
            </div>
        </>
    );
};

export default RelationshipOverview;