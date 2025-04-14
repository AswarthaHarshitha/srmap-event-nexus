
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
  Mail, 
  Calendar, 
  Download, 
  QrCode,
  AlertCircle,
  Filter,
  FileDown,
  User
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock registrations data
const mockRegistrations = [
  {
    id: "reg1",
    eventId: "evt1",
    eventName: "Web Development Workshop",
    studentId: "std1",
    studentName: "Alex Johnson",
    email: "alex.j@srm.edu.in",
    department: "Computer Science",
    registeredOn: "2023-09-20T14:30:00Z",
    status: "confirmed",
    attended: true
  },
  {
    id: "reg2",
    eventId: "evt1",
    eventName: "Web Development Workshop",
    studentId: "std2",
    studentName: "Emma Wilson",
    email: "emma.w@srm.edu.in",
    department: "Information Technology",
    registeredOn: "2023-09-21T09:15:00Z",
    status: "confirmed",
    attended: true
  },
  {
    id: "reg3",
    eventId: "evt1",
    eventName: "Web Development Workshop",
    studentId: "std3",
    studentName: "Ryan Thomas",
    email: "ryan.t@srm.edu.in",
    department: "Computer Science",
    registeredOn: "2023-09-21T11:45:00Z",
    status: "confirmed",
    attended: false
  },
  {
    id: "reg4",
    eventId: "evt2",
    eventName: "Hackathon 2023",
    studentId: "std4",
    studentName: "Sophia Miller",
    email: "sophia.m@srm.edu.in",
    department: "Software Engineering",
    registeredOn: "2023-09-15T10:30:00Z",
    status: "confirmed",
    attended: true
  },
  {
    id: "reg5",
    eventId: "evt2",
    eventName: "Hackathon 2023",
    studentId: "std5",
    studentName: "Daniel Brown",
    email: "daniel.b@srm.edu.in",
    department: "Artificial Intelligence",
    registeredOn: "2023-09-16T16:20:00Z",
    status: "confirmed",
    attended: true
  },
  {
    id: "reg6",
    eventId: "evt3",
    eventName: "AI & Machine Learning Seminar",
    studentId: "std6",
    studentName: "Olivia Garcia",
    email: "olivia.g@srm.edu.in",
    department: "Data Science",
    registeredOn: "2023-09-22T13:10:00Z",
    status: "waitlisted",
    attended: false
  },
  {
    id: "reg7",
    eventId: "evt3",
    eventName: "AI & Machine Learning Seminar",
    studentId: "std7",
    studentName: "William Martinez",
    email: "william.m@srm.edu.in",
    department: "Computer Science",
    registeredOn: "2023-09-23T09:05:00Z",
    status: "cancelled",
    attended: false
  }
];

// Mock events data
const mockEvents = [
  {
    id: "evt1",
    name: "Web Development Workshop",
    date: "2023-10-15",
    capacity: 30,
    registrations: 25,
    completed: true
  },
  {
    id: "evt2",
    name: "Hackathon 2023",
    date: "2023-09-25",
    capacity: 50,
    registrations: 48,
    completed: true
  },
  {
    id: "evt3",
    name: "AI & Machine Learning Seminar",
    date: "2023-11-05",
    capacity: 100,
    registrations: 65,
    completed: false
  },
  {
    id: "evt4",
    name: "Entrepreneurship Talk",
    date: "2023-11-20",
    capacity: 80,
    registrations: 12,
    completed: false
  }
];

