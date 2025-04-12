
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EventCard = ({ event }) => {
  // Calculate days remaining until event
  const calculateDaysRemaining = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={event.bannerImage} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        {daysRemaining > 0 ? (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 text-srm-green dark:text-srm-gold rounded-full px-3 py-1 text-sm font-semibold shadow-md">
            {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
          </div>
        ) : daysRemaining === 0 ? (
          <div className="absolute top-4 right-4 bg-srm-gold text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md">
            Today
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-gray-600 text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md">
            Past Event
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{event.title}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-srm-gold/10 text-srm-gold-dark border-srm-gold/30">
              {category}
            </Badge>
          ))}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2 text-srm-green" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2 text-srm-green" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2 text-srm-green" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 mr-2 text-srm-green" />
            <span>{event.registeredCount}/{event.maxAttendees} registered</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link to={`/events/${event.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
          {daysRemaining >= 0 && (
            <Button className="bg-srm-green text-white hover:bg-srm-green-dark">
              Register Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
