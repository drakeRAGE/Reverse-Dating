import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-white/90 backdrop-blur-lg shadow-lg' : 'py-4 bg-transparent'}`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-2xl">💘</span>
                        </div>
                        <span className="font-extrabold text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-lg transition-all duration-300">
                            HeartSplit{/* Logo */}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {['Home', 'Success Stories'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`)
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            to="/predict"
                            className="ml-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <span>Try Free</span>
                            <span className="animate-pulse">✨</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute left-0 right-0 top-full mt-2 p-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl mx-4 border border-gray-100">
                        <div className="space-y-2">
                            {['Home', 'How it Works', 'Success Stories'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link
                                to="/predict"
                                className="block mt-4 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Try Free ✨
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar