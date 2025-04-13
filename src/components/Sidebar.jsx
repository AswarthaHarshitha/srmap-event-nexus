
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  PlusCircle,
  User,
  Settings,
  LogOut,
  Users,
  ClipboardCheck,
  BarChart,
  FileText,
  Shield,
  Clock,
  Star
} from "lucide-react";

const Sidebar = ({ isAdmin = false, isOrganizer = false }) => {
  const { user, logout } = useAuth();

  // Student navigation
  const studentNavigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Browse Events",
      path: "/events",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "My Tickets",
      path: "/dashboard/tickets",
      icon: <Ticket className="w-5 h-5" />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  // Organizer navigation
  const organizerNavigation = [
    {
      name: "Dashboard",
      path: "/organizer",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "My Events",
      path: "/organizer/events",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Create Event",
      path: "/organizer/create-event",
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      name: "Registrations",
      path: "/organizer/registrations",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      path: "/organizer/analytics",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      name: "Profile",
      path: "/organizer/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  // Admin navigation
  const adminNavigation = [
    {
      name: "Admin Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Manage Events",
      path: "/admin/events",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Manage Users",
      path: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Approval Requests",
      path: "/admin/approvals",
      icon: <ClipboardCheck className="w-5 h-5" />,
    },
    {
      name: "System Status",
      path: "/admin/system",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  // Determine which navigation to use
  let navigation;
  let roleLabel;

  if (isAdmin) {
    navigation = adminNavigation;
    roleLabel = "Administrator";
  } else if (isOrganizer) {
    navigation = organizerNavigation;
    roleLabel = "Event Organizer";
  } else {
    navigation = studentNavigation;
    roleLabel = "Student";
  }

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white shadow dark:bg-gray-900">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center justify-center px-4 mb-6">
            <img
              className="h-12"
              src="https://tse2.mm.bing.net/th?id=OIP.xRiZIS_0QzBn0UdNitYlfgAAAA&pid=Api&P=0&h=180"
              alt="SRM Logo"
            />
          </div>
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-16 h-16 rounded-full border-2 border-srm-gold"
              src={user.profileImage}
              alt={user.name}
            />
            <h3 className="mt-2 text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className={`mt-1 px-2 py-1 text-xs rounded-full ${
              isAdmin 
                ? "bg-red-100 text-red-800" 
                : isOrganizer 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-srm-gold/20 text-srm-gold-dark"
            }`}>
              {roleLabel}
            </span>
          </div>
          <div className="flex flex-col flex-grow px-4 mt-5">
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-srm-green text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={logout}
              className="group flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-800 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
