
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Heart, Share2, ThumbsUp, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const EventCard = ({ event, isRegistered = false, isPast = false }) => {
  const [liked, setLiked] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  // Calculate days remaining until event
  const calculateDaysRemaining = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title} at ${event.location}`,
          url: window.location.origin + '/events/' + event.id,
        });
      } else {
        // Fallback
        navigator.clipboard.writeText(
          window.location.origin + '/events/' + event.id
        );
        toast({
          title: "Link copied to clipboard!",
          description: "You can now share it with friends",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleRegister = () => {
    toast({
      title: "Registration Successful!",
      description: `You are now registered for ${event.title}`,
    });
  };

  const handleToggleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked 
        ? "Event removed from your favorites" 
        : "Event added to your favorites",
    });
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={event.bannerImage} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        {!isPast && daysRemaining > 0 ? (
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
        
        <button 
          onClick={handleToggleLike}
          className={`absolute top-4 left-4 p-2 rounded-full ${
            liked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500'
          } transition-colors duration-300`}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold line-clamp-2">{event.title}</h3>
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
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share event</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {isRegistered && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowQR(!showQR)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showQR ? 'Hide ticket' : 'Show ticket'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {isPast && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rate this event</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {isRegistered ? (
            <Link to={`/dashboard/tickets`}>
              <Button variant="outline" size="sm">View Ticket</Button>
            </Link>
          ) : (
            <>
              <Link to={`/events/${event.id}`}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
              {!isPast && daysRemaining >= 0 && (
                <Button 
                  className="bg-srm-green text-white hover:bg-srm-green-dark ml-2"
                  onClick={handleRegister}
                >
                  Register Now
                </Button>
              )}
            </>
          )}
        </div>
        
        {/* QR Code for ticket (shown only when registered and QR button clicked) */}
        {isRegistered && showQR && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="bg-gray-100 p-2 rounded">
                {/* Replace with actual QR code component in production */}
                <div className="w-32 h-32 bg-black rounded-lg grid grid-cols-4 grid-rows-4 gap-1 p-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`${Math.random() > 0.3 ? 'bg-white' : 'bg-black'} rounded-sm`}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500 font-mono">
                {event.ticketId || `TICKET-${event.id}-123456`}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
