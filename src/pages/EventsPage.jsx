
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Calendar, Users, X, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import EventCard from "@/components/EventCard";

// Mock data for events
const mockAllEvents = [
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
    organizer: "School of Engineering"
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
    organizer: "Student Council"
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
    organizer: "Department of Physical Education"
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
    organizer: "Computer Science Department"
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
    organizer: "Training & Placement Cell"
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
    organizer: "Research Department"
  },
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

// Mock past events
const mockPastEvents = [
  {
    id: 101,
    title: "Hackathon 2024",
    description: "A 24-hour coding competition where students solved real-world problems using technology.",
    date: "2024-11-15",
    time: "09:00 AM",
    location: "Computer Science Block",
    bannerImage: "https://srmap.edu.in/wp-content/uploads/2022/03/SRM-AP-Commemorates-International-Womens-Day-2022.jpg",
    categories: ["Technical", "Competition", "Coding"],
    registeredCount: 200,
    maxAttendees: 200,
    organizer: "School of Computing"
  },
  {
    id: 102,
    title: "Annual Sports Meet 2024",
    description: "The annual sports competition featuring athletics, cricket, football, and more.",
    date: "2024-12-10",
    time: "08:00 AM",
    location: "University Sports Ground",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.IBHIKR-9dQIEuo0o-ydSawHaE7&pid=Api&P=0&h=180",
    categories: ["Sports", "Competition", "Athletics"],
    registeredCount: 500,
    maxAttendees: 500,
    organizer: "Department of Physical Education"
  },
];

// Mock registered events
const mockRegisteredEvents = [
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
    organizer: "School of Engineering"
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
    organizer: "Student Council"
  },
];

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(mockAllEvents);
  
  // All available categories from events
  const allCategories = [...new Set(mockAllEvents.flatMap(event => event.categories))].sort();
  
  // Filter events based on search query and selected categories
  useEffect(() => {
    const filtered = mockAllEvents.filter(event => {
      const matchesSearch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.some(cat => event.categories.includes(cat));
      
      return matchesSearch && matchesCategories;
    });
    
    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategories]);
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Events</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and register for events happening at SRM University AP
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events, categories, organizers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex gap-2 items-center"
            >
              <Filter className="h-5 w-5" />
              Filters
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedCategories.length}
                </Badge>
              )}
            </Button>
            <Link to="/dashboard/create-event">
              <Button className="bg-srm-green text-white hover:bg-srm-green-dark whitespace-nowrap">
                Create Event
              </Button>
            </Link>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filter Events</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-500 text-sm"
                >
                  Clear all filters
                </Button>
              </div>
              
              <div>
                <Label className="mb-2 block">Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedCategories.includes(category)
                          ? "bg-srm-green text-white hover:bg-srm-green-dark"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                      {selectedCategories.includes(category) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="date-filter" className="mb-2 block">Date Range</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <Input type="date" id="date-filter" className="w-full" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="venue-filter" className="mb-2 block">Venue</Label>
                  <Input
                    type="text"
                    id="venue-filter"
                    placeholder="Enter venue name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="organizer-filter" className="mb-2 block">Organizer</Label>
                  <Input
                    type="text"
                    id="organizer-filter"
                    placeholder="Enter organizer name"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="flex gap-2 items-center">
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="registered" className="flex gap-2 items-center">
              <Bookmark className="h-4 w-4" />
              My Registrations
            </TabsTrigger>
            <TabsTrigger value="past" className="flex gap-2 items-center">
              <Users className="h-4 w-4" />
              Past Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try changing your search or filter criteria
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="registered" className="mt-0">
            {mockRegisteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRegisteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No registered events</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You haven't registered for any events yet
                </p>
                <Link to="/events">
                  <Button>Browse Events</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            {mockPastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No past events</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  There are no past events to display
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsPage;
