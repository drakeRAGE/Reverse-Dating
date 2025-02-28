import React, { createContext, useContext, useState } from 'react';

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        relationshipOverview: null,
        communicationConflict: null,
        emotionalTrust: null,
        personalFeelings: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveFormData = (step, data) => {
        setLoading(true);
        try {
            setFormData(prev => ({
                ...prev,
                [step]: data
            }));
            setError(null);
        } catch (err) {
            setError('Failed to save data');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            relationshipOverview: null,
            communicationConflict: null,
            emotionalTrust: null,
            personalFeelings: null
        });
        setError(null);
    };

    return (
        <PredictionContext.Provider value={{ formData, saveFormData, loading, error, resetForm }}>
            {children}
        </PredictionContext.Provider>
    );
};

export const usePrediction = () => useContext(PredictionContext);