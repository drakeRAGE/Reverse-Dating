// Enhanced scoring weights for different aspects
// Scoring weights
export const WEIGHTS = {
    duration: 0.15,
    status: 0.15,
    communication: 0.25,
    trust: 0.20,
    happiness: 0.15,
    future: 0.10
};

export const calculateDetailedScores = (formData) => {
    if (!formData) return null;

    const scores = {
        duration: calculateDurationScore(formData.relationshipOverview?.duration),
        status: calculateStatusScore(formData.relationshipOverview?.status),
        communication: calculateCommunicationScore(formData.communicationConflict),
        trust: calculateTrustScore(formData.emotionalTrust),
        happiness: calculateHappinessScore(formData.personalFeelings),
        future: calculateFutureScore(formData.personalFeelings?.futureView)
    };

    const weightedTotal = Object.entries(scores).reduce((total, [key, score]) => {
        return total + (score * WEIGHTS[key]);
    }, 0);

    return {
        ...scores,
        total: Math.min(Math.round(weightedTotal * 100), 100)
    };
};

// Original calculateRelationshipHealth function
export const calculateRelationshipHealth = (formData) => {
    const scores = calculateDetailedScores(formData);
    return scores ? scores.total : 0;
};

// Helper scoring functions
const calculateDurationScore = (duration) => {
    const scores = { 'less-6': 0.6, '6-12': 0.75, '1-3': 0.9, 'more-3': 1 };
    return scores[duration] || 0;
};

const calculateStatusScore = (status) => {
    const scores = {
        'long-distance-relationship': 0.7,
        'open-relationship': 0.7,
        'dating-exclusively': 0.85,
        'living-together': 0.95,
        'engaged-married': 1
    };
    return scores[status] || 0;
};

const calculateCommunicationScore = (data) => {
    if (!data) return 0;
    const satisfactionWeight = 0.6;
    const frequencyWeight = 0.4;
    
    const satisfactionScore = data.satisfaction / 5;
    const frequencyScore = {
        'rarely': 1,
        'occasionally': 0.8,
        'frequently': 0.6
    }[data.frequency] || 0;

    return (satisfactionScore * satisfactionWeight) + (frequencyScore * frequencyWeight);
};

const calculateTrustScore = (data) => {
    if (!data) return 0;
    const trustWeight = 0.5;
    const sharingWeight = 0.5;

    const trustScore = data.trustLevel / 5;
    const sharingScore = {
        'trust-issues': 0.4,
        'building-trust': 0.6,
        'selective-sharing': 0.8,
        'complete-trust': 1
    }[data.sharingLevel] || 0;

    return (trustScore * trustWeight) + (sharingScore * sharingWeight);
};

const calculateHappinessScore = (data) => {
    return data?.happiness ? data.happiness / 10 : 0;
};

const calculateFutureScore = (futureView) => {
    const scores = {
        'uncertain-path': 0.4,
        'taking-it-slow': 0.7,
        'growing-together': 1
    };
    return scores[futureView] || 0;
};

export const durationScores = {
    "less-6": 1,
    "6-12": 2,
    "1-3": 3,
    "more-3": 4
};

export const statusScores = {
    "long-distance-relationship": 1,
    "open-relationship": 1,
    "dating-exclusively": 2,
    "living-together": 3,
    "engaged-married": 4
};

export const disagreementScores = {
    "frequently": 1,
    "occasionally": 2,
    "rarely": 3
};

export const sharingScores = {
    "trust-issues": 1,
    "building-trust": 2,
    "selective-sharing": 3,
    "complete-trust": 4
};

export const futureViewScores = {
    "uncertain-path": 1,
    "taking-it-slow": 2,
    "growing-together": 3
};
