import React from 'react';
import { motion } from 'framer-motion';

function AppShowcase() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-pink-50/50" />
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.3, margin: "-100px" }}
                    transition={{
                        duration: 1,
                        ease: "easeOut",
                        delay: 0.3
                    }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-pink-600 bg-pink-50 rounded-full">
                        App Preview
                    </span>
                    <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
                        Experience Blures in Action
                    </h2>
                    <p className="text-xl text-gray-900 leading-relaxed max-w-2xl mx-auto">
                        Take a glimpse into how Blures helps you navigate your relationship journey
                    </p>
                </motion.div>

                <div className="relative max-w-sm mx-auto">
                    {/* Phone Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        {/* Phone Border */}
                        <div className="relative z-10 border-[12px] border-gray-900 rounded-[3rem] shadow-xl overflow-hidden">
                            {/* Phone Screen */}
                            <div className="aspect-[9/19] bg-white overflow-hidden">
                                <img
                                    src="/main_page_pic.png"
                                    alt="Blures App Interface"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Phone Notch */}
                            <div className="absolute top-0 inset-x-0">
                                <div className="h-6 w-40 mx-auto bg-gray-900 rounded-b-3xl"></div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-1/4 -left-20 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl"></div>
                        <div className="absolute -z-10 bottom-1/4 -right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
                    </motion.div>

                    {/* Feature Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute inset-0 pointer-events-none hidden md:block" // Modified this line
                    >
                        <div className="absolute top-1/4 -right-32 md:-right-40 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                            <p className="text-sm font-medium text-gray-800">AI-Powered Analysis</p>
                        </div>
                        <div className="absolute top-2/4 -left-32 md:-left-40 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                            <p className="text-sm font-medium text-gray-800">Real-time Insights</p>
                        </div>
                        <div className="absolute bottom-1/4 -right-32 md:-right-40 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                            <p className="text-sm font-medium text-gray-800">Smart Predictions</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AppShowcase;