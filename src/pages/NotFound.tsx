
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-srm-green">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-3">
          <Button asChild className="w-full bg-srm-green hover:bg-srm-green-dark">
            <Link to={getHomeLink()}>
              Return to Home
            </Link>
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
