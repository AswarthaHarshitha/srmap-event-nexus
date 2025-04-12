
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/">
            <img src="https://tse2.mm.bing.net/th?id=OIP.xRiZIS_0QzBn0UdNitYlfgAAAA&pid=Api&P=0&h=180" alt="SRM Logo" className="mx-auto h-16" />
          </Link>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">EVENTSPHERE</h2>
          <p className="mt-2 text-sm text-gray-600">SRM University's Event Management Platform</p>
        </div>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
