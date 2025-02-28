import React from 'react';
import { usePrediction } from '../../context/PredictionContext';

const PredictionResults = () => {
    const { formData, resetForm } = usePrediction();
    const handleRestart = () => {
        resetForm();
        window.location.reload(); // This will restart the form flow
    };

    console.log(formData)

    const formatValue = (value) => {
        if (!value) return 'Not specified';
        if (typeof value === 'string') {
            return value.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        }
        return value;
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 backdrop-blur-lg">
                <div className="flex flex-col items-center space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                            Relationship Summary 💝
                        </h2>
                        <p className="text-gray-600">Here's what you shared about your relationship</p>
                    </div>

                    <div className="w-full max-w-2xl space-y-6">
                        <div className="grid gap-4 p-6 bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-2xl">
                            {[
                                { label: "Relationship Duration", value: formData.relationshipOverview?.duration, icon: "⏳" },
                                { label: "Current Status", value: formData.relationshipOverview?.status, icon: "💑" },
                                { label: "Communication Satisfaction", value: `${formData.communicationConflict?.satisfaction}/5`, icon: "💭" },
                                { label: "Disagreement Frequency", value: formData.communicationConflict?.frequency, icon: "🤝" },
                                { label: "Trust Level", value: `${formData.emotionalTrust?.trustLevel}/5`, icon: "💫" },
                                { label: "Sharing Level", value: formData.emotionalTrust?.sharingLevel, icon: "💖" },
                                { label: "Happiness Level", value: `${formData.personalFeelings?.happiness}/10`, icon: "✨" },
                                { label: "Future Outlook", value: formData.personalFeelings?.futureView, icon: "🔮" }
                            ].map(({ label, value, icon }) => (
                                <div key={label} className="flex items-center gap-4 p-4 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all">
                                    <span className="text-xl">{icon}</span>
                                    <div>
                                        <p className="text-sm text-gray-500">{label}</p>
                                        <p className="font-medium text-gray-800">{formatValue(value)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleRestart}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl 
                        font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                        border border-white/20 backdrop-blur-sm"
                    >
                        Start New Assessment ✨
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PredictionResults;