
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  Calendar, 
  Home, 
  LogIn, 
  LogOut 
} from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-10 w-auto"
                src="https://tse2.mm.bing.net/th?id=OIP.xRiZIS_0QzBn0UdNitYlfgAAAA&pid=Api&P=0&h=180"
                alt="SRM Logo"
              />
            </Link>
            <div className="hidden md:block ml-4">
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""} px-3 py-2 rounded-md text-sm font-medium`
                  }
                >
                  <Home className="w-4 h-4 inline mr-1" />
                  Home
                </NavLink>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""} px-3 py-2 rounded-md text-sm font-medium`
                  }
                >
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Events
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-8 w-8 rounded-full border-2 border-srm-gold"
                    />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/auth/login">
                    <Button variant="outline" size="sm">
                      <LogIn className="w-4 h-4 mr-1" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button className="bg-srm-green text-white hover:bg-srm-green-dark">
                      <User className="w-4 h-4 mr-1" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-srm-green"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-srm-green font-semibold" : "text-gray-700 hover:text-srm-green"
                }`
              }
              onClick={toggleMenu}
            >
              <Home className="w-4 h-4 inline mr-1" />
              Home
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-srm-green font-semibold" : "text-gray-700 hover:text-srm-green"
                }`
              }
              onClick={toggleMenu}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              Events
            </NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {isAuthenticated ? (
              <div className="px-2 space-y-2">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.profileImage}
                      alt={user.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-srm-green hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="w-4 h-4 inline mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <Link
                  to="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-srm-green hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  <LogIn className="w-4 h-4 inline mr-1" />
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-srm-green hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  <User className="w-4 h-4 inline mr-1" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
