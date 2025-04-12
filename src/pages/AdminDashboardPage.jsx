
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  LineChart,
  CheckCircle,
  AlarmClock,
  XCircle,
  Users,
  Calendar,
  Clock,
  Percent,
  FileText,
  Download,
  ArrowUpRight,
  Check,
  X
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data for admin dashboard
const mockStats = {
  totalEvents: 186,
  activeEvents: 24,
  pendingApprovals: 8,
  rejectedEvents: 3,
  totalUsers: 2567,
  totalRegistrations: 8934,
  avgAttendance: 72,
};

// Mock data for event approvals
const mockEventApprovals = [
  {
    id: 1,
    title: "Blockchain Workshop",
    organizer: "Department of Computer Science",
    submittedBy: "Dr. Ramesh Kumar",
    email: "ramesh.kumar@srmap.edu.in",
    date: "2025-08-15",
    status: "pending",
    categories: ["Technical", "Workshop"],
    registrationGoal: 60,
    submitDate: "2025-04-10T09:30:00",
  },
  {
    id: 2,
    title: "Cultural Dance Competition",
    organizer: "Fine Arts Club",
    submittedBy: "Priya Sharma",
    email: "priya.s@srmap.edu.in",
    date: "2025-07-22",
    status: "pending",
    categories: ["Cultural", "Competition"],
    registrationGoal: 100,
    submitDate: "2025-04-09T14:45:00",
  },
  {
    id: 3,
    title: "Entrepreneurship Seminar",
    organizer: "School of Business",
    submittedBy: "Prof. Sunil Mehta",
    email: "sunil.mehta@srmap.edu.in",
    date: "2025-06-30",
    status: "pending",
    categories: ["Business", "Seminar"],
    registrationGoal: 150,
    submitDate: "2025-04-08T11:15:00",
  },
];

// Mock data for recent events
const mockRecentEvents = [
  {
    id: 1,
    title: "Annual Technical Symposium 2025",
    date: "2025-05-15",
    status: "active",
    registrations: 215,
    capacity: 500,
  },
  {
    id: 2,
    title: "Cultural Fest 2025",
    date: "2025-06-20",
    status: "active",
    registrations: 450,
    capacity: 1000,
  },
  {
    id: 3,
    title: "AI & Machine Learning Workshop",
    date: "2025-05-25",
    status: "active",
    registrations: 85,
    capacity: 150,
  },
  {
    id: 4,
    title: "Photography Contest 2025",
    date: "2025-06-10",
    status: "active",
    registrations: 30,
    capacity: 50,
  },
];

const AdminDashboardPage = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    pendingApprovals: 0,
    rejectedEvents: 0,
    totalUsers: 0,
    totalRegistrations: 0,
    avgAttendance: 0,
  });
  const [eventApprovals, setEventApprovals] = useState(mockEventApprovals);
  
  // Animation for stats counters
  useEffect(() => {
    // Function to animate counting up
    const animateStats = () => {
      let current = {
        totalEvents: 0,
        activeEvents: 0,
        pendingApprovals: 0,
        rejectedEvents: 0,
        totalUsers: 0,
        totalRegistrations: 0,
        avgAttendance: 0,
      };
      
      const increment = {
        totalEvents: Math.ceil(mockStats.totalEvents / 20),
        activeEvents: Math.ceil(mockStats.activeEvents / 20),
        pendingApprovals: Math.ceil(mockStats.pendingApprovals / 20),
        rejectedEvents: Math.ceil(mockStats.rejectedEvents / 20),
        totalUsers: Math.ceil(mockStats.totalUsers / 20),
        totalRegistrations: Math.ceil(mockStats.totalRegistrations / 20),
        avgAttendance: Math.ceil(mockStats.avgAttendance / 20),
      };
      
      const interval = setInterval(() => {
        let completed = true;
        
        // Update each stat
        Object.keys(current).forEach(key => {
          if (current[key] < mockStats[key]) {
            current[key] = Math.min(current[key] + increment[key], mockStats[key]);
            completed = false;
          }
        });
        
        setStats({ ...current });
        
        if (completed) {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    };
    
    animateStats();
  }, []);
  
  const handleApproveEvent = (id) => {
    setEventApprovals(
      eventApprovals.map((event) =>
        event.id === id ? { ...event, status: "approved" } : event
      )
    );
    
    toast({
      title: "Event approved",
      description: "The event has been approved and published.",
    });
  };
  
  const handleRejectEvent = (id) => {
    setEventApprovals(
      eventApprovals.map((event) =>
        event.id === id ? { ...event, status: "rejected" } : event
      )
    );
    
    toast({
      title: "Event rejected",
      description: "The event has been rejected.",
    });
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Overview of all events, users, and analytics
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-srm-green text-white hover:bg-srm-green-dark">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500 dark:text-gray-400 font-normal">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{stats.totalEvents}</div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8% increase
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  vs last month
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500 dark:text-gray-400 font-normal">
                Active Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{stats.activeEvents}</div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12% increase
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  vs last month
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500 dark:text-gray-400 font-normal">
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{stats.pendingApprovals}</div>
                <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <AlarmClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-orange-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  3 new
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  since yesterday
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-500 dark:text-gray-400 font-normal">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  15% increase
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  vs last month
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Event Analytics</CardTitle>
              <CardDescription>
                Registration trends over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="h-48 w-48 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  Analytics chart would render here in production
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Event Distribution</CardTitle>
              <CardDescription>
                Events by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <BarChart className="h-48 w-48 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  Chart would render here in production
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Events and Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Recent event submissions awaiting approval
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                        Organizer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {eventApprovals.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {event.submittedBy}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {event.organizer}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.status === "pending" ? (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                              Pending
                            </Badge>
                          ) : event.status === "approved" ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                              Approved
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800">
                              Rejected
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {event.status === "pending" && (
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                className="bg-srm-green text-white hover:bg-srm-green-dark"
                                onClick={() => handleApproveEvent(event.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700"
                                onClick={() => handleRejectEvent(event.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                          {event.status !== "pending" && (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center py-4">
              <Button variant="link">View All Pending Approvals</Button>
            </CardFooter>
          </Card>
          
          {/* Recent Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>
                Overview of recent and upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {mockRecentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          <Clock className="h-4 w-4 ml-3 mr-1" />
                          9:00 AM
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm font-medium">
                          <Users className="h-4 w-4 mr-1" />
                          {event.registrations}/{event.capacity}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Percent className="h-4 w-4 mr-1" />
                          {Math.round((event.registrations / event.capacity) * 100)}% filled
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center">
                    <Button variant="link">View All Active Events</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="upcoming">
                  <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                    <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400 dark:text-gray-600" />
                    <p>No upcoming events to display</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="past">
                  <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                    <Clock className="h-12 w-12 mx-auto mb-2 text-gray-400 dark:text-gray-600" />
                    <p>No past events to display</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
