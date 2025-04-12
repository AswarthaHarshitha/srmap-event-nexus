
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Lock,
  School,
  BookOpen,
  Image,
  Save,
  LogOut,
  UserCircle
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "+91 9876543210",
    department: "Computer Science & Engineering",
    rollNumber: "AP21110010453",
    year: "3rd Year",
    bio: "Student at SRM University AP, passionate about technology and innovation.",
    address: "SRM University, Andhra Pradesh, Neerukonda, Mangalagiri",
    interests: ["Technology", "Sports", "Music", "Photography"]
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAcademic, setIsEditingAcademic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveBasic = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditingBasic(false);
      
      toast({
        title: "Profile updated",
        description: "Your basic information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSaveAcademic = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditingAcademic(false);
      
      toast({
        title: "Profile updated",
        description: "Your academic information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleUpdatePassword = () => {
    setIsLoading(true);
    
    // Password validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setIsLoading(false);
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setIsLoading(false);
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  
  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };
  
  const addInterest = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      if (!formData.interests.includes(e.target.value.trim())) {
        setFormData({
          ...formData,
          interests: [...formData.interests, e.target.value.trim()]
        });
        e.target.value = "";
      }
    }
  };
  
  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <Tabs defaultValue="profile">
              <div className="px-4 py-5 sm:px-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile" className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="academic" className="flex items-center">
                    <School className="h-4 w-4 mr-2" />
                    Academic
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="py-6 px-4 sm:px-6">
                <div className="flex flex-col md:flex-row">
                  {/* Profile Photo */}
                  <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                    <div className="relative">
                      <img
                        src={profileImage}
                        alt={formData.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-srm-gold"
                      />
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 bg-srm-green text-white p-2 rounded-full cursor-pointer hover:bg-srm-green-dark"
                      >
                        <Image className="h-4 w-4" />
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">{formData.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{formData.email}</p>
                    <Badge className="mt-2 bg-srm-gold text-black">
                      {user.role === "admin" ? "Administrator" : "Student"}
                    </Badge>
                  </div>
                  
                  {/* Profile Information */}
                  <div className="md:w-2/3 md:pl-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      {!isEditingBasic ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingBasic(true)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditingBasic(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-srm-green text-white hover:bg-srm-green-dark"
                            size="sm"
                            onClick={handleSaveBasic}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="flex items-center">
                                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                                Saving...
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Save className="h-4 w-4 mr-2" />
                                Save
                              </span>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {!isEditingBasic ? (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <User className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                          <div>
                            <div className="font-medium">Full Name</div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {formData.name}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {formData.email}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {formData.phone}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                          <div>
                            <div className="font-medium">Address</div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {formData.address}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <BookOpen className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                          <div>
                            <div className="font-medium">Bio</div>
                            <div className="text-gray-600 dark:text-gray-400">
                              {formData.bio}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium">Interests</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {formData.interests.map((interest) => (
                                <Badge key={interest}>
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <div className="mt-1 flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              <User className="h-4 w-4 text-gray-400" />
                            </span>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <div className="mt-1 flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              <Mail className="h-4 w-4 text-gray-400" />
                            </span>
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="rounded-l-none"
                              disabled
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <div className="mt-1 flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              <Phone className="h-4 w-4 text-gray-400" />
                            </span>
                            <Input
                              type="text"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <div className="mt-1 flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              <MapPin className="h-4 w-4 text-gray-400" />
                            </span>
                            <Input
                              type="text"
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="interests">Interests</Label>
                          <div className="mt-1">
                            <Input
                              type="text"
                              id="interests"
                              placeholder="Type an interest and press Enter"
                              onKeyDown={addInterest}
                            />
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.interests.map((interest) => (
                              <Badge
                                key={interest}
                                className="flex items-center gap-1"
                              >
                                {interest}
                                <button
                                  onClick={() => removeInterest(interest)}
                                  className="ml-1 text-xs hover:text-red-500"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Academic Tab */}
              <TabsContent value="academic" className="py-6 px-4 sm:px-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Academic Information</h3>
                  {!isEditingAcademic ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingAcademic(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingAcademic(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-srm-green text-white hover:bg-srm-green-dark"
                        size="sm"
                        onClick={handleSaveAcademic}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                            Saving...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </span>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                
                {!isEditingAcademic ? (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <School className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                      <div>
                        <div className="font-medium">Department</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {formData.department}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <UserCircle className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                      <div>
                        <div className="font-medium">Roll Number</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {formData.rollNumber}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-srm-green mt-0.5" />
                      <div>
                        <div className="font-medium">Year of Study</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {formData.year}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-medium mb-4">Event Participation</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-srm-green">12</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Events Attended</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-srm-gold">5</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Events Organized</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-purple-600">3</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Certificates Earned</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        type="text"
                        id="rollNumber"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="year">Year of Study</Label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-srm-green focus:outline-none focus:ring-srm-green"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="py-6 px-4 sm:px-6">
                <div>
                  <h3 className="text-lg font-medium mb-6">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    
                    <Button
                      className="bg-srm-green text-white hover:bg-srm-green-dark"
                      onClick={handleUpdatePassword}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                          Updating...
                        </span>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Account Actions
                    </h3>
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                      <Button
                        variant="outline"
                        className="flex items-center text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout from all devices
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center border-orange-200 text-orange-600 hover:text-orange-700 hover:border-orange-300 dark:border-orange-800 dark:hover:border-orange-700"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
