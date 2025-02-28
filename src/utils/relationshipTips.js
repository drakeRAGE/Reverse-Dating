export const getRelationshipTips = (formData, healthScore) => {
    const tips = {
        duration: {
            low: "New relationships need time to develop. Focus on building a strong foundation through open communication and shared experiences.",
            medium: "You're building a good foundation. Continue nurturing your connection while maintaining individual growth.",
            high: "Your relationship has matured well. Keep exploring new ways to grow together while cherishing your established bond."
        },
        status: {
            low: "Every relationship type has its unique challenges. Focus on what works best for both of you.",
            medium: "Your current relationship status provides a good foundation. Keep working on strengthening your bond.",
            high: "You've found a comfortable relationship dynamic. Continue supporting each other's growth."
        },
        communication: {
            low: "Try setting aside dedicated time for meaningful conversations. Practice active listening without judgment.",
            medium: "Your communication is developing. Consider expressing feelings more openly and creating safe spaces for difficult conversations.",
            high: "Maintain your strong communication. Regular check-ins and appreciation can further strengthen your bond."
        },
        trust: {
            low: "Building trust takes time. Start with small acts of reliability and gradually open up about feelings.",
            medium: "You're developing good trust. Continue being consistent and honest in your actions and words.",
            high: "Your strong trust foundation is valuable. Keep nurturing it through continued honesty and emotional support."
        },
        happiness: {
            low: "Focus on identifying what brings joy to both of you. Plan activities that you both enjoy.",
            medium: "You're creating good moments together. Try new experiences to add more excitement.",
            high: "Your happiness level is great! Continue celebrating small moments and supporting each other's joy."
        },
        future: {
            low: "Take time to discuss your individual goals and how they align. There's no rush in figuring things out.",
            medium: "You're moving in a positive direction. Keep communicating about your shared future vision.",
            high: "Your shared vision for the future is strong. Continue planning and growing together."
        }
    };

    const getTipCategory = (value, max) => {
        const percentage = (value / max) * 100;
        if (percentage < 40) return 'low';
        if (percentage < 70) return 'medium';
        return 'high';
    };

    return {
        durationTip: tips.duration[getTipCategory(formData.relationshipOverview?.duration === 'more-3' ? 4 : 2, 4)],
        statusTip: tips.status[getTipCategory(formData.relationshipOverview?.status === 'engaged-married' ? 4 : 2, 4)],
        communicationTip: tips.communication[getTipCategory(formData.communicationConflict?.satisfaction, 5)],
        trustTip: tips.trust[getTipCategory(formData.emotionalTrust?.trustLevel, 5)],
        happinessTip: tips.happiness[getTipCategory(formData.personalFeelings?.happiness, 10)],
        futureTip: tips.future[getTipCategory(formData.personalFeelings?.futureView === 'growing-together' ? 3 : 1, 3)]
    };
};