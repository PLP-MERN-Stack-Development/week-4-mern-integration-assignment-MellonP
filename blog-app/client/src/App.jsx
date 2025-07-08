import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { DarkModeProvider } from './context/DarkModeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import Navbar from './components/Navbar'
import DarkModeToggle from './components/DarkModeToggle'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/posts" element={<Posts />} />
                <Route 
                  path="/create-post" 
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
            
            {/* Dark Mode Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
              <DarkModeToggle />
            </div>

            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              toastClassName="dark:bg-gray-800 dark:text-white"
              bodyClassName="dark:bg-gray-800"
              progressClassName="bg-blue-500 dark:bg-blue-400"
            />
          </div>
        </Router>
      </DarkModeProvider>
    </AuthProvider>
  )
}

export default App