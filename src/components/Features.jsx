function Features() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Why Couples Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
          <div className="text-pink-600 text-4xl mb-4 group-hover:scale-110 transition">💘</div>
          <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
          <p className="text-gray-600">Get deep insights into your relationship patterns using advanced AI algorithms</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
          <div className="text-pink-600 text-4xl mb-4 group-hover:scale-110 transition">🎯</div>
          <h3 className="text-xl font-semibold mb-2">98% Accuracy</h3>
          <p className="text-gray-600">Our predictions are based on thousands of successful relationships</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
          <div className="text-pink-600 text-4xl mb-4 group-hover:scale-110 transition">🔒</div>
          <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
          <p className="text-gray-600">Your relationship details stay completely confidential</p>
        </div>
      </div>
    </div>
  )
}

export default Features