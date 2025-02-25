import React from 'react';
import { motion } from 'framer-motion';

function ConceptOverview() {
    const benefits = [
        {
            icon: "💘",  // Heart with arrow representing AI prediction
            title: "Smart Break Prediction",
            description: "Advanced AI technology analyzes relationship patterns to identify potential issues before they become serious problems"
        },
        {
            icon: "💭",  // Thought bubble representing insights and analysis
            title: "Real Talk Insights",
            description: "Receive data-driven, unbiased relationship analysis that helps you make informed decisions about your future together"
        },
        {
            icon: "🛡️",  // Shield representing protection
            title: "Relationship Shield",
            description: "Proactively protect your relationship with AI-powered early detection system and personalized guidance"
        },
        {
            icon: "🌱",  // Growing plant representing growth and nurturing
            title: "Growth Together",
            description: "Transform relationship challenges into opportunities for deeper connection and mutual understanding"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Know Before It Breaks 💔
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Tired of the same old dating apps that only focus on matches? We're different. Blure uses AI to predict potential relationship challenges before they hit. Think of it as your relationship's early warning system - because sometimes love needs a heads-up.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto relative">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-[2rem] 
                                transform -skew-y-2 group-hover:skew-y-0 transition-all duration-300" />
                            <div className="relative p-8 backdrop-blur-sm bg-white/10 rounded-[2rem] border border-white/20
                                hover:bg-white/20 transition-all duration-300 group-hover:translate-y-1">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <span className="text-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-5 
                                        rounded-full backdrop-blur-md border border-white/30 shadow-xl
                                        group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon}
                                    </span>
                                    <h3 className="font-bold text-2xl text-gray-800 group-hover:text-pink-600 
                                        transition-colors duration-300">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ConceptOverview;