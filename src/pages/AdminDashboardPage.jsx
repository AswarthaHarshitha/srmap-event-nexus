import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  CalendarCheck,
  Shield,
  BarChart,
  Settings,
  UserCheck,
  FileCheck,
  AlertTriangle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockStats = {
  users: {
    total: 3245,
    students: 3012,
    organizers: 220,
    admins: 13,
    newToday: 28
  },
  events: {
    total: 182,
    upcoming: 45,
    ongoing: 12,
    completed: 125,
    pendingApproval: 8
  },
  tickets: {
    total: 8432,
    thisMonth: 1245
  },
  platform: {
    uptime: 99.98,
    errors: 2,
    issues: 5
  }
};

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const systemAlerts = [
    {
      id: 1,
      title: "Server Maintenance",
      message: "Scheduled maintenance on April 15, 2025, from 2:00 AM to 4:00 AM.",
      severity: "info",
      time: "2 days ago"
    },
    {
      id: 2,
      title: "Payment Gateway Issue",
      message: "Intermittent issues with Razorpay integration. Technical team is investigating.",
      severity: "warning",
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "Database Backup Completed",
      message: "Weekly database backup completed successfully.",
      severity: "success",
      time: "Yesterday"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "event",
      title: "Technical Symposium 2025",
      requestedBy: "Engineering Club",
      requestedOn: "April 10, 2025"
    },
    {
      id: 2,
      type: "organizer",
      title: "Sports Club",
      requestedBy: "John Smith",
      requestedOn: "April 12, 2025"
    },
    {
      id: 3,
      type: "event",
      title: "Dance Competition",
      requestedBy: "Cultural Association",
      requestedOn: "April 13, 2025"
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              System overview and management controls for {user.name}
            </p>
          </div>
          <div className="flex space-x-3">
            <Link to="/admin/settings">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Link to="/admin/reports">
              <Button className="bg-srm-green text-white hover:bg-srm-green-dark">
                <FileCheck className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-srm-green text-srm-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-srm-green text-srm-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "events"
                  ? "border-srm-green text-srm-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab("approvals")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "approvals"
                  ? "border-srm-green text-srm-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Approvals
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "system"
                  ? "border-srm-green text-srm-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              System Status
            </button>
          </nav>
        </div>

        {activeTab === "overview" && (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-srm-green mr-3" />
                    <div>
                      <div className="text-2xl font-bold">{mockStats.users.total}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        +{mockStats.users.newToday} today
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/admin/users" className="text-xs text-srm-green hover:underline">
                    View details →
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CalendarCheck className="h-8 w-8 text-srm-gold mr-3" />
                    <div>
                      <div className="text-2xl font-bold">{mockStats.events.total}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        {mockStats.events.upcoming} upcoming
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/admin/events" className="text-xs text-srm-green hover:underline">
                    View details →
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Tickets Issued</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BarChart className="h-8 w-8 text-purple-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold">{mockStats.tickets.total}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        {mockStats.tickets.thisMonth} this month
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/admin/tickets" className="text-xs text-srm-green hover:underline">
                    View details →
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-red-500 mr-3" />
                    <div>
                      <div className="text-2xl font-bold">{mockStats.events.pendingApproval}</div>
                      <p className="text-xs text-gray-500 mt-1">
                        Requires your attention
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/admin/approvals" className="text-xs text-srm-green hover:underline">
                    Review now →
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Pending Approvals
                  </h3>
                </div>
                <div className="p-6">
                  {pendingApprovals.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {pendingApprovals.map((item) => (
                        <div key={item.id} className="py-4 flex items-center justify-between">
                          <div className="flex items-start">
                            <div className={`
                              flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center
                              ${item.type === 'event' ? 'bg-blue-100' : 'bg-green-100'}
                            `}>
                              {item.type === 'event' ? (
                                <CalendarCheck className={`h-5 w-5 text-blue-600`} />
                              ) : (
                                <UserCheck className={`h-5 w-5 text-green-600`} />
                              )}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </h4>
                              <div className="mt-1 flex items-center">
                                <span className="text-xs text-gray-500">
                                  Requested by: {item.requestedBy}
                                </span>
                                <span className="mx-2 text-gray-500 text-xs">•</span>
                                <span className="text-xs text-gray-500">
                                  {item.requestedOn}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button className="bg-srm-green text-white hover:bg-srm-green-dark" size="sm">
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No pending approvals</p>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                  <Link to="/admin/approvals" className="text-sm font-medium text-srm-green hover:text-srm-green-dark">
                    View all approvals →
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    System Alerts
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex">
                        <div className="mr-3 flex-shrink-0">
                          {alert.severity === 'success' && (
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <FileCheck className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                          {alert.severity === 'info' && (
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Info className="w-4 h-4 text-blue-600" />
                            </div>
                          )}
                          {alert.severity === 'warning' && (
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {alert.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {alert.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                  <Link to="/admin/system" className="text-sm font-medium text-srm-green hover:text-srm-green-dark">
                    View system status →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Platform Status
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Server Uptime</span>
                      <span className="text-sm font-medium text-green-600">{mockStats.platform.uptime}%</span>
                    </div>
                    <Progress value={mockStats.platform.uptime} className="h-2" />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Database Status</span>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">API Performance</span>
                      <span className="text-sm font-medium text-green-600">Optimal</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link to="/admin/system">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      View Detailed System Report
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h3>
            <p className="text-gray-500 mb-4">
              This section would display detailed information about {activeTab}.
            </p>
            <Button variant="outline">
              Check back later
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
