
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  User,
  Phone,
  Mail,
  Tag,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Annual Technical Symposium 2025",
    description: "Join us for the largest technical symposium at SRM University AP. Featuring workshops, hackathons, and exciting competitions with amazing prizes. The event aims to showcase the technical talents of students and provide them with a platform to interact with industry experts. There will be multiple tracks including software development, hardware prototyping, AI/ML challenges, and more. Cash prizes worth ₹1,00,000 to be won!",
    shortDescription: "Join us for the largest technical symposium at SRM University AP. Featuring workshops, hackathons, and exciting competitions with amazing prizes.",
    date: "2025-05-15",
    time: "09:00 AM",
    endTime: "06:00 PM",
    location: "Main Auditorium",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.GLZf5sSo6jCaZ8wwA50MFAHaEn&pid=Api&P=0&h=180",
    categories: ["Technical", "Workshop", "Competition"],
    registeredCount: 215,
    maxAttendees: 500,
    organizer: "School of Engineering",
    contactEmail: "symposium@srmap.edu.in",
    contactPhone: "+91 9876543210",
    website: "https://symposium.srmap.edu.in",
    additionalInfo: "Participants are required to bring their own laptops. Food and refreshments will be provided. Registration is mandatory to participate in competitions.",
    images: [
      "https://srmap.edu.in/wp-content/uploads/2022/03/SRM-AP-2022-Engineers-Day.jpg",
      "https://srmap.edu.in/wp-content/uploads/2022/07/robo.jpeg",
      "https://srmap.edu.in/wp-content/uploads/2022/10/event1-1536x1024.jpg"
    ],
    agenda: [
      {
        time: "09:00 AM - 10:00 AM",
        title: "Inauguration & Keynote",
        description: "Opening ceremony and keynote speech by industry leaders"
      },
      {
        time: "10:30 AM - 12:30 PM",
        title: "Technical Workshops",
        description: "Parallel workshops on Web Development, IoT, and Blockchain"
      },
      {
        time: "01:00 PM - 02:00 PM",
        title: "Lunch Break",
        description: "Networking lunch for all participants"
      },
      {
        time: "02:30 PM - 05:30 PM",
        title: "Hackathon & Competitions",
        description: "Coding challenges and project presentations"
      },
      {
        time: "05:30 PM - 06:00 PM",
        title: "Award Ceremony",
        description: "Prize distribution and closing remarks"
      }
    ],
    speakers: [
      {
        name: "Dr. Sunil Kumar",
        designation: "CTO, TechCorp India",
        image: "https://i.pravatar.cc/150?u=speaker1",
        bio: "Dr. Kumar has over 15 years of experience in AI and Machine Learning research."
      },
      {
        name: "Ms. Priya Sharma",
        designation: "Senior Engineer, Google",
        image: "https://i.pravatar.cc/150?u=speaker2",
        bio: "Ms. Sharma leads development teams at Google working on cloud technologies."
      }
    ]
  },
  {
    id: "2",
    title: "Cultural Fest 2025",
    description: "Experience the vibrant cultural diversity at SRM University AP's annual cultural fest. Music, dance, art, and food from different parts of India. The Cultural Fest brings together students from various cultural backgrounds to showcase their talents and traditions. This two-day extravaganza features performances, exhibitions, and competitions that celebrate the rich cultural heritage of India and beyond. Join us for an unforgettable celebration of arts and culture!",
    shortDescription: "Experience the vibrant cultural diversity at SRM University AP's annual cultural fest. Music, dance, art, and food from different parts of India.",
    date: "2025-06-20",
    time: "10:00 AM",
    endTime: "09:00 PM",
    location: "University Ground",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.GHpnHycbcfHyotjmH_ZxIgHaDt&pid=Api&P=0&h=180",
    categories: ["Cultural", "Entertainment", "Art"],
    registeredCount: 450,
    maxAttendees: 1000,
    organizer: "Student Council",
    contactEmail: "culturalfest@srmap.edu.in",
    contactPhone: "+91 9876543211",
    website: "https://culturalfest.srmap.edu.in",
    additionalInfo: "This is a two-day event. Participants can register for multiple competitions. Accommodation can be arranged for outstation participants upon request.",
    images: [
      "https://srmap.edu.in/wp-content/uploads/2022/03/SRM-AP-Commemorates-International-Womens-Day-2022.jpg",
      "https://srmap.edu.in/wp-content/uploads/2022/12/AICSSYC.jpeg",
      "https://srmap.edu.in/wp-content/uploads/2022/03/Researchers-Day-2.jpg"
    ],
    agenda: [
      {
        time: "10:00 AM - 11:00 AM",
        title: "Inauguration Ceremony",
        description: "Traditional lamp lighting and dance performances"
      },
      {
        time: "11:30 AM - 01:30 PM",
        title: "Cultural Competitions",
        description: "Solo and group dance competitions"
      },
      {
        time: "02:00 PM - 03:30 PM",
        title: "Art Exhibition",
        description: "Display of student artwork from various mediums"
      },
      {
        time: "04:00 PM - 06:00 PM",
        title: "Music Performances",
        description: "Classical and fusion music performances"
      },
      {
        time: "07:00 PM - 09:00 PM",
        title: "Celebrity Performance",
        description: "Special performance by guest artists"
      }
    ],
    speakers: [
      {
        name: "Mr. Rajesh Kapoor",
        designation: "Film Director",
        image: "https://i.pravatar.cc/150?u=speaker3",
        bio: "Award-winning filmmaker known for cultural documentaries."
      },
      {
        name: "Ms. Lakshmi Rao",
        designation: "Classical Dancer",
        image: "https://i.pravatar.cc/150?u=speaker4",
        bio: "Renowned Bharatanatyam dancer with international recognition."
      }
    ]
  },
  {
    id: "3",
    title: "Sports Tournament 2025",
    description: "Annual inter-college sports tournament with competitions in cricket, football, basketball, volleyball, and athletics. Show your sporting spirit! The tournament brings together talented athletes from universities across the region to compete in various sports disciplines. This week-long event promotes sportsmanship, teamwork, and physical fitness among students. Whether you're a participant or a spectator, you'll enjoy the thrill of competition and the celebration of athletic excellence.",
    shortDescription: "Annual inter-college sports tournament with competitions in cricket, football, basketball, volleyball, and athletics. Show your sporting spirit!",
    date: "2025-07-10",
    time: "08:00 AM",
    endTime: "06:00 PM",
    location: "Sports Complex",
    bannerImage: "https://tse4.mm.bing.net/th?id=OIP.IBHIKR-9dQIEuo0o-ydSawHaE7&pid=Api&P=0&h=180",
    categories: ["Sports", "Tournament", "Athletics"],
    registeredCount: 320,
    maxAttendees: 600,
    organizer: "Department of Physical Education",
    contactEmail: "sports@srmap.edu.in",
    contactPhone: "+91 9876543212",
    website: "https://sports.srmap.edu.in",
    additionalInfo: "Teams must register before the deadline. All participants must bring valid ID cards. Sports equipment will be provided by the university.",
    images: [
      "https://tse4.mm.bing.net/th?id=OIP.IBHIKR-9dQIEuo0o-ydSawHaE7&pid=Api&P=0&h=180",
      "https://aniportalimages.s3.amazonaws.com/media/details/SPrtsandgameesEww_RmIILnt.jpg",
      "https://srmap.edu.in/wp-content/uploads/2022/03/SRM-AP-NIRF-Ranking.jpg"
    ],
    agenda: [
      {
        time: "08:00 AM - 09:00 AM",
        title: "Opening Ceremony",
        description: "Parade of athletes and torch lighting"
      },
      {
        time: "09:30 AM - 12:30 PM",
        title: "Preliminary Rounds",
        description: "Group stage matches for team sports"
      },
      {
        time: "01:00 PM - 02:00 PM",
        title: "Lunch Break",
        description: "Refreshments for all participants"
      },
      {
        time: "02:30 PM - 05:00 PM",
        title: "Athletics Events",
        description: "Track and field competitions"
      },
      {
        time: "05:30 PM - 06:00 PM",
        title: "Day 1 Awards",
        description: "Medals for day 1 winners"
      }
    ],
    speakers: [
      {
        name: "Mr. Rajiv Singh",
        designation: "Former National Cricket Player",
        image: "https://i.pravatar.cc/150?u=speaker5",
        bio: "Represented India in international cricket for over a decade."
      },
      {
        name: "Ms. Anjali Bhagwat",
        designation: "Olympic Athlete",
        image: "https://i.pravatar.cc/150?u=speaker6",
        bio: "Olympic medalist and sports advocate promoting athletics in universities."
      }
    ]
  }
];

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    // Simulate fetching event details
    const fetchEvent = () => {
      setLoading(true);
      const foundEvent = mockEvents.find(e => e.id === id);
      
      if (foundEvent) {
        setEvent(foundEvent);
        // Randomly determine if user is registered (for demo)
        setIsRegistered(Math.random() > 0.7);
      } else {
        // Event not found
        toast({
          title: "Event not found",
          description: "The event you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate("/events");
      }
      
      setLoading(false);
    };
    
    fetchEvent();
  }, [id, navigate, toast]);
  
  const handleRegister = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to register for events.",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    
    // Simulate API call to register
    setIsRegistered(true);
    toast({
      title: "Registration successful!",
      description: `You have successfully registered for ${event.title}.`,
    });
  };
  
  const handleCancelRegistration = () => {
    // Simulate API call to cancel registration
    setIsRegistered(false);
    toast({
      title: "Registration cancelled",
      description: `Your registration for ${event.title} has been cancelled.`,
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.shortDescription,
        url: window.location.href,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this event with others.",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-srm-green/20 rounded-full mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Loading event details...</h3>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events">
          <Button>View All Events</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative h-[50vh] lg:h-[60vh]">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white bg-black/20 hover:bg-black/40"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-3">
                {event.categories.map((category, index) => (
                  <Badge key={index} className="bg-srm-gold text-black">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {event.title}
              </h1>
              <p className="text-white/90 text-lg mb-4 max-w-3xl">
                {event.shortDescription}
              </p>
              <div className="flex flex-wrap gap-6 text-white mt-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.time} - {event.endTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.registeredCount}/{event.maxAttendees} Registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Main Content */}
            <div className="lg:w-2/3 p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {event.description}
                </p>
              </div>
              
              {/* Agenda */}
              {event.agenda && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-srm-green pl-4 py-2"
                      >
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-srm-green mb-1">{item.time}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Speakers/Presenters */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Speakers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="flex p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{speaker.name}</h3>
                          <p className="text-sm text-srm-green mb-1">
                            {speaker.designation}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {speaker.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Gallery */}
              {event.images && event.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
                  <div className="relative">
                    <div className="overflow-hidden rounded-lg mb-2">
                      <img
                        src={event.images[activeImage]}
                        alt={`Event gallery image ${activeImage + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="flex space-x-2 overflow-x-auto py-2">
                      {event.images.map((image, index) => (
                        <button
                          key={index}
                          className={`rounded-md overflow-hidden flex-shrink-0 border-2 ${
                            index === activeImage
                              ? "border-srm-green"
                              : "border-transparent"
                          }`}
                          onClick={() => setActiveImage(index)}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-20 h-16 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Additional Info */}
              {event.additionalInfo && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      {event.additionalInfo}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 border-l border-gray-200 dark:border-gray-700">
              <div className="p-6 sticky top-0">
                {/* Registration Status */}
                <div className="mb-6">
                  {event.registeredCount >= event.maxAttendees ? (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-4">
                      <p className="text-yellow-800 dark:text-yellow-400 font-medium">
                        Registration Closed
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-500">
                        This event has reached maximum capacity.
                      </p>
                    </div>
                  ) : new Date(event.date) < new Date() ? (
                    <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-4">
                      <p className="text-gray-800 dark:text-gray-300 font-medium">
                        Event Completed
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        This event has already taken place.
                      </p>
                    </div>
                  ) : isRegistered ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 mb-4">
                      <p className="text-green-800 dark:text-green-400 font-medium">
                        You're Registered!
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-500">
                        You have successfully registered for this event.
                      </p>
                    </div>
                  ) : null}
                  
                  {/* Registration Button */}
                  {new Date(event.date) > new Date() && (
                    <>
                      {isRegistered ? (
                        <div className="flex flex-col gap-3">
                          <Link to="/dashboard/tickets">
                            <Button className="w-full bg-srm-green text-white hover:bg-srm-green-dark">
                              View Ticket
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                            onClick={handleCancelRegistration}
                          >
                            Cancel Registration
                          </Button>
                        </div>
                      ) : event.registeredCount < event.maxAttendees ? (
                        <Button
                          className="w-full bg-srm-green text-white hover:bg-srm-green-dark"
                          onClick={handleRegister}
                        >
                          Register Now
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          disabled
                        >
                          Registration Full
                        </Button>
                      )}
                    </>
                  )}
                  
                  {/* Share Button */}
                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                  
                  {/* Save Event */}
                  <Button
                    variant="ghost"
                    className="w-full mt-3"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save to Calendar
                  </Button>
                </div>
                
                {/* Organizer Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Organizer</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-3 text-srm-green" />
                      <span>{event.organizer}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-srm-green" />
                      <a href={`mailto:${event.contactEmail}`} className="text-srm-green hover:underline">
                        {event.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-srm-green" />
                      <a href={`tel:${event.contactPhone}`} className="text-srm-green hover:underline">
                        {event.contactPhone}
                      </a>
                    </div>
                    {event.website && (
                      <div className="flex items-center">
                        <Tag className="h-5 w-5 mr-3 text-srm-green" />
                        <a href={event.website} target="_blank" rel="noopener noreferrer" className="text-srm-green hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Registration Stats */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Registration Status</h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
                    <div
                      className="bg-srm-green h-4 rounded-full"
                      style={{
                        width: `${Math.min(
                          (event.registeredCount / event.maxAttendees) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.registeredCount} of {event.maxAttendees} spots filled
                  </p>
                </div>
                
                {/* Similar Events */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Similar Events</h3>
                  <div className="space-y-3">
                    {mockEvents
                      .filter((e) => e.id !== event.id)
                      .slice(0, 2)
                      .map((similarEvent) => (
                        <Link
                          key={similarEvent.id}
                          to={`/events/${similarEvent.id}`}
                          className="block group"
                        >
                          <div className="flex items-center">
                            <img
                              src={similarEvent.bannerImage}
                              alt={similarEvent.title}
                              className="w-16 h-16 object-cover rounded-md mr-3"
                            />
                            <div>
                              <h4 className="font-medium group-hover:text-srm-green transition-colors">
                                {similarEvent.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(similarEvent.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
