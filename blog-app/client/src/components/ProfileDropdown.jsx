import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiLogOut, FiSettings } from 'react-icons/fi'

const ProfileDropdown = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="ml-3 relative">
      <div>
        <button
          type="button"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            <FiUser className="mr-2" /> Your Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            <FiSettings className="mr-2" /> Settings
          </Link>
          <button
            onClick={logout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            <FiLogOut className="mr-2" /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown