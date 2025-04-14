
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, getUserRole } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine the appropriate home link based on user role
  const getHomeLink = () => {
    if (!isAuthenticated) return "/";
    
    const role = getUserRole();
    switch (role) {
      case "admin":
        return "/admin";
      case "organizer":
        return "/organizer";
      default:
        return "/dashboard";
    }
  };

  const handleRetry = () => {
    // Try to resolve the current path by analyzing it
    const path = location.pathname;
    
    if (path.includes('/admin/') || path.includes('/organizer/')) {
      // For admin or organizer paths, send them to their dashboard
      const basePath = path.startsWith('/admin') ? '/admin' : '/organizer';
      navigate(basePath);
    } else {
      // For other paths, just go to the appropriate home
      navigate(getHomeLink());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-20 w-20 text-red-500" />
        </div>
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page "{location.pathname}" doesn't exist or is still under development.
        </p>
        
        <div className="space-y-3">
          <Button asChild className="w-full bg-srm-green hover:bg-srm-green-dark">
            <Link to={getHomeLink()}>
              Return to Home
            </Link>
          </Button>
          
          <Button onClick={handleRetry} variant="outline" className="w-full">
            Try to navigate to a working page
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link to="/events">
              Browse Events
            </Link>
          </Button>
          
          {!isAuthenticated && (
            <Button asChild variant="ghost" className="w-full">
              <Link to="/auth/login">
                Sign In
              </Link>
            </Button>
          )}
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact support at{" "}
          <a href="mailto:support@srm.edu.in" className="text-srm-green hover:underline">
            support@srm.edu.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
