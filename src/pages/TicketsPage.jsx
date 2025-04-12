
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import TicketCard from "@/components/TicketCard";

// Mock data for tickets
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
      organizer: "School of Engineering",
      description: "Join us for the largest technical symposium at SRM University AP.",
      categories: ["Technical", "Workshop", "Competition"],
    },
    qrCode: "1001-SYMPOSIUM-2025",
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
      organizer: "Student Council",
      description: "Experience the vibrant cultural diversity at SRM University AP.",
      categories: ["Cultural", "Entertainment", "Art"],
    },
    qrCode: "1002-CULTURAL-2025",
    status: "valid",
    seat: "VIP"
  },
  {
    id: 3,
    eventId: 3,
    ticketId: "TKT-1003",
    event: {
      title: "Workshop on AI & ML",
      date: "2025-04-15",
      time: "10:00 AM",
      location: "Computer Science Block",
      organizer: "Department of Computer Science",
      description: "Learn the fundamentals of AI and Machine Learning.",
      categories: ["Technical", "Workshop", "AI"],
    },
    qrCode: "1003-AIML-WORKSHOP-2025",
    status: "used",
    seat: "General"
  },
  {
    id: 4,
    eventId: 4,
    ticketId: "TKT-1004",
    event: {
      title: "Photography Contest",
      date: "2025-03-20",
      time: "11:00 AM",
      location: "Arts Block",
      organizer: "Photography Club",
      description: "Showcase your photography skills and win prizes.",
      categories: ["Cultural", "Contest", "Photography"],
    },
    qrCode: "1004-PHOTO-CONTEST-2025",
    status: "cancelled",
    seat: "General"
  }
];

const TicketsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter tickets based on search query and active tab
  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = searchQuery === "" || 
      ticket.event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "valid") return matchesSearch && ticket.status === "valid";
    if (activeTab === "used") return matchesSearch && ticket.status === "used";
    if (activeTab === "cancelled") return matchesSearch && ticket.status === "cancelled";
    
    return matchesSearch;
  });
  
  // Count tickets by status
  const ticketCounts = {
    all: mockTickets.length,
    valid: mockTickets.filter(t => t.status === "valid").length,
    used: mockTickets.filter(t => t.status === "used").length,
    cancelled: mockTickets.filter(t => t.status === "cancelled").length,
  };
  
  const downloadAllTickets = () => {
    alert("This would download all your tickets as PDF in a real application.");
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              My Tickets
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage all your event tickets in one place
            </p>
          </div>
          
          <Button
            onClick={downloadAllTickets}
            variant="outline"
            className="mt-4 md:mt-0 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download All Tickets
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tickets by event name or ticket ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex gap-2 items-center">
                <Filter className="h-5 w-5" />
                Filter
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-4 sm:px-6">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all" className="flex-1 md:flex-none">
                  All Tickets ({ticketCounts.all})
                </TabsTrigger>
                <TabsTrigger value="valid" className="flex-1 md:flex-none">
                  Valid ({ticketCounts.valid})
                </TabsTrigger>
                <TabsTrigger value="used" className="flex-1 md:flex-none">
                  Used ({ticketCounts.used})
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="flex-1 md:flex-none">
                  Cancelled ({ticketCounts.cancelled})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-4 sm:p-6 space-y-6">
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchQuery
                      ? "Try changing your search query"
                      : "You don't have any tickets yet"}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="valid" className="p-4 sm:p-6 space-y-6">
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No valid tickets found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You don't have any upcoming valid tickets
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="used" className="p-4 sm:p-6 space-y-6">
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No used tickets found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You don't have any used tickets
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="p-4 sm:p-6 space-y-6">
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No cancelled tickets found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You don't have any cancelled tickets
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
