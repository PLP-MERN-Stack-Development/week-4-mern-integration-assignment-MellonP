import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDarkMode } from '../context/DarkModeContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

const Register = () => {
  const { register: registerUser } = useAuth()
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    setServerError('')
    try {
      const success = await registerUser(data.name, data.email, data.password)
      if (success) {
        navigate('/')
      }
    } catch (err) {
      setServerError(err.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create a new account
          </h2>
          <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Or{' '}
            <Link
              to="/login"
              className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {serverError && (
            <div className={`rounded-md p-4 ${isDarkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
                    {serverError}
                  </h3>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  {...register('name')}
                  className={`appearance-none rounded-t-md relative block w-full px-3 py-2 border ${
                    errors.name
                      ? `${isDarkMode ? 'border-red-500' : 'border-red-300'} placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500`
                      : `${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300'} placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`
                  } focus:z-10 sm:text-sm`}
                  placeholder="Full Name"
                />
                {errors.name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiAlertCircle
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name.message}</p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.email
                      ? `${isDarkMode ? 'border-red-500' : 'border-red-300'} placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500`
                      : `${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300'} placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`
                  } focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiAlertCircle
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.password
                      ? `${isDarkMode ? 'border-red-500' : 'border-red-300'} placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500`
                      : `${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300'} placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`
                  } focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
                {errors.password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiAlertCircle
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className={`appearance-none rounded-b-md relative block w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? `${isDarkMode ? 'border-red-500' : 'border-red-300'} placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500`
                      : `${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300'} placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500`
                  } focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiAlertCircle
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className={`h-4 w-4 rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-blue-500' : 'border-gray-300 text-blue-600'} focus:ring-blue-500`}
            />
            <label
              htmlFor="terms"
              className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              I agree to the{' '}
              <Link
                to="/terms"
                className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'} ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <FiUser
                    className={`h-5 w-5 ${isDarkMode ? 'text-blue-300 group-hover:text-blue-200' : 'text-blue-400 group-hover:text-blue-300'}`}
                    aria-hidden="true"
                  />
                )}
              </span>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register