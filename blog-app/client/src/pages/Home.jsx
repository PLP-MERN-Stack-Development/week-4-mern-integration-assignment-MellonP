import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FiSun, FiMoon, FiToggleLeft, FiToggleRight } from 'react-icons/fi'

const Home = () => {
  const { user } = useAuth()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('featured')
  const [isToggled, setIsToggled] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark', !darkMode)
  }

  const toggleSwitch = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Welcome to <span className="text-primary-600">BlogApp</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            {user ? `Hello, ${user.name}! Ready to create something amazing?` : 'Join our community and start sharing your thoughts!'}
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-center mb-12">
          <button
            onClick={toggleDarkMode}
            className="flex items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow"
          >
            {darkMode ? (
              <>
                <FiSun className="mr-2" /> Light Mode
              </>
            ) : (
              <>
                <FiMoon className="mr-2" /> Dark Mode
              </>
            )}
          </button>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Interactive UI</h3>
                <button
                  onClick={toggleSwitch}
                  className="flex items-center focus:outline-none"
                >
                  {isToggled ? (
                    <FiToggleRight className="h-6 w-6 text-primary-600" />
                  ) : (
                    <FiToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {isToggled
                  ? 'You activated the premium features!'
                  : 'Toggle this switch to unlock special features.'}
              </p>
              {isToggled && (
                <div className="bg-primary-100 dark:bg-primary-900 p-4 rounded-lg">
                  <p className="text-primary-800 dark:text-primary-200">
                    Premium content unlocked! Enjoy your enhanced experience.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Explore our collection of the most recent articles and blog posts from our community.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Updated daily</span>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  View All
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Users</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
                  <p className="text-2xl font-bold">567</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('featured')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'featured'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'popular'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recent'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Recent
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          {activeTab === 'featured' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Featured Content</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Check out our hand-picked selection of the best content on our platform. Our editors regularly update this section with high-quality articles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Getting Started with React</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A comprehensive guide for beginners to start with React.js
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Advanced CSS Techniques</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Learn modern CSS approaches for better styling
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'popular' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Popular Content</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                See what's trending in our community. These posts have received the most engagement from our users.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold">State Management in 2023</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1,245 views • 56 comments
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold">Tailwind CSS vs. Traditional CSS</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      987 views • 42 comments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'recent' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Recent Content</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Fresh off the press! Check out the newest additions to our platform.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4 py-1">
                  <h4 className="font-bold">New React Hooks Explained</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Posted 2 hours ago
                  </p>
                </div>
                <div className="border-l-4 border-primary-500 pl-4 py-1">
                  <h4 className="font-bold">Building Accessible Web Apps</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Posted 5 hours ago
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-6">
              Join our growing community of developers and content creators. Share your knowledge and learn from others.
            </p>
            <div className="flex justify-center space-x-4">
              {!user ? (
                <>
                  <a
                    href="/register"
                    className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md shadow-sm hover:bg-gray-100"
                  >
                    Sign up for free
                  </a>
                  <a
                    href="/login"
                    className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10"
                  >
                    Login
                  </a>
                </>
              ) : (
                <a
                  href="/create-post"
                  className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md shadow-sm hover:bg-gray-100"
                >
                  Create your first post
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home