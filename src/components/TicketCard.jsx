
import { useState } from "react";
import { Calendar, Clock, MapPin, Ticket, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

const TicketCard = ({ ticket }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (ticket.status) {
      case "valid":
        return "bg-green-100 text-green-800 border-green-200";
      case "used":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ticket for ${ticket.event.title}`,
        text: `Check out my ticket for ${ticket.event.title} at SRM University!`,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this browser");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{ticket.event.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ticket #{ticket.ticketId}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <QRCode value={ticket.qrCode} size={128} />
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-srm-green" />
                <span>
                  {new Date(ticket.event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-srm-green" />
                <span>{ticket.event.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-srm-green" />
                <span>{ticket.event.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Ticket className="h-4 w-4 mr-2 text-srm-green" />
                <span>Seat/Registration: {ticket.seat || "General Admission"}</span>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2">Event Information:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {ticket.event.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {ticket.event.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-srm-gold/10 text-srm-gold-dark px-2 py-1 rounded-full text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Organizer:</span> {ticket.event.organizer}
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                className="bg-srm-green text-white hover:bg-srm-green-dark flex items-center"
                size="sm"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
