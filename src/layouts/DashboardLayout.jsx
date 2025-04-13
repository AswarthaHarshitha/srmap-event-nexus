
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const DashboardLayout = ({ isAdmin = false, isOrganizer = false }) => {
  const { isAuthenticated, user } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect based on role
  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (isOrganizer && user.role !== 'organizer' && user.role !== 'admin') {
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
    <div className="flex h-screen bg-gray-50">
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
