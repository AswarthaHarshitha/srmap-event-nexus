
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAIAssistant } from "@/contexts/AIAssistantContext";
import { useAuth } from "@/contexts/AuthContext";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  Filter, 
  MapPin, 
  Tag, 
  Sparkles,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for events (would fetch from backend in real app)
const allEvents = [
  {
    id: 1,
    title: "Annual Technical Symposium 2025",
    description: "Join us for the largest technical symposium at SRM University AP. Featuring workshops, hackathons, and exciting competitions with amazing prizes.",
    date: "2025-05-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.GLZf5sSo6jCaZ8wwA50MFAHaEn&pid=Api&P=0&h=180",
    categories: ["Technical", "Workshop", "Competition"],
    registeredCount: 215,
    maxAttendees: 500,
    organizer: "School of Engineering",
    coordinates: {
      lat: 16.4500,
      lng: 80.6215
    }
  },
  {
    id: 2,
    title: "Cultural Fest 2025",
    description: "Experience the vibrant cultural diversity at SRM University AP's annual cultural fest. Music, dance, art, and food from different parts of India.",
    date: "2025-06-20",
    time: "10:00 AM",
    location: "University Ground",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.GHpnHycbcfHyotjmH_ZxIgHaDt&pid=Api&P=0&h=180",
    categories: ["Cultural", "Entertainment", "Art"],
    registeredCount: 450,
    maxAttendees: 1000,
    organizer: "Student Council",
    coordinates: {
      lat: 16.4505,
      lng: 80.6220
    }
  },
  {
    id: 3,
    title: "Sports Tournament 2025",
    description: "Annual inter-college sports tournament with competitions in cricket, football, basketball, volleyball, and athletics. Show your sporting spirit!",
    date: "2025-07-10",
    time: "08:00 AM",
    location: "Sports Complex",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.IBHIKR-9dQIEuo0o-ydSawHaE7&pid=Api&P=0&h=180",
    categories: ["Sports", "Tournament", "Athletics"],
    registeredCount: 320,
    maxAttendees: 600,
    organizer: "Department of Physical Education",
    coordinates: {
      lat: 16.4510,
      lng: 80.6225
    }
  },
  {
    id: 4,
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop on the latest AI and ML technologies, featuring sessions by industry experts.",
    date: "2025-05-25",
    time: "10:00 AM",
    location: "Computer Science Block",
    bannerImage: "https://blog.srmap.edu.in/wp-content/uploads/2023/01/IMG-20230126-WA0019.jpg",
    categories: ["Technical", "Workshop", "AI"],
    registeredCount: 85,
    maxAttendees: 150,
    organizer: "Computer Science Department",
    coordinates: {
      lat: 16.4515,
      lng: 80.6230
    }
  },
  {
    id: 5,
    title: "Career Development Seminar",
    description: "Learn about career opportunities, resume building, and interview skills from HR professionals.",
    date: "2025-06-05",
    time: "02:00 PM",
    location: "Management Block, Room 302",
    bannerImage: "https://srmap.edu.in/wp-content/uploads/2022/12/AICSSYC.jpeg",
    categories: ["Career", "Seminar", "Development"],
    registeredCount: 120,
    maxAttendees: 200,
    organizer: "Training & Placement Cell",
    coordinates: {
      lat: 16.4520,
      lng: 80.6235
    }
  },
  {
    id: 6,
    title: "Research Expo 2025",
    description: "Exhibition of research projects by students and faculty. Opportunity to showcase your innovations.",
    date: "2025-06-15",
    time: "09:30 AM",
    location: "Research Complex",
    bannerImage: "https://srmap.edu.in/wp-content/uploads/2022/03/Researchers-Day-2.jpg",
    categories: ["Research", "Exhibition", "Innovation"],
    registeredCount: 65,
    maxAttendees: 150,
    organizer: "Research Department",
    coordinates: {
      lat: 16.4525,
      lng: 80.6240
    }
  }
];

// Past events
const pastEvents = [
  {
    id: 101,
    title: "TechFest 2024",
    description: "Annual technical festival with competitions, workshops, and talks by industry experts.",
    date: "2024-12-10",
    time: "09:00 AM",
    location: "Main Auditorium",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.GLZf5sSo6jCaZ8wwA50MFAHaEn&pid=Api&P=0&h=180",
    categories: ["Technical", "Festival"],
    registeredCount: 500,
    maxAttendees: 500,
    organizer: "Student Technical Council"
  },
  {
    id: 102,
    title: "Annual Sports Meet",
    description: "Athletic competitions between departments with medals and trophies.",
    date: "2024-11-15",
    time: "08:00 AM",
    location: "Sports Ground",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.IBHIKR-9dQIEuo0o-ydSawHaE7&pid=Api&P=0&h=180",
    categories: ["Sports", "Competition"],
    registeredCount: 350,
    maxAttendees: 400,
    organizer: "Department of Physical Education"
  }
];

