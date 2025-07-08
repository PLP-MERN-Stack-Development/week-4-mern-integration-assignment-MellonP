import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../api/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const { data } = await api.get('/users/me')
          setUser(data)
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      setUser(data.user)
      toast.success('Logged in successfully!')
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
      return false
    }
  }

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('token', data.token)
      setUser(data.user)
      toast.success('Registered successfully!')
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out successfully!')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)