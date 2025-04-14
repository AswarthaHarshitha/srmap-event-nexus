
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import mockMongoDBConnection from "@/utils/dbConnection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Image as ImageIcon,
  Tag
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CreateEventPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    // Add more fields as needed
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date: date ? format(date, "yyyy-MM-dd") : "" }));
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a storage service
      // For demo purposes, we'll create a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.date && formData.time && formData.location;
      case 3:
        return formData.capacity && formData.image;
      default:
        return true;
    }
  };
  
  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };
  
  const handlePrevStep = () => {
    setActiveStep(prev => prev - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare event data with organizer info
      const eventData = {
        ...formData,
        organizerId: user.id,
        organizerName: user.name,
        status: 'pending', // Events need admin approval
        createdAt: new Date().toISOString()
      };
      
      // Save to MongoDB (mock for demo)
      const createdEvent = await mockMongoDBConnection.createEvent(eventData);
      
      toast({
        title: "Event Created Successfully",
        description: "Your event has been submitted for approval",
        variant: "success",
      });
      
      // Redirect to organizer dashboard after successful submission
      setTimeout(() => {
        navigate("/organizer/events");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error Creating Event",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <p className="text-gray-500">Fill in the details to create a new event</p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${activeStep >= 1 ? 'text-srm-green' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${activeStep >= 1 ? 'border-srm-green bg-srm-green text-white' : 'border-gray-300'}`}>
              1
            </div>
            <span className="mt-2 text-sm font-medium">Basic Info</span>
          </div>
          <div className={`flex-1 h-1 self-center ${activeStep >= 2 ? 'bg-srm-green' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${activeStep >= 2 ? 'text-srm-green' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${activeStep >= 2 ? 'border-srm-green bg-srm-green text-white' : 'border-gray-300'}`}>
              2
            </div>
            <span className="mt-2 text-sm font-medium">Date & Venue</span>
          </div>
          <div className={`flex-1 h-1 self-center ${activeStep >= 3 ? 'bg-srm-green' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${activeStep >= 3 ? 'text-srm-green' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${activeStep >= 3 ? 'border-srm-green bg-srm-green text-white' : 'border-gray-300'}`}>
              3
            </div>
            <span className="mt-2 text-sm font-medium">Details</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          {/* Step 1: Basic Information */}
          {activeStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Web Development Workshop"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your event in detail"
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Event Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tech">Technology</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </>
          )}
          
          {/* Step 2: Date & Venue */}
          {activeStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>Date & Venue</CardTitle>
                <CardDescription>Set when and where your event will take place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Event Date</Label>
                  <div className="relative w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.date ? format(new Date(formData.date), "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.date ? new Date(formData.date) : undefined}
                          onSelect={handleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="time">Event Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Event Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Main Auditorium, Block 1"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}
          
          {/* Step 3: Event Details */}
          {activeStep === 3 && (
            <>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Finalize your event details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="capacity">Maximum Attendees</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="image">Event Banner Image</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {formData.image ? (
                        <div>
                          <img
                            src={formData.image}
                            alt="Event banner preview"
                            className="mx-auto h-32 object-cover rounded-md"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Click below to change image
                          </p>
                        </div>
                      ) : (
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-srm-green hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}
          
          <CardFooter className="flex justify-between">
            {activeStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
              >
                Previous
              </Button>
            )}
            {activeStep < 3 ? (
              <Button
                type="button"
                className="bg-srm-green hover:bg-srm-green-dark ml-auto"
                onClick={handleNextStep}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-srm-green hover:bg-srm-green-dark ml-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                ) : null}
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CreateEventPage;
