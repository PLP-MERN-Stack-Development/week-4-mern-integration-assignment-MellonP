import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';
import MobileMenu from './MobileMenu';
import { FaHome, FaBlog, FaPenAlt, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { FiMoon, FiSun } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img 
            src="/react.svg" 
            alt="Logo" 
            className="logo-icon"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
          />
          <span className="text-gray-900 dark:text-white">MyApp</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''} text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white`
                }
              >
                <FaHome className="nav-icon" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/posts"
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''} text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white`
                }
              >
                <FaBlog className="nav-icon" />
                <span>Posts</span>
              </NavLink>
            </li>
            
            {user ? (
              <>
                <li>
                  <NavLink 
                    to="/create-post"
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''} text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white`
                    }
                  >
                    <FaPenAlt className="nav-icon" />
                    <span>Create Post</span>
                  </NavLink>
                </li>
                <li>
                  <button 
                    onClick={logout}
                    className="logout-btn text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
                  >
                    <FaSignOutAlt className="nav-icon" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <div className="auth-buttons">
                <NavLink 
                  to="/login"
                  className={({ isActive }) => 
                    `auth-button-box ${isActive ? 'active' : ''} bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white`
                  }
                >
                  <FaSignInAlt className="auth-icon" />
                  <span>Login</span>
                </NavLink>
                <NavLink 
                  to="/register"
                  className={({ isActive }) => 
                    `auth-button-box ${isActive ? 'active' : ''} bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white`
                  }
                >
                  <FaUserPlus className="auth-icon" />
                  <span>Register</span>
                </NavLink>
              </div>
            )}
            
            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full focus:outline-none transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu - Make sure to pass dark mode props */}
        <MobileMenu user={user} logout={logout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  );
}

export default Navbar;