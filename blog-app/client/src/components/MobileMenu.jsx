import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiHome, FiPlusSquare, FiList, FiX, FiMenu } from 'react-icons/fi'
import AuthButtons from './AuthButtons'
import ProfileDropdown from './ProfileDropdown'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary-600">BlogApp</div>
                <button
                  type="button"
                  className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  <Link
                    to="/"
                    className="flex items-center p-3 rounded-md hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiHome className="mr-3 h-6 w-6 text-primary-600" />
                    <span className="text-base font-medium text-gray-900">Home</span>
                  </Link>
                  <Link
                    to="/posts"
                    className="flex items-center p-3 rounded-md hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiList className="mr-3 h-6 w-6 text-primary-600" />
                    <span className="text-base font-medium text-gray-900">Posts</span>
                  </Link>
                  {user && (
                    <Link
                      to="/create-post"
                      className="flex items-center p-3 rounded-md hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiPlusSquare className="mr-3 h-6 w-6 text-primary-600" />
                      <span className="text-base font-medium text-gray-900">Create Post</span>
                    </Link>
                  )}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              {user ? (
                <div className="flex items-center justify-between">
                  <ProfileDropdown />
                </div>
              ) : (
                <AuthButtons />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu