import { Link } from 'react-router-dom'
import { FiLogIn, FiUserPlus } from 'react-icons/fi'

const AuthButtons = () => {
  return (
    <div className="flex space-x-4">
      <Link
        to="/login"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FiLogIn className="mr-2" /> Login
      </Link>
      <Link
        to="/register"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FiUserPlus className="mr-2" /> Register
      </Link>
    </div>
  )
}

export default AuthButtons