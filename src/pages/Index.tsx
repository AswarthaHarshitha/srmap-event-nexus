
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Award, BookOpen, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-srm-green to-srm-green-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-4">Welcome to EVENTSPHERE</h1>
              <p className="text-xl mb-6">
                SRM University AP's premier event management platform. Discover, register and participate in a wide range of events happening across the campus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events">
                  <Button size="lg" className="bg-white text-srm-green hover:bg-gray-100">
                    Explore Events
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sign Up Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://srmap.edu.in/wp-content/uploads/2022/03/Researchers-Day-2.jpg" 
                alt="SRM University Events" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Upcoming Featured Events</h2>
            <p className="text-gray-600">Don't miss out on these exciting events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
              <img 
                src="https://tse4.mm.bing.net/th?id=OIP.GLZf5sSo6jCaZ8wwA50MFAHaEn&pid=Api&P=0&h=180" 
                alt="Technical Symposium" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Annual Technical Symposium</h3>
                  <span className="bg-srm-green text-white text-xs px-2 py-1 rounded">Technical</span>
                </div>
                <p className="text-gray-600 mb-4">Join us for a day of innovation, technology, and networking with industry experts.</p>
                <div className="flex items-center mb-3">
                  <Calendar className="w-4 h-4 text-srm-green mr-2" />
                  <span className="text-sm text-gray-600">May 15, 2025</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="w-4 h-4 text-srm-green mr-2" />
                  <span className="text-sm text-gray-600">Main Auditorium</span>
                </div>
                <Link to="/events/1">
                  <Button className="w-full bg-srm-green hover:bg-srm-green-dark">View Details</Button>
                </Link>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
              <img 
                src="https://tse4.mm.bing.net/th?id=OIP.GHpnHycbcfHyotjmH_ZxIgHaDt&pid=Api&P=0&h=180" 
                alt="Cultural Fest" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Cultural Festival 2025</h3>
                  <span className="bg-srm-gold text-white text-xs px-2 py-1 rounded">Cultural</span>
                </div>
                <p className="text-gray-600 mb-4">Experience the vibrant diversity of cultures through music, dance, and art performances.</p>
                <div className="flex items-center mb-3">
                  <Calendar className="w-4 h-4 text-srm-green mr-2" />
                  <span className="text-sm text-gray-600">June 20, 2025</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="w-4 h-4 text-srm-green mr-2" />
                  <span className="text-sm text-gray-600">University Ground</span>
                </div>
                <Link to="/events/2">
                  <Button className="w-full bg-srm-green hover:bg-srm-green-dark">View Details</Button>
                </Link>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
              <img 
                src="https://tse4.mm.bing.net/th?id=OIP.IBHIKR-9dQIEuo0o-ydSawHaE7&pid=Api&P=0&h=180" 
                alt="Sports Tournament" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Sports Tournament</h3>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Sports</span>
                </div>
                <p className="text-gray-600 mb-4">Compete in various sports categories and showcase your athletic abilities.</p>
                <div className="flex items-center mb-3">
                  <Calendar className="w-4 h-4 text-srm-green mr-2" />
                  <span className="text-sm text-gray-600">July 10, 2025</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="w-4 h-4 text-srm-green mr-2" />
                  <span className="text-sm text-gray-600">Sports Complex</span>
                </div>
                <Link to="/events/3">
                  <Button className="w-full bg-srm-green hover:bg-srm-green-dark">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/events">
              <Button variant="outline" className="border-srm-green text-srm-green hover:bg-srm-green hover:text-white">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Why Choose EVENTSPHERE?</h2>
            <p className="text-gray-600">Seamless event management for the SRM University community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-srm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-srm-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Event Discovery</h3>
              <p className="text-gray-600">
                Find all campus events in one place with powerful search and filtering options.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-srm-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-srm-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple Registration</h3>
              <p className="text-gray-600">
                Register for events with just a few clicks and manage all your tickets in one dashboard.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-srm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-srm-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Host Your Own Events</h3>
              <p className="text-gray-600">
                Create and manage your own events with our easy-to-use event creation tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-srm-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join EVENTSPHERE today and never miss another campus event. Sign up now to start exploring!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button size="lg" className="bg-white text-srm-green hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
