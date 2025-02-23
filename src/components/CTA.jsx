import { Link } from 'react-router-dom'

function CTA() {
  return (
    <div className="py-16 text-center">
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 p-12 rounded-3xl text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Future?</h2>
        <p className="mb-8">Get your personalized relationship prediction today</p>
        <Link to="/predict" className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition">
          Start Free Analysis
        </Link>
      </div>
    </div>
  )
}

export default CTA