import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SuccessStories from './pages/SuccessStories'
import Auth from './pages/Auth'
import { Profile } from './pages/Profile'
import About from './pages/About'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import Predict from './pages/Predict'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/predict" element={
            <ProtectedRoute>
              <Predict />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App