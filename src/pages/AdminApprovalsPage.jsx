
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
  Eye,
  User,
  Clock,
  FileText
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Mock approval requests data
const mockApprovalRequests = [
  {
    id: "apr1",
    type: "event",
    title: "Technical Symposium 2023",
    requester: "Sarah Wilson",
    requesterRole: "organizer",
    department: "Computer Science",
    status: "pending",
    submittedAt: "2023-10-01T09:42:00",
    details: {
      description: "A two-day technical symposium featuring workshops, coding competitions, and guest lectures from industry experts.",
      expectedAttendees: 350,
      venue: "Main Auditorium",
      budget: 45000,
      startDate: "2023-11-15",
      endDate: "2023-11-16"
    }
  },
  {
    id: "apr2",
    type: "venue",
    title: "New Amphitheater Booking",
    requester: "John Roberts",
    requesterRole: "organizer",
    department: "Cultural Committee",
    status: "pending",
    submittedAt: "2023-10-02T14:35:00",
    details: {
      description: "Booking request for the new amphitheater for the annual cultural fest.",
      date: "2023-12-05",
      duration: "4 hours",
      attendees: 500,
      requirements: "Sound system, lighting, seating arrangements"
    }
  },
  {
    id: "apr3",
    type: "budget",
    title: "Tech Club Funding Request",
    requester: "Michael Brown",
    requesterRole: "organizer",
    department: "Electronics Department",
    status: "pending",
    submittedAt: "2023-09-28T11:20:00",
    details: {
      description: "Request for additional funding for the upcoming robotics workshop.",
      currentBudget: 15000,
      requestedAmount: 25000,
      justification: "Need to purchase additional components and tools for participants.",
      eventDate: "2023-11-10"
    }
  },
  {
    id: "apr4",
    type: "guest",
    title: "Industry Expert Invitation",
    requester: "Emily Davis",
    requesterRole: "faculty",
    department: "Computer Science",
    status: "pending",
    submittedAt: "2023-10-03T10:15:00",
    details: {
      description: "Approval request to invite an industry expert for a guest lecture.",
      guestName: "Dr. Alan Johnson",
      organization: "Google AI Research",
      topic: "Recent Advances in Artificial Intelligence",
      proposedDate: "2023-11-20",
      honorarium: 15000
    }
  },
  {
    id: "apr5",
    type: "event",
    title: "Startup Bootcamp",
    requester: "Thomas Harris",
    requesterRole: "organizer",
    department: "Business School",
    status: "approved",
    submittedAt: "2023-09-25T13:45:00",
    approvedAt: "2023-09-26T09:30:00",
    approvedBy: "Admin User",
    details: {
      description: "A week-long bootcamp for students interested in entrepreneurship and startups.",
      expectedAttendees: 120,
      venue: "Business School Seminar Hall",
      budget: 35000,
      startDate: "2023-10-16",
      endDate: "2023-10-22"
    }
  },
  {
    id: "apr6",
    type: "budget",
    title: "Sports Day Additional Funding",
    requester: "Robert Johnson",
    requesterRole: "faculty",
    department: "Physical Education",
    status: "rejected",
    submittedAt: "2023-09-20T15:10:00",
    rejectedAt: "2023-09-22T11:25:00",
    rejectedBy: "Admin User",
    rejectionReason: "Budget constraints for the current quarter. Please resubmit with reduced amount.",
    details: {
      description: "Request for additional funding for Annual Sports Day.",
      currentBudget: 50000,
      requestedAmount: 75000,
      justification: "Need to accommodate more participants and events.",
      eventDate: "2023-10-30"
    }
  },
];

