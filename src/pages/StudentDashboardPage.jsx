
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CalendarCheck, 
  Ticket, 
  Clock, 
  Award, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";

// Mock data for dashboard
const mockEvents = [
  {
    id: 7,
    title: "Robotics Workshop 2025",
    description: "Join us for an exciting robotics workshop where you'll learn to build and program autonomous robots.",
    date: "2025-05-20",
    time: "10:00 AM",
    location: "Engineering Block, Lab 201",
    bannerImage: "https://srmap.edu.in/wp-content/uploads/2022/07/robo.jpeg",
    categories: ["Technical", "Workshop", "Robotics"],
    registeredCount: 45,
    maxAttendees: 60,
    organizer: "Robotics Club"
  },
  {
    id: 8,
    title: "Photography Contest 2025",
    description: "Showcase your photography skills and win exciting prizes. Theme: 'Campus Life'.",
    date: "2025-06-10",
    time: "09:00 AM",
    location: "Arts Block",
    bannerImage: "https://srmap.edu.in/wp-content/uploads/2022/10/event1-1536x1024.jpg",
    categories: ["Cultural", "Contest", "Photography"],
    registeredCount: 30,
    maxAttendees: 50,
    organizer: "Photography Club"
  },
];

const mockTickets = [
  {
    id: 1,
    eventId: 1,
    ticketId: "TKT-1001",
    event: {
      title: "Annual Technical Symposium 2025",
      date: "2025-05-15",
      time: "09:00 AM",
      location: "Main Auditorium",
      categories: ["Technical", "Workshop", "Competition"],
    },
    qrCode: "https://example.com/qr/1001",
    status: "valid",
    seat: "General"
  },
  {
    id: 2,
    eventId: 2,
    ticketId: "TKT-1002",
    event: {
      title: "Cultural Fest 2025",
      date: "2025-06-20",
      time: "10:00 AM",
      location: "University Ground",
      categories: ["Cultural", "Entertainment", "Art"],
    },
    qrCode: "https://example.com/qr/1002",
    status: "valid",
    seat: "VIP"
  }
];

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    registered: 0,
    upcoming: 0,
    attended: 0
  });

  // Animation for stats counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        return {
          registered: prev.registered >= 5 ? 5 : prev.registered + 1,
          upcoming: prev.upcoming >= 3 ? 3 : prev.upcoming + 1,
          attended: prev.attended >= 7 ? 7 : prev.attended + 1
        };
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Event Registration",
      message: "You have successfully registered for Technical Symposium.",
      time: "5 minutes ago",
      type: "success"
    },
    {
      id: 2,
      title: "Event Reminder",
      message: "Cultural Fest starts tomorrow at 10:00 AM.",
      time: "1 hour ago",
      type: "info"
    },
    {
      id: 3,
      title: "Event Update",
      message: "Workshop location has been changed to Room 302.",
      time: "Yesterday",
      type: "warning"
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Student Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {user.name}! Here's what's happening with your events.
        </p>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-srm-green/10 rounded-md p-3">
                  <Ticket className="h-6 w-6 text-srm-green" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Registered Events
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stats.registered}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/dashboard/tickets"
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
                  <Clock className="h-6 w-6 text-srm-gold" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Upcoming Events
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stats.upcoming}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/events"
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
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <CalendarCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Attended Events
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stats.attended}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/dashboard/history"
                  className="font-medium text-srm-green hover:text-srm-green-dark"
                >
                  View history
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Upcoming Events */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Recommended Events
              </h2>
              <Link to="/events">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-6">
            {/* Notifications */}
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
                          <Ticket className="w-4 h-4 text-green-600" />
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

            {/* Upcoming Tickets */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Your Tickets
              </h2>
              <div className="space-y-3">
                {mockTickets.map(ticket => (
                  <div key={ticket.id} className="border border-gray-200 rounded-md p-3">
                    <p className="font-medium text-sm">{ticket.event.title}</p>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>{ticket.event.date}</span>
                      <span>{ticket.ticketId}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/dashboard/tickets">
                  <Button className="bg-srm-green text-white hover:bg-srm-green-dark w-full text-sm">
                    View All Tickets
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
