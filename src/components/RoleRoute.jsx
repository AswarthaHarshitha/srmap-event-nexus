
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, getUserRole } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const userRole = getUserRole();

  // Show loading state if auth is still being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-srm-green border-b-srm-gold border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    toast({
      title: "Authentication required",
      description: "Please log in to access this page",
      variant: "destructive",
    });
    
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  const hasRequiredRole = allowedRoles.includes(userRole);
  
  if (!hasRequiredRole) {
    toast({
      title: "Access denied",
      description: `You need ${allowedRoles.join(' or ')} permissions to access this page`,
      variant: "destructive",
    });
    
    // Redirect based on their actual role
    let redirectPath = "/dashboard"; // default for student
    if (userRole === "admin") redirectPath = "/admin";
    if (userRole === "organizer") redirectPath = "/organizer";
    
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated and has required role, render the protected content
  return children;
};
