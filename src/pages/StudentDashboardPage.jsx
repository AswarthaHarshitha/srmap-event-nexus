
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
  TicketIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Get events from mock MongoDB
        const events = await mockMongoDBConnection.findEvents({ status: 'approved' });
        // Sort by date (newest first)
        const sortedEvents = events
          .filter(event => new Date(event.date) >= new Date()) // Only future events
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setUpcomingEvents(sortedEvents.slice(0, 4)); // Get first 4 upcoming events
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
  }, [toast]);

  const handleRegisterForEvent = async (eventId) => {
    try {
      await mockMongoDBConnection.registerForEvent(eventId, user.id);
      
      toast({
        title: "Registration Successful!",
        description: "You have successfully registered for this event",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <p className="text-gray-500">
          Welcome back, {user.name}! Stay updated with campus events.
        </p>
      </div>
      
      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Events</CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 upcoming, 1 past</p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/tickets" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                View Your Tickets
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Computer Science</div>
            <p className="text-xs text-muted-foreground">Year {user.yearOfStudy || 2}</p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/profile" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Update Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campus Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length || 0}</div>
            <p className="text-xs text-muted-foreground">Upcoming events</p>
          </CardContent>
          <CardFooter>
            <Link to="/events" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Browse All Events
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Upcoming Events */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <Link to="/events">
            <Button variant="link" className="text-srm-green">
              View All
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-srm-green"></div>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge className="bg-srm-green">{event.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{event.registrations} / {event.capacity} registered</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to={`/events/${event.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                  <Button 
                    className="bg-srm-green hover:bg-srm-green-dark" 
                    onClick={() => handleRegisterForEvent(event.id)}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No upcoming events</h3>
            <p className="text-gray-500 mt-2 mb-4">
              Check back later for new events or browse all events
            </p>
            <Link to="/events">
              <Button className="bg-srm-green hover:bg-srm-green-dark">
                Browse All Events
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
