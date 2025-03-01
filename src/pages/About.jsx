import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaChartLine, FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Main Heading */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Predict. Prevent. Protect.
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            India's first AI-powered relationship analysis platform helping young couples build stronger, lasting relationships through data-driven insights
                        </p>
                    </div>

                    {/* Core Service */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-purple-800 mb-6">Understanding Relationships Better</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                            At Blures, we understand that every relationship is unique. Our advanced AI technology analyzes over 100 relationship parameters to provide personalized insights and predictions about your relationship's future.
                        </p>
                        <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                            Whether you're in a new relationship or have been together for years, our platform helps you identify potential challenges early and provides actionable steps to strengthen your bond.
                        </p>
                        <div className="grid grid-cols-2 gap-8 text-center">
                            <div className="bg-purple-50 rounded-xl p-4">
                                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                                <div className="text-gray-600">Prediction Accuracy</div>
                            </div>
                            <div className="bg-pink-50 rounded-xl p-4">
                                <div className="text-3xl font-bold text-pink-600 mb-2">10,000+</div>
                                <div className="text-gray-600">Happy Couples</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Key Features */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            {
                                icon: <FaChartLine className="h-8 w-8" />,
                                title: "Breakup Prediction",
                                description: "Early detection of relationship challenges"
                            },
                            {
                                icon: <FaHeartbeat className="h-8 w-8" />,
                                title: "Relationship Analysis",
                                description: "Deep insights into compatibility patterns"
                            },
                            {
                                icon: <FaShieldAlt className="h-8 w-8" />,
                                title: "Prevention Guide",
                                description: "Actionable steps to strengthen bonds"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center"
                            >
                                <div className="text-purple-600 mb-4 flex justify-center">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-purple-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-purple-800 mb-6">Why Choose Blures</h2>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            Our platform combines cutting-edge AI technology with deep understanding of Indian relationship dynamics to provide accurate, culturally relevant insights.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <ul className="space-y-4">
                                {[
                                    "Advanced AI analysis with 85% accuracy",
                                    "Personalized relationship insights",
                                    "Cultural context awareness",
                                    "Regular feature updates"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center text-gray-700">
                                        <span className="text-purple-600 mr-2">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-4">
                                {[
                                    "100% private and secure",
                                    "24/7 relationship guidance",
                                    "Expert relationship advice",
                                    "Proven success rate"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center text-gray-700">
                                        <span className="text-purple-600 mr-2">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Privacy Note */}
                    <div className="text-center mb-12">
                        <p className="text-gray-600 text-sm">
                            Your privacy matters. All relationship data is encrypted and analyzed securely.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link
                            to="/predict"
                            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            Get Your Free Analysis
                        </Link>
                        <p className="mt-4 text-gray-600">
                            Join thousands of couples who trust Blures for relationship guidance
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;