const OrganizerRegistrationsPage = () => {
  const [events, setEvents] = useState(mockEvents);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { toast } = useToast();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Confirmed</Badge>;
      case "waitlisted":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Waitlisted</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const downloadRegistrations = () => {
    // In a real application, this would generate a CSV or Excel file
    toast({
      title: "Downloading registrations",
      description: "Registration list is being prepared for download",
      variant: "success",
    });
  };

  const sendEmailToRegistrants = (eventId) => {
    toast({
      title: "Sending emails",
      description: "Preparing to send emails to all registrants",
      variant: "info",
    });
  };

  const markAttendance = (registrationId, attended) => {
    setRegistrations(registrations.map(reg => {
      if (reg.id === registrationId) {
        toast({
          title: attended ? "Attendance marked" : "Attendance unmarked",
          description: `${reg.studentName} marked as ${attended ? 'present' : 'absent'}`,
          variant: "success",
        });
        
        return { ...reg, attended };
      }
      return reg;
    }));
  };

  // Filter registrations based on search term, event, and status
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = eventFilter === "all" || reg.eventId === eventFilter;
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const viewEventRegistrations = (eventId) => {
    setEventFilter(eventId);
    setSelectedEvent(events.find(event => event.id === eventId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Registrations</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={downloadRegistrations}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export List
          </Button>
          <Button 
            onClick={() => sendEmailToRegistrants(eventFilter)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Registrants
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="registrations" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="registrations">All Registrations</TabsTrigger>
          <TabsTrigger value="events">By Event</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registrations">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="waitlisted">Waitlisted</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Registered On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p>{registration.studentName}</p>
                          <p className="text-xs text-muted-foreground">{registration.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{registration.eventName}</TableCell>
                      <TableCell>{registration.department}</TableCell>
                      <TableCell>{new Date(registration.registeredOn).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(registration.status)}</TableCell>
                      <TableCell>
                        {registration.status === "confirmed" && (
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={registration.attended} 
                              onChange={(e) => markAttendance(registration.id, e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-srm-green"
                            />
                            <span className="ml-2 text-sm">
                              {registration.attended ? "Present" : "Absent"}
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              toast({
                                title: "QR Code Generated",
                                description: `QR code for ${registration.studentName} sent to email`,
                                variant: "success",
                              });
                            }}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              toast({
                                title: "Email Sent",
                                description: `Reminder email sent to ${registration.studentName}`,
                                variant: "success",
                              });
                            }}
                          >
                            <Mail className="h-4 w-4" />
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
                        <p className="text-lg font-medium">No registrations found</p>
                        <p className="text-sm text-gray-500">
                          {searchTerm || eventFilter !== "all" || statusFilter !== "all"
                            ? "Try adjusting your search or filters" 
                            : "There are no registrations yet"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map(event => (
              <Card 
                key={event.id} 
                className={`cursor-pointer hover:shadow-md transition ${selectedEvent?.id === event.id ? 'bg-muted/50 border-primary' : ''}`}
                onClick={() => viewEventRegistrations(event.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Registrations</p>
                      <p className="text-2xl font-bold">{event.registrations} / {event.capacity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadRegistrations();
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          sendEmailToRegistrants(event.id);
                        }}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <progress 
                      className="w-full h-2 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-srm-green [&::-webkit-progress-bar]:bg-gray-200" 
                      value={event.registrations} 
                      max={event.capacity} 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedEvent && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedEvent.name} - Registrations</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => downloadRegistrations()}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Export List
                  </Button>
                  <Button 
                    onClick={() => sendEmailToRegistrants(selectedEvent.id)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Registrants
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Registered On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.filter(reg => reg.eventId === selectedEvent.id).length > 0 ? (
                      registrations.filter(reg => reg.eventId === selectedEvent.id).map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p>{registration.studentName}</p>
                              <p className="text-xs text-muted-foreground">{registration.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{registration.department}</TableCell>
                          <TableCell>{new Date(registration.registeredOn).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(registration.status)}</TableCell>
                          <TableCell>
                            {registration.status === "confirmed" && (
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  checked={registration.attended} 
                                  onChange={(e) => markAttendance(registration.id, e.target.checked)}
                                  className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-srm-green"
                                />
                                <span className="ml-2 text-sm">
                                  {registration.attended ? "Present" : "Absent"}
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  toast({
                                    title: "QR Code Generated",
                                    description: `QR code for ${registration.studentName} sent to email`,
                                    variant: "success",
                                  });
                                }}
                              >
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  toast({
                                    title: "Email Sent",
                                    description: `Reminder email sent to ${registration.studentName}`,
                                    variant: "success",
                                  });
                                }}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          <div className="flex flex-col items-center">
                            <User className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-lg font-medium">No registrations for this event</p>
                            <p className="text-sm text-gray-500">There are no students registered for this event yet</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizerRegistrationsPage;
