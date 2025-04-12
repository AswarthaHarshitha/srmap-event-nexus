
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bell, 
  Search, 
  Menu as MenuIcon, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: "New event registration",
      message: "You have successfully registered for Technical Symposium.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Event reminder",
      message: "Cultural Fest starts tomorrow at 10:00 AM.",
      time: "1 hour ago",
      read: true,
    },
  ]);

  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          
          <div className="flex-1 flex justify-center md:justify-start">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-srm-green focus:border-srm-green sm:text-sm"
                  placeholder="Search for events..."
                  type="search"
                />
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </div>
              
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <Link to="/dashboard/profile" className="flex items-center space-x-3">
                    <img
                      className="h-8 w-8 rounded-full border border-srm-gold"
                      src={user.profileImage}
                      alt={user.name}
                    />
                    <span className="hidden md:block font-medium text-sm">
                      {user.name}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
          <div className="px-2 space-y-1">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/tickets"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              My Tickets
            </Link>
            <Link
              to="/dashboard/create-event"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Create Event
            </Link>
            <Link
              to="/dashboard/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
