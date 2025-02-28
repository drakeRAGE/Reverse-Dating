import React, { useState } from 'react';
import RelationshipOverview from '../components/predict/RelationshipOverview';
import CommunicationConflict from '../components/predict/CommunicationConflict';
import EmotionalTrust from '../components/predict/EmotionalTrust';
import PersonalFeelings from '../components/predict/PersonalFeelings';
import { PredictionProvider, usePrediction } from '../context/PredictionContext';

const PredictForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { formData } = usePrediction();

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <RelationshipOverview onNext={() => setCurrentStep(2)} />;
            case 2:
                return <CommunicationConflict onNext={() => setCurrentStep(3)} />;
            case 3:
                return <EmotionalTrust onNext={() => setCurrentStep(4)} />;
            case 4:
                return <PersonalFeelings />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50/50 via-purple-50/30 to-white pt-28 pb-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent mb-3">
                        Relationship Insights ✨
                    </h1>
                    <p className="text-gray-600">Let's analyze your relationship journey together</p>
                </div>

                <form className="space-y-6">
                    {renderCurrentStep()}
                </form>
            </div>
        </div>
    );
};

const Predict = () => (
    <PredictionProvider>
        <PredictForm />
    </PredictionProvider>
);

export default Predict;