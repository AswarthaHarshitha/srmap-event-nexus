
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Download,
  Eye,
  Trash
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock events data
const mockEvents = [
  {
    id: "evt1",
    title: "Web Development Workshop",
    organizer: "Computer Science Club",
    date: "2023-10-15",
    category: "Tech",
    status: "approved",
    registrations: 87,
    capacity: 100,
  },
  {
    id: "evt2",
    title: "Entrepreneurship Summit",
    organizer: "SRM Business School",
    date: "2023-11-05",
    category: "Business",
    status: "pending",
    registrations: 0,
    capacity: 150,
  },
  {
    id: "evt3",
    title: "Cultural Fest 2023",
    organizer: "Cultural Committee",
    date: "2023-12-10",
    category: "Cultural",
    status: "rejected",
    registrations: 0,
    capacity: 1000,
  },
  {
    id: "evt4",
    title: "Hackathon 2023",
    organizer: "ACM Chapter",
    date: "2023-09-25",
    category: "Tech",
    status: "approved",
    registrations: 145,
    capacity: 200,
  },
];

const AdminEventsPage = () => {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const approveEvent = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        toast({
          title: "Event approved",
          description: `${event.title} has been approved successfully`,
          variant: "success",
        });
        return { ...event, status: "approved" };
      }
      return event;
    }));
  };

  const rejectEvent = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        toast({
          title: "Event rejected",
          description: `${event.title} has been rejected`,
          variant: "destructive",
        });
        return { ...event, status: "rejected" };
      }
      return event;
    }));
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event deleted",
      description: "The event has been deleted successfully",
      variant: "success",
    });
  };

  const generateReport = (eventId) => {
    toast({
      title: "Report generated",
      description: "Event report is being downloaded",
      variant: "info",
    });
  };

  // Filter events based on search term and status
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <Button 
          onClick={() => {
            toast({
              title: "Generate Complete Report",
              description: "Generating a complete report of all events",
              variant: "info",
            });
          }}
          className="bg-srm-green hover:bg-srm-green-dark"
        >
          <Download className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registrations</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell>{event.registrations} / {event.capacity}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => generateReport(event.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {event.status === "pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => approveEvent(event.id)}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => rejectEvent(event.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-lg font-medium">No events found</p>
                    <p className="text-sm text-gray-500">
                      {searchTerm 
                        ? "Try adjusting your search or filters" 
                        : "There are no events matching your criteria"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminEventsPage;
