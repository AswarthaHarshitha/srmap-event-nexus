
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  X, 
  Edit, 
  Trash, 
  Download,
  BarChart
} from "lucide-react";

// Mock events data
const mockEvents = [
  {
    id: "evt1",
    title: "Web Development Workshop",
    description: "Learn the basics of web development with HTML, CSS, and JavaScript",
    date: "2023-10-15",
    time: "10:00 AM - 12:00 PM",
    location: "Main Auditorium, Block 1",
    category: "Tech",
    status: "approved",
    registrations: 87,
    capacity: 100,
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
  },
  {
    id: "evt2",
    title: "Entrepreneurship Summit",
    description: "Connect with successful entrepreneurs and learn from their experiences",
    date: "2023-11-05",
    time: "09:00 AM - 05:00 PM",
    location: "Convention Center",
    category: "Business",
    status: "pending",
    registrations: 0,
    capacity: 150,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: "evt3",
    title: "Cultural Fest 2023",
    description: "Annual cultural festival featuring music, dance, and art performances",
    date: "2023-12-10",
    time: "06:00 PM - 10:00 PM",
    location: "University Ground",
    category: "Cultural",
    status: "rejected",
    registrations: 0,
    capacity: 1000,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const OrganizerEventsPage = () => {
  const [events, setEvents] = useState(mockEvents);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted",
      variant: "success",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending Approval</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getEventsByStatus = (status) => {
    if (status === "all") return events;
    return events.filter(event => event.status === status);
  };

  const handleDownloadAttendees = (eventId) => {
    toast({
      title: "Downloading Attendee List",
      description: "The attendee list will be downloaded shortly",
      variant: "info",
    });
  };

  const handleViewAnalytics = (eventId) => {
    toast({
      title: "Event Analytics",
      description: "This feature is coming soon!",
      variant: "info",
    });
  };

  const currentEvents = getEventsByStatus(activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>
        <Link to="/organizer/create-event">
          <Button className="bg-srm-green hover:bg-srm-green-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Event
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {currentEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{event.time}</span>
                      </div>
                      
                      {event.status === "approved" && (
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{event.registrations} / {event.capacity} registrations</span>
                        </div>
                      )}
                      
                      {event.status === "rejected" && (
                        <div className="flex items-center text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span>Contact admin for details</span>
                        </div>
                      )}
                      
                      {event.status === "pending" && (
                        <div className="flex items-center text-sm text-yellow-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Awaiting approval</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                    {event.status === "approved" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadAttendees(event.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Attendees
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewAnalytics(event.id)}
                        >
                          <BarChart className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      </>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="ml-auto"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-gray-500 mt-2">
                {activeTab === "all" 
                  ? "You haven't created any events yet" 
                  : `You don't have any ${activeTab} events`}
              </p>
              <Link to="/organizer/create-event">
                <Button className="mt-4 bg-srm-green hover:bg-srm-green-dark">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Event
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizerEventsPage;
