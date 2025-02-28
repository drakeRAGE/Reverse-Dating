import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
    return (
        <footer className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-pink-50/50" />
            <div className="relative backdrop-blur-lg border-t border-white/20">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-3 gap-12 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4"
                        >
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Blures
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Revolutionizing relationships with AI-powered insights and predictions.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-4"
                        >
                            <h4 className="font-semibold text-gray-800">Quick Links</h4>
                            <nav className="flex flex-col space-y-2">
                                <Link to="/" className="text-gray-600 hover:text-pink-600 transition-colors">Home</Link>
                                <Link to="/about" className="text-gray-600 hover:text-pink-600 transition-colors">About</Link>
                                <Link to="/predict" className="text-gray-600 hover:text-pink-600 transition-colors">Get Prediction</Link>
                            </nav>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h4 className="font-semibold text-gray-800">Contact</h4>
                            <div className="space-y-2 text-gray-600">
                                <p>crashbrown2004@gmail.com</p>
                                {/* <p>Follow us on social media</p>
                                <div className="flex space-x-4">
                                    <a href="#" className="hover:text-pink-600 transition-colors">Twitter</a>
                                    <a href="#" className="hover:text-pink-600 transition-colors">Instagram</a>
                                </div> */}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="pt-8 border-t border-gray-200/30 text-center text-gray-600 text-sm"
                    >
                        <p>© {new Date().getFullYear()} Blures. All rights reserved.</p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;