
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, Clock, MapPin, Users, Image, Tag, Info, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const EventForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = (data) => {
    const formData = {
      ...data,
      bannerImage: bannerPreview,
      categories: tags
    };
    
    onSubmit(formData);
    toast({
      title: "Event created!",
      description: "Your event has been submitted for approval.",
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center w-full">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-srm-green text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`h-1 flex-grow mx-2 ${step >= 2 ? 'bg-srm-green' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-srm-green text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`h-1 flex-grow mx-2 ${step >= 3 ? 'bg-srm-green' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-srm-green text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Info className="mr-2 text-srm-green" />
            Basic Information
          </h2>

          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Event title is required" })}
              placeholder="Enter event title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Describe your event"
              className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-srm-green" />
                Event Date
              </Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-srm-green" />
                Event Time
              </Label>
              <Input
                id="time"
                type="time"
                {...register("time", { required: "Time is required" })}
                className={errors.time ? "border-red-500" : ""}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-srm-green" />
              Location
            </Label>
            <Input
              id="location"
              {...register("location", { required: "Location is required" })}
              placeholder="Event location"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="organizer" className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-srm-green" />
              Organizer/Department
            </Label>
            <Input
              id="organizer"
              {...register("organizer", { required: "Organizer is required" })}
              placeholder="Organizing department or club"
              className={errors.organizer ? "border-red-500" : ""}
            />
            {errors.organizer && (
              <p className="text-red-500 text-sm mt-1">{errors.organizer.message}</p>
            )}
          </div>

          <Button type="button" onClick={nextStep} className="bg-srm-green text-white hover:bg-srm-green-dark">
            Next Step
          </Button>
        </div>
      )}

      {/* Step 2: Event Details & Categories */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FileText className="mr-2 text-srm-green" />
            Event Details & Categories
          </h2>

          <div>
            <Label htmlFor="bannerImage" className="flex items-center">
              <Image className="mr-2 h-4 w-4 text-srm-green" />
              Event Banner Image
            </Label>
            <Input
              id="bannerImage"
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="mt-1"
            />
            {bannerPreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <Label className="flex items-center">
              <Tag className="mr-2 h-4 w-4 text-srm-green" />
              Event Categories/Tags
            </Label>
            <div className="flex">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add a category and press Enter"
                className="mr-2"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-srm-gold/10 text-srm-gold-dark flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-srm-gold-dark hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            {tags.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Add categories like "Technical", "Cultural", "Sports", etc.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="maxAttendees" className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-srm-green" />
              Maximum Attendees
            </Label>
            <Input
              id="maxAttendees"
              type="number"
              {...register("maxAttendees", {
                required: "Maximum attendees is required",
                min: {
                  value: 1,
                  message: "At least 1 attendee is required",
                },
              })}
              placeholder="Maximum number of participants"
              className={errors.maxAttendees ? "border-red-500" : ""}
            />
            {errors.maxAttendees && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxAttendees.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={prevStep} variant="outline">
              Previous Step
            </Button>
            <Button type="button" onClick={nextStep} className="bg-srm-green text-white hover:bg-srm-green-dark">
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Additional Information & Submit */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            Additional Information & Submit
          </h2>

          <div>
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              {...register("contactEmail", {
                required: "Contact email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Contact email for queries"
              className={errors.contactEmail ? "border-red-500" : ""}
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactEmail.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              {...register("contactPhone", {
                required: "Contact phone is required",
              })}
              placeholder="Contact phone number"
              className={errors.contactPhone ? "border-red-500" : ""}
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactPhone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              {...register("additionalInfo")}
              placeholder="Any additional information about the event"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-start mt-4">
            <input
              type="checkbox"
              id="termsAgreed"
              {...register("termsAgreed", {
                required: "You must agree to the terms",
              })}
              className="mt-1"
            />
            <Label htmlFor="termsAgreed" className="ml-2 text-sm">
              I confirm that all information provided is correct and adhere to SRM University's event policies.
              {errors.termsAgreed && (
                <span className="text-red-500 block mt-1">
                  {errors.termsAgreed.message}
                </span>
              )}
            </Label>
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={prevStep} variant="outline">
              Previous Step
            </Button>
            <Button type="submit" className="bg-srm-green text-white hover:bg-srm-green-dark">
              Submit Event
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default EventForm;
