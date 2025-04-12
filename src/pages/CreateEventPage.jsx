
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventForm from "@/components/EventForm";
import { useToast } from "@/hooks/use-toast";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEventSubmit = (formData) => {
    setIsSubmitting(true);
    
    // This would be an API call in production
    setTimeout(() => {
      console.log("Event data to submit:", formData);
      
      toast({
        title: "Event created successfully!",
        description: "Your event has been submitted for approval.",
      });
      
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Event
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Fill in the details below to create your event. All events require admin approval before they are published.
            </p>
          </div>
          
          <div className="px-4 sm:px-6 py-6">
            <EventForm onSubmit={handleEventSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
