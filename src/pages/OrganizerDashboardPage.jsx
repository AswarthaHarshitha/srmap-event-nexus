
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CalendarCheck, 
  Users, 
  BarChart, 
  PlusCircle,
  Clock,
  Edit,
  AlertTriangle,
  CheckCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EventCard from "@/components/EventCard";

// Mock data for dashboard
const mockEvents = [
  {
    id: 1,
    title: "Annual Technical Symposium 2025",
    description: "A platform for students to showcase their technical skills through various competitions.",
    date: "2025-05-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    bannerImage: "https://srmap.edu.in/wp-content/uploads/2020/06/technical-symposium.jpg",
    categories: ["Technical", "Workshop", "Competition"],
    registeredCount: 156,
    maxAttendees: 200,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Cultural Fest 2025",
    description: "Annual cultural extravaganza featuring music, dance, and theatrical performances.",
    date: "2025-06-20",
    time: "10:00 AM",
    location: "University Ground",
    bannerImage: "https://srmap.edu.in/wp-content/uploads/2022/10/event1.jpg",
    categories: ["Cultural", "Entertainment", "Art"],
    registeredCount: 320,
    maxAttendees: 500,
    status: "draft"
  },
];

const mockStats = {
  events: {
    total: 8,
    upcoming: 3,
    completed: 4,
    draft: 1
  },
  registrations: {
    total: 1245,
    thisMonth: 320
  },
  feedback: {
    averageRating: 4.7,
    totalResponses: 512
  }
};

const OrganizerDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Registration",
      message: "5 new students registered for Technical Symposium.",
      time: "10 minutes ago",
      type: "success"
    },
    {
      id: 2,
      title: "Approval Needed",
      message: "Your Cultural Fest event requires approval from admin.",
      time: "1 hour ago",
      type: "warning"
    },
    {
      id: 3,
      title: "Event Reminder",
      message: "Technical Symposium starts in 2 days.",
      time: "2 hours ago",
      type: "info"
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Organizer Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome back, {user.name}! Manage your events and monitor registrations.
            </p>
          </div>
          <Link to="/dashboard/create-event">
            <Button className="bg-srm-green text-white hover:bg-srm-green-dark">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-srm-green/10 rounded-md p-3">
                  <CalendarCheck className="h-6 w-6 text-srm-green" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Events
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {mockStats.events.total}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/dashboard/my-events"
                  className="font-medium text-srm-green hover:text-srm-green-dark"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-srm-gold/10 rounded-md p-3">
                  <Users className="h-6 w-6 text-srm-gold" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Registrations
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {mockStats.registrations.total}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/dashboard/registrations"
                  className="font-medium text-srm-green hover:text-srm-green-dark"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Upcoming Events
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {mockStats.events.upcoming}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/dashboard/my-events?filter=upcoming"
                  className="font-medium text-srm-green hover:text-srm-green-dark"
                >
                  View events
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <BarChart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Average Rating
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {mockStats.feedback.averageRating}/5
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/dashboard/feedback"
                  className="font-medium text-srm-green hover:text-srm-green-dark"
                >
                  View feedback
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Event Management */}
        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "upcoming"
                    ? "border-b-2 border-srm-green text-srm-green"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("draft")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "draft"
                    ? "border-b-2 border-srm-green text-srm-green"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Draft Events
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "completed"
                    ? "border-b-2 border-srm-green text-srm-green"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Completed Events
              </button>
            </nav>
          </div>
          
          {/* Event List */}
          <div className="p-6">
            {mockEvents.filter(event => 
              (activeTab === "upcoming" && event.status === "upcoming") ||
              (activeTab === "draft" && event.status === "draft") ||
              (activeTab === "completed" && event.status === "completed")
            ).length > 0 ? (
              <div className="space-y-6">
                {mockEvents
                  .filter(event => 
                    (activeTab === "upcoming" && event.status === "upcoming") ||
                    (activeTab === "draft" && event.status === "draft") ||
                    (activeTab === "completed" && event.status === "completed")
                  )
                  .map(event => (
                    <div key={event.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <CalendarCheck className="w-4 h-4 mr-1" />
                            {event.date} at {event.time}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Users className="w-4 h-4 mr-1" />
                            {event.registeredCount} / {event.maxAttendees} registered
                          </div>
                          <div className="mt-2">
                            <Progress value={(event.registeredCount / event.maxAttendees) * 100} className="h-2" />
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                          <Link to={`/dashboard/events/${event.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Link to={`/dashboard/events/${event.id}/manage`}>
                            <Button className="bg-srm-green text-white hover:bg-srm-green-dark" size="sm">
                              Manage
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <FileText className="h-12 w-12" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No events found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming events."
                    : activeTab === "draft"
                    ? "You don't have any draft events."
                    : "You don't have any completed events."}
                </p>
                <div className="mt-6">
                  <Link to="/dashboard/create-event">
                    <Button className="bg-srm-green text-white hover:bg-srm-green-dark">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create New Event
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panels - Notifications and Quick Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Registration Activity */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Registration Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Technical Symposium</h3>
                  <div className="mt-1 flex justify-between">
                    <span className="text-sm text-gray-500">156/200 registered</span>
                    <span className="text-sm text-gray-500">78% filled</span>
                  </div>
                  <Progress value={78} className="h-2 mt-1" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Cultural Fest</h3>
                  <div className="mt-1 flex justify-between">
                    <span className="text-sm text-gray-500">320/500 registered</span>
                    <span className="text-sm text-gray-500">64% filled</span>
                  </div>
                  <Progress value={64} className="h-2 mt-1" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Robotics Workshop</h3>
                  <div className="mt-1 flex justify-between">
                    <span className="text-sm text-gray-500">45/60 registered</span>
                    <span className="text-sm text-gray-500">75% filled</span>
                  </div>
                  <Progress value={75} className="h-2 mt-1" />
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link to="/dashboard/analytics">
                <Button variant="outline">
                  <BarChart className="w-4 h-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </Link>
            </div>
          </div>

          {/* Notifications Panel */}
          <div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Recent Notifications
              </h2>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex">
                    <div className="mr-3 flex-shrink-0">
                      {notification.type === 'success' && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                      {notification.type === 'info' && (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      {notification.type === 'warning' && (
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="link" className="text-srm-green hover:text-srm-green-dark text-sm">
                  View all notifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardPage;
