
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  // Set up auto-rotate
  useEffect(() => {
    startAutoRotate();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const startAutoRotate = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000);
  };

  const resetAutoRotate = () => {
    clearInterval(intervalRef.current);
    startAutoRotate();
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1));
    resetAutoRotate();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1));
    resetAutoRotate();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    resetAutoRotate();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden h-[500px] rounded-lg shadow-xl">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {events.map((event, index) => (
          <div key={index} className="min-w-full relative">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-3xl">
                <span className="inline-block bg-srm-gold text-black font-medium px-3 py-1 rounded-full text-sm mb-4">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} | {event.time}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{event.title}</h2>
                <p className="text-white/90 mb-6 text-lg line-clamp-2 md:line-clamp-3">{event.description}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {event.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <Button className="bg-srm-green text-white hover:bg-srm-green-dark mr-3">
                  Register Now
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