// Mock registered events (for the logged-in user)
const myRegistrations = [
  {
    id: 2,
    title: "Cultural Fest 2025",
    description: "Experience the vibrant cultural diversity at SRM University AP's annual cultural fest. Music, dance, art, and food from different parts of India.",
    date: "2025-06-20",
    time: "10:00 AM",
    location: "University Ground",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.GHpnHycbcfHyotjmH_ZxIgHaDt&pid=Api&P=0&h=180",
    categories: ["Cultural", "Entertainment", "Art"],
    registeredCount: 450,
    maxAttendees: 1000,
    organizer: "Student Council",
    ticketId: "CULT2025-1234"
  },
  {
    id: 4,
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop on the latest AI and ML technologies, featuring sessions by industry experts.",
    date: "2025-05-25",
    time: "10:00 AM",
    location: "Computer Science Block",
    bannerImage: "https://blog.srmap.edu.in/wp-content/uploads/2023/01/IMG-20230126-WA0019.jpg",
    categories: ["Technical", "Workshop", "AI"],
    registeredCount: 85,
    maxAttendees: 150,
    organizer: "Computer Science Department",
    ticketId: "AIML2025-5678"
  }
];

// Get all unique categories from events
const allCategories = [...new Set([
  ...allEvents.flatMap(event => event.categories),
  ...pastEvents.flatMap(event => event.categories)
])];

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [showAiRecommendations, setShowAiRecommendations] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getRecommendations } = useAIAssistant();
  
  // Get recommendations from AI
  useEffect(() => {
    const loadRecommendations = async () => {
      const recs = await getRecommendations();
      setAiRecommendations(recs);
    };
    
    loadRecommendations();
  }, [getRecommendations]);
  
  // Filter events based on search term, categories, location, and date
  useEffect(() => {
    let eventsList = [];
    
    // Determine which events to show based on active tab
    if (activeTab === "upcoming") {
      eventsList = [...allEvents];
    } else if (activeTab === "registered") {
      eventsList = [...myRegistrations];
    } else if (activeTab === "past") {
      eventsList = [...pastEvents];
    }
    
    // Apply filters
    let filtered = eventsList.filter(event => {
      // Search term filter
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategories = 
        selectedCategories.length === 0 ||
        selectedCategories.some(cat => event.categories.includes(cat));
      
      // Location filter
      const matchesLocation = 
        !locationFilter ||
        event.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      // Date filter
      const matchesDate = !dateFilter || event.date === dateFilter;
      
      return matchesSearch && matchesCategories && matchesLocation && matchesDate;
    });
    
    setFilteredEvents(filtered);
  }, [activeTab, searchTerm, selectedCategories, locationFilter, dateFilter]);
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setLocationFilter("");
    setDateFilter("");
  };
  
  const handleCreateEvent = () => {
    navigate("/dashboard/create-event");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find and join exciting events happening at SRM University
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="mr-2"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {(selectedCategories.length > 0 || locationFilter || dateFilter) && (
              <Badge className="ml-2 bg-srm-green" variant="secondary">
                {selectedCategories.length + (locationFilter ? 1 : 0) + (dateFilter ? 1 : 0)}
              </Badge>
            )}
          </Button>
          <Button 
            onClick={handleCreateEvent}
            className="bg-srm-green hover:bg-srm-green-dark"
          >
            Create Event
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search events, categories, or organizers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* AI Recommendations */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => setShowAiRecommendations(!showAiRecommendations)}
          className="flex items-center text-srm-green"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {showAiRecommendations ? "Hide AI Recommendations" : "Show AI Recommendations"}
        </Button>
        
        {showAiRecommendations && (
          <div className="mt-4 p-4 bg-gradient-to-r from-srm-green/5 to-srm-gold/5 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Recommended For You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiRecommendations.map(rec => (
                <div 
                  key={rec.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/events/${rec.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <Badge className="bg-srm-gold text-black">{rec.matchScore}% Match</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    {rec.date}
                  </p>
                  <p className="text-xs mt-2 text-gray-600">
                    <Sparkles className="inline h-3 w-3 mr-1 text-srm-gold" />
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Filter Events</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="inline mr-2 h-4 w-4" />
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <Badge 
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategories.includes(category) 
                        ? 'bg-srm-green hover:bg-srm-green-dark' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="inline mr-2 h-4 w-4" />
                Location
              </label>
              <Input
                type="text"
                placeholder="Filter by location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline mr-2 h-4 w-4" />
                Date
              </label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          {isAuthenticated && (
            <TabsTrigger value="registered">My Registrations</TabsTrigger>
          )}
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No events found matching your criteria</p>
              <Button variant="link" onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </TabsContent>
        
        {isAuthenticated && (
          <TabsContent value="registered" className="mt-6">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} isRegistered={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">You haven't registered for any events yet</p>
                <Button variant="link" onClick={() => setActiveTab("upcoming")}>Browse events</Button>
              </div>
            )}
          </TabsContent>
        )}
        
        <TabsContent value="past" className="mt-6">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No past events found matching your criteria</p>
              <Button variant="link" onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