const AdminApprovalsPage = () => {
  const [approvalRequests, setApprovalRequests] = useState(mockApprovalRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState(null);
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

  const getTypeIcon = (type) => {
    switch (type) {
      case "event":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "venue":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "budget":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "guest":
        return <User className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const approveRequest = (requestId) => {
    setApprovalRequests(approvalRequests.map(req => {
      if (req.id === requestId) {
        const updatedRequest = {
          ...req,
          status: "approved",
          approvedAt: new Date().toISOString(),
          approvedBy: "Admin User"
        };
        
        // If we are viewing this request, update the selected request too
        if (selectedRequest && selectedRequest.id === requestId) {
          setSelectedRequest(updatedRequest);
        }
        
        toast({
          title: "Request approved",
          description: `${req.title} has been approved successfully`,
          variant: "success",
        });
        
        return updatedRequest;
      }
      return req;
    }));
  };

  const rejectRequest = (requestId, reason = "Request does not meet necessary criteria.") => {
    setApprovalRequests(approvalRequests.map(req => {
      if (req.id === requestId) {
        const updatedRequest = {
          ...req,
          status: "rejected",
          rejectedAt: new Date().toISOString(),
          rejectedBy: "Admin User",
          rejectionReason: reason
        };
        
        // If we are viewing this request, update the selected request too
        if (selectedRequest && selectedRequest.id === requestId) {
          setSelectedRequest(updatedRequest);
        }
        
        toast({
          title: "Request rejected",
          description: `${req.title} has been rejected`,
          variant: "destructive",
        });
        
        return updatedRequest;
      }
      return req;
    }));
  };

  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  // Filter approval requests based on search term, type, and status
  const filteredRequests = approvalRequests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.requester.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || req.type === typeFilter;
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Approval Requests</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search requests..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="venue">Venue</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id} className={selectedRequest?.id === request.id ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">
                        <button 
                          className="text-left hover:text-blue-600 transition-colors"
                          onClick={() => viewRequestDetails(request)}
                        >
                          {request.title}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(request.type)}
                          <span className="capitalize">{request.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{request.requester}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span>{new Date(request.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => viewRequestDetails(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {request.status === "pending" && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-green-600 hover:text-green-700"
                                onClick={() => approveRequest(request.id)}
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => rejectRequest(request.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <div className="flex flex-col items-center">
                        <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-lg font-medium">No requests found</p>
                        <p className="text-sm text-gray-500">
                          {searchTerm 
                            ? "Try adjusting your search or filters" 
                            : "There are no approval requests matching your criteria"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div>
          {selectedRequest ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Request Details</span>
                  {getStatusBadge(selectedRequest.status)}
                </CardTitle>
                <CardDescription>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(selectedRequest.type)}
                    <span className="capitalize">{selectedRequest.type} Request</span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedRequest.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Submitted by {selectedRequest.requester} ({selectedRequest.requesterRole}) from {selectedRequest.department}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(selectedRequest.submittedAt)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Details</h4>
                  <p className="text-sm">{selectedRequest.details.description}</p>
                  
                  <div className="pt-2 space-y-2 text-sm">
                    {selectedRequest.type === "event" && (
                      <>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{selectedRequest.details.startDate} to {selectedRequest.details.endDate}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Venue:</span>
                          <span>{selectedRequest.details.venue}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Expected Attendees:</span>
                          <span>{selectedRequest.details.expectedAttendees}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Budget:</span>
                          <span>₹{selectedRequest.details.budget}</span>
                        </div>
                      </>
                    )}
                    
                    {selectedRequest.type === "venue" && (
                      <>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{selectedRequest.details.date}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{selectedRequest.details.duration}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Attendees:</span>
                          <span>{selectedRequest.details.attendees}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Requirements:</span>
                          <span>{selectedRequest.details.requirements}</span>
                        </div>
                      </>
                    )}
                    
                    {selectedRequest.type === "budget" && (
                      <>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Current Budget:</span>
                          <span>₹{selectedRequest.details.currentBudget}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Requested Amount:</span>
                          <span>₹{selectedRequest.details.requestedAmount}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Event Date:</span>
                          <span>{selectedRequest.details.eventDate}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Justification:</span>
                          <span>{selectedRequest.details.justification}</span>
                        </div>
                      </>
                    )}
                    
                    {selectedRequest.type === "guest" && (
                      <>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Guest Name:</span>
                          <span>{selectedRequest.details.guestName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Organization:</span>
                          <span>{selectedRequest.details.organization}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Topic:</span>
                          <span>{selectedRequest.details.topic}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Proposed Date:</span>
                          <span>{selectedRequest.details.proposedDate}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <span className="text-muted-foreground">Honorarium:</span>
                          <span>₹{selectedRequest.details.honorarium}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {selectedRequest.status === "approved" && (
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm font-medium text-green-800">Approved</p>
                    <p className="text-xs text-green-700">
                      Approved by {selectedRequest.approvedBy} on {formatDate(selectedRequest.approvedAt)}
                    </p>
                  </div>
                )}
                
                {selectedRequest.status === "rejected" && (
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <p className="text-sm font-medium text-red-800">Rejected</p>
                    <p className="text-xs text-red-700">
                      Rejected by {selectedRequest.rejectedBy} on {formatDate(selectedRequest.rejectedAt)}
                    </p>
                    <p className="text-xs mt-1 text-red-700">
                      Reason: {selectedRequest.rejectionReason}
                    </p>
                  </div>
                )}
              </CardContent>
              
              {selectedRequest.status === "pending" && (
                <div className="flex justify-end gap-2 p-4 border-t">
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => rejectRequest(selectedRequest.id)}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => approveRequest(selectedRequest.id)}
                  >
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 flex flex-col items-center text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Eye className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No request selected</h3>
                <p className="text-sm text-muted-foreground">
                  Select a request from the list to view its details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApprovalsPage;
