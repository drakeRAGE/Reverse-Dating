import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="p-4 bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          HeartGuard
        </Link>
        <div className="space-x-6">
          <Link to="/about" className="text-gray-600 hover:text-pink-600 transition">About</Link>
          <Link to="/predict" className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition">
            Try Now
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar