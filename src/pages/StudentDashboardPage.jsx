
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import mockMongoDBConnection from "@/utils/dbConnection";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  TicketIcon,
  Bookmark,
  GraduationCap,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Get events from mock MongoDB
        console.log("Fetching events from MongoDB...");
        const events = await mockMongoDBConnection.findEvents({ status: 'approved' });
        
        // Sort by date (newest first)
        const sortedEvents = events
          .filter(event => new Date(event.date) >= new Date()) // Only future events
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setUpcomingEvents(sortedEvents.slice(0, 4)); // Get first 4 upcoming events
        
        // Load registered events for this user (in a real app, this would be a separate API call)
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        const userTickets = tickets.filter(ticket => ticket.userId === user.id);
        
        // Get registered event details
        const userEventIds = userTickets.map(ticket => ticket.eventId);
        const userRegisteredEvents = events.filter(event => userEventIds.includes(event.id));
        
        setRegisteredEvents(userRegisteredEvents);
        console.log("Data loaded from MongoDB successfully");
      } catch (error) {
        console.error("Error loading events:", error);
        toast({
          title: "Failed to load events",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [toast, user.id]);

  const handleRegisterForEvent = async (eventId) => {
    try {
      // Check if user is already registered
      const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const alreadyRegistered = tickets.some(
        ticket => ticket.eventId === eventId && ticket.userId === user.id
      );
      
      if (alreadyRegistered) {
        toast({
          title: "Already Registered",
          description: "You are already registered for this event",
          variant: "info",
        });
        return;
      }
      
      // Try to register
      await mockMongoDBConnection.registerForEvent(eventId, user.id);
      
      toast({
        title: "Registration Successful!",
        description: "You have successfully registered for this event. Check your tickets section.",
        variant: "success",
      });
      
      // Refresh events to update registration count
      const events = await mockMongoDBConnection.findEvents({ status: 'approved' });
      const sortedEvents = events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      setUpcomingEvents(sortedEvents.slice(0, 4));
      
      // Update registered events
      const updatedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      const userTickets = updatedTickets.filter(ticket => ticket.userId === user.id);
      const userEventIds = userTickets.map(ticket => ticket.eventId);
      const userRegisteredEvents = events.filter(event => userEventIds.includes(event.id));
      setRegisteredEvents(userRegisteredEvents);
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {user.name}! Stay updated with campus events.
        </p>
      </div>
      
      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-scale transition-all duration-300 border-t-4 border-t-srm-green">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Events</CardTitle>
            <TicketIcon className="h-4 w-4 text-srm-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registeredEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              {registeredEvents.filter(e => new Date(e.date) >= new Date()).length} upcoming, 
              {registeredEvents.filter(e => new Date(e.date) < new Date()).length} past
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/tickets" className="w-full">
              <Button variant="outline" size="sm" className="w-full group">
                <TicketIcon className="h-4 w-4 mr-2 group-hover:text-srm-green" />
                View Your Tickets
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale transition-all duration-300 border-t-4 border-t-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Computer Science</div>
            <p className="text-xs text-muted-foreground">Year {user.yearOfStudy || 2}</p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/profile" className="w-full">
              <Button variant="outline" size="sm" className="w-full group">
                <Tag className="h-4 w-4 mr-2 group-hover:text-purple-500" />
                Update Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="hover-scale transition-all duration-300 border-t-4 border-t-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campus Events</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length || 0}</div>
            <p className="text-xs text-muted-foreground">Upcoming events</p>
          </CardContent>
          <CardFooter>
            <Link to="/events" className="w-full">
              <Button variant="outline" size="sm" className="w-full group">
                <MapPin className="h-4 w-4 mr-2 group-hover:text-blue-500" />
                Browse All Events
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Upcoming Events */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-srm-green mr-2" />
            <h2 className="text-xl font-bold">Upcoming Events</h2>
          </div>
          <Link to="/events">
            <Button variant="link" className="text-srm-green hover:text-srm-green-dark transition-colors">
              View All
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-40">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden group hover:shadow-md transition-all duration-300 border border-gray-200">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-srm-green transition-colors duration-300">{event.title}</CardTitle>
                    <Badge className="bg-srm-green hover:bg-srm-green-dark transition-colors">{event.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-srm-green" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-srm-green" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-srm-green" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-srm-green" />
                      <span>{event.registrations} / {event.capacity} registered</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to={`/events/${event.id}`}>
                    <Button variant="outline" className="group-hover:border-srm-green group-hover:text-srm-green transition-colors">
                      <Bookmark className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    className="bg-srm-green hover:bg-srm-green-dark text-white transition-colors"
                    onClick={() => handleRegisterForEvent(event.id)}
                  >
                    <TicketIcon className="h-4 w-4 mr-2" />
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center border-dashed border-2 border-gray-300">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No upcoming events</h3>
            <p className="text-gray-500 mt-2 mb-4">
              Check back later for new events or browse all events
            </p>
            <Link to="/events">
              <Button className="bg-srm-green hover:bg-srm-green-dark text-white transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Browse All Events
              </Button>
            </Link>
          </Card>
        )}
      </div>
      
      {/* Notifications */}
      <Card className="overflow-hidden border-t-4 border-t-orange-400">
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-orange-400 mr-2" />
            <CardTitle>Recent Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4 p-3 bg-orange-50 rounded-md">
            <div className="bg-orange-100 rounded-full p-2">
              <Bell className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="font-medium text-sm">New Event Alert</p>
              <p className="text-sm text-gray-600">Technical Symposium 2025 has been announced!</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-3 bg-blue-50 rounded-md">
            <div className="bg-blue-100 rounded-full p-2">
              <TicketIcon className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-sm">Registration Deadline</p>
              <p className="text-sm text-gray-600">Deadline for Web Development Workshop is tomorrow.</p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
            View All Notifications
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentDashboardPage;
