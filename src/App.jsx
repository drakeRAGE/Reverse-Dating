import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here when you create other pages */}
        </Routes>
      </div>
    </Router>
  )
}

export default App