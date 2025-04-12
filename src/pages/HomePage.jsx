
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Award, BookOpen, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCarousel from "@/components/EventCarousel";
import EventCard from "@/components/EventCard";

// Mock data for featured events
const featuredEvents = [
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
  }
];

// Mock data for upcoming events
const upcomingEvents = [
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
  }
];

const HomePage = () => {
  const [stats, setStats] = useState({
    eventsHosted: 0,
    activeParticipants: 0,
    departments: 0,
    successRate: 0
  });

  // Animation for stats counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        return {
          eventsHosted: prev.eventsHosted >= 120 ? 120 : prev.eventsHosted + 3,
          activeParticipants: prev.activeParticipants >= 5000 ? 5000 : prev.activeParticipants + 125,
          departments: prev.departments >= 15 ? 15 : prev.departments + 1,
          successRate: prev.successRate >= 98 ? 98 : prev.successRate + 2
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <EventCarousel events={featuredEvents} />
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to EVENTSPHERE</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              SRM University AP's official event management platform. Discover, register, and participate in a variety of academic, cultural, and sports events happening around the campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center animate-fade-in">
              <div className="w-12 h-12 bg-srm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-srm-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse and register for upcoming events across various departments.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-srm-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-6 w-6 text-srm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Tickets</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get digital tickets with QR codes for easy event check-in.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-12 bg-srm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-srm-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get notifications and updates about events you're registered for.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="w-12 h-12 bg-srm-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-srm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Hosting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create and manage your own events with our easy-to-use platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-srm-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">EVENTSPHERE in Numbers</h2>
            <p className="text-lg opacity-90">
              The one-stop platform for all events at SRM University AP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.eventsHosted}+</div>
              <div className="text-xl opacity-90">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.activeParticipants.toLocaleString()}+</div>
              <div className="text-xl opacity-90">Active Participants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.departments}+</div>
              <div className="text-xl opacity-90">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.successRate}%</div>
              <div className="text-xl opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use EVENTSPHERE?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform offers a seamless experience for event organizers and attendees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-srm-gold/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-srm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple Registration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick and easy registration process for all university events with just a few clicks.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-srm-green/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-srm-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Events</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access to a wide range of academic, cultural, technical, and sports events.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-srm-gold/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-srm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Creation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create and manage your own events with detailed analytics and attendee management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join EVENTSPHERE today and be part of exciting events at SRM University AP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button className="bg-srm-green text-white hover:bg-srm-green-dark">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
