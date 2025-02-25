import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-breakup.svg'  // Add this import

function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-purple-50 to-white"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-8">
            <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-4">
              <span className="text-sm font-medium text-gray-600">
                🎯 98% Prediction Accuracy
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              Predict Your
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Relationship Future
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl">
              Discover if your relationship will last! Our AI predicts relationship outcomes with incredible accuracy 💔
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link 
                to="/predict" 
                className="group bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Check Now
                <span className="group-hover:rotate-45 transition-transform duration-300">
                  💘
                </span>
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-pink-200 to-purple-200"></div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Trusted by 10K+ users
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
            <img
              src={heroImage}  // Change this line
              alt="Love Analysis"
              className="relative z-10 w-full max-w-2xl mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero