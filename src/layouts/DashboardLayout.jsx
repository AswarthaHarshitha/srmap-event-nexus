
import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useToast } from "@/components/ui/use-toast";

const DashboardLayout = ({ isAdmin = false, isOrganizer = false }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Display a welcome toast when the user first loads the dashboard
    if (isAuthenticated && user) {
      // Create appropriate dashboard name based on role
      let dashboardName = "Student Dashboard";
      if (isAdmin) dashboardName = "Admin Dashboard";
      else if (isOrganizer) dashboardName = "Organizer Dashboard";
      
      toast({
        title: `Welcome to your ${dashboardName}`,
        description: `Logged in as ${user.name} (${user.email})`,
        variant: "success",
      });
    }
  }, [isAuthenticated, user, isAdmin, isOrganizer, toast]);

  // While authentication is loading, show a loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-srm-green"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect based on role
  if (isAdmin && user.role !== 'admin') {
    toast({
      title: "Access Denied",
      description: "You do not have admin privileges",
      variant: "destructive",
    });
    return <Navigate to="/dashboard" replace />;
  }

  if (isOrganizer && user.role !== 'organizer' && user.role !== 'admin') {
    toast({
      title: "Access Denied",
      description: "You do not have organizer privileges",
      variant: "destructive",
    });
    return <Navigate to="/dashboard" replace />;
  }

  // For the regular dashboard, redirect organizers to their dashboard
  if (!isAdmin && !isOrganizer && user.role === 'organizer') {
    return <Navigate to="/organizer" replace />;
  }
  
  // For the regular dashboard, redirect admins to their dashboard
  if (!isAdmin && !isOrganizer && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isAdmin={isAdmin} isOrganizer={isOrganizer} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
