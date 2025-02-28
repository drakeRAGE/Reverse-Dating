import React from 'react';
import { usePrediction } from '../../context/PredictionContext';
import { calculateRelationshipHealth, calculateDetailedScores, WEIGHTS } from '../../utils/relationshipScoring';
import { getRelationshipTips } from '../../utils/relationshipTips';

const PredictionResults = () => {
    const { formData, resetForm } = usePrediction();
    const healthScore = calculateRelationshipHealth(formData);
    const tips = getRelationshipTips(formData, healthScore);
    const scores = calculateDetailedScores(formData);

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50/50 via-purple-50/30 to-white">
            {/* Hero Section with Animated Score */}
            <div className="bg-white border-b border-pink-100">
                <div className="max-w-7xl mx-auto py-16 px-4">
                    <div className="text-center space-y-8">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                            Relationship Insights 💝
                        </h1>
                        <div className="relative inline-flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <svg className="w-64 h-64 transform -rotate-90">
                                <circle
                                    className="text-gray-200"
                                    strokeWidth="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="120"
                                    cx="128"
                                    cy="128"
                                />
                                <circle
                                    className="text-pink-500 transition-all duration-1000 ease-out"
                                    strokeWidth="8"
                                    strokeDasharray={120 * 2 * Math.PI}
                                    strokeDashoffset={120 * 2 * Math.PI * (1 - scores.total / 100)}
                                    strokeLinecap="round"
                                    stroke="url(#gradient)"
                                    fill="transparent"
                                    r="120"
                                    cx="128"
                                    cy="128"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#EC4899" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <div className="text-7xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                    {scores.total}%
                                </div>
                                <p className="text-xl text-gray-600 mt-2">Relationship Health</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className="grid gap-8">
                    {/* Score Categories Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {Object.entries(WEIGHTS).map(([key, weight]) => (
                            <div key={key}
                                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-pink-100 
                                transform hover:scale-105 duration-300"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-semibold capitalize text-gray-800">
                                        {key}
                                    </h3>
                                    <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-medium">
                                        {weight * 100}%
                                    </span>
                                </div>
                                <div className="relative flex items-center justify-center">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle
                                            className="text-gray-100"
                                            strokeWidth="10"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="56"
                                            cx="64"
                                            cy="64"
                                        />
                                        <circle
                                            className="transition-all duration-1000 ease-out"
                                            strokeWidth="10"
                                            strokeDasharray={56 * 2 * Math.PI}
                                            strokeDashoffset={56 * 2 * Math.PI * (1 - scores[key])}
                                            strokeLinecap="round"
                                            stroke="url(#gradient)"
                                            fill="transparent"
                                            r="56"
                                            cx="64"
                                            cy="64"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                            {Math.round(scores[key] * 100)}%
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                                    <p className="text-sm text-gray-700">{tips[`${key}Tip`]}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={resetForm}
                            className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl 
                            font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 
                            hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                            border border-white/20 backdrop-blur-sm relative overflow-hidden"
                        >
                            <span className="relative z-10">Start New Assessment ✨</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionResults;