import React, { createContext, useContext, useState } from 'react';
import { calculateRelationshipHealth } from '../utils/relationshipScoring';

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
    const [healthScore, setHealthScore] = useState(0);

    const saveFormData = (step, data) => {
        setLoading(true);
        try {
            const newFormData = {
                ...formData,
                [step]: data
            };
            setFormData(newFormData);
            
            // Calculate health score if all data is present
            if (step === 'personalFeelings') {
                const score = calculateRelationshipHealth(newFormData);
                setHealthScore(score);
            }
            
            setError(null);
        } catch (err) {
            setError('Failed to save data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PredictionContext.Provider value={{ 
            formData, 
            saveFormData, 
            loading, 
            error, 
            healthScore 
        }}>
            {children}
        </PredictionContext.Provider>
    );
};

export const usePrediction = () => useContext(PredictionContext);