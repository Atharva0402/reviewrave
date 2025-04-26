import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/App Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              {/* RateSpot */}
              ReviewRave
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/stores" 
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Stores
            </Link>
            
            {/* Add Create Store button for authorized users */}
            {user && (user.role === 'admin' || user.role === 'store_owner') && (
              <Link
                to="/stores/new"
                className="text-gray-700 hover:text-indigo-600 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Store
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Admin
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/stores" 
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
          >
            Stores
          </Link>
          
          {/* Mobile Create Store option */}
          {user && (user.role === 'admin' || user.role === 'store_owner') && (
            <Link
              to="/stores/new"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Create Store
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              Admin
            </Link>
          )}

          {user ? (
            <>
              <div className="px-3 py-2 text-gray-600">Welcome, {user.name}</div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}