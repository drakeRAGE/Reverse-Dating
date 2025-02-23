import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-purple-50 opacity-50" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="relative backdrop-blur-xl bg-white/10 p-12 md:p-16 rounded-[2.5rem] border border-white/20
          shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10 pointer-events-none" />
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Discover Your Future?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-10">
              Get your personalized relationship prediction today
            </p>
            <Link 
              to="/predict" 
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full 
                font-semibold hover:shadow-lg hover:shadow-pink-500/20 transform hover:-translate-y-1 
                transition-all duration-300 backdrop-blur-sm"
            >
              Start Free Analysis
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default CTA