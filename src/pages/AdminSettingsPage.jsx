
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings,
  Mail,
  Shield,
  Bell,
  Calendar,
  Save,
  RefreshCw,
  Globe,
  Key
} from "lucide-react";

const AdminSettingsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    universityName: "SRM University",
    universityDomain: "srm.edu.in",
    contactEmail: "admin@srm.edu.in",
    maxEventsPerMonth: 100,
    maxRegistrationsPerEvent: 500,
    timezone: "Asia/Kolkata",
    defaultLanguage: "en"
  });

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.srm.edu.in",
    smtpPort: 587,
    smtpUsername: "notifications@srm.edu.in",
    smtpPassword: "••••••••••••",
    fromEmail: "events@srm.edu.in",
    fromName: "SRM Event Portal",
    enableEmailNotifications: true
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    minimumPasswordLength: 8,
    requirePasswordComplexity: true,
    sessionTimeout: 60, // minutes
    maxLoginAttempts: 5,
    enforceSSL: true,
    allowSocialLogin: true,
    enableTwoFactorAuth: false
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    enablePushNotifications: true,
    enableEmailDigest: true,
    digestFrequency: "weekly",
    notifyOnEventCreation: true,
    notifyOnEventApproval: true,
    notifyOnEventCancellation: true,
    notifyOnRegistration: true
  });

  const handleSaveSettings = (section) => {
    setLoading(true);
    
    // Simulate saving to database
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Settings Saved",
        description: `${section} settings have been updated successfully.`,
        variant: "success",
      });
      
      console.log(`Saving ${section} settings:`, 
        section === "General" ? generalSettings : 
        section === "Email" ? emailSettings :
        section === "Security" ? securitySettings :
        notificationSettings
      );
    }, 1000);
  };

  const handleResetDefaults = (section) => {
    if (window.confirm("Are you sure you want to reset to default settings? This cannot be undone.")) {
      // Simulate resetting to defaults
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        
        toast({
          title: "Default Settings Restored",
          description: `${section} settings have been reset to defaults.`,
          variant: "info",
        });
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage general portal settings like university details and event limits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>University Name</FormLabel>
                  <Input 
                    value={generalSettings.universityName}
                    onChange={(e) => setGeneralSettings({...generalSettings, universityName: e.target.value})}
                  />
                  <FormDescription>The name of your institution</FormDescription>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>University Domain</FormLabel>
                  <Input 
                    value={generalSettings.universityDomain}
                    onChange={(e) => setGeneralSettings({...generalSettings, universityDomain: e.target.value})}
                  />
                  <FormDescription>Email domain for university accounts</FormDescription>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Contact Email</FormLabel>
                  <Input 
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  />
                  <FormDescription>Primary contact email for the portal</FormDescription>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Max Events Per Month</FormLabel>
                  <Input 
                    type="number"
                    value={generalSettings.maxEventsPerMonth}
                    onChange={(e) => setGeneralSettings({...generalSettings, maxEventsPerMonth: parseInt(e.target.value)})}
                  />
                  <FormDescription>Maximum events that can be created per month</FormDescription>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Max Registrations Per Event</FormLabel>
                  <Input 
                    type="number"
                    value={generalSettings.maxRegistrationsPerEvent}
                    onChange={(e) => setGeneralSettings({...generalSettings, maxRegistrationsPerEvent: parseInt(e.target.value)})}
                  />
                  <FormDescription>Maximum allowed registrations per event</FormDescription>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Timezone</FormLabel>
                  <Select 
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Default timezone for event scheduling</FormDescription>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Default Language</FormLabel>
                  <Select 
                    value={generalSettings.defaultLanguage}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, defaultLanguage: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Default language for the portal</FormDescription>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleResetDefaults("General")}
                disabled={loading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button 
                onClick={() => handleSaveSettings("General")}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure SMTP settings for email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>SMTP Server</FormLabel>
                  <Input 
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>SMTP Port</FormLabel>
                  <Input 
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>SMTP Username</FormLabel>
                  <Input 
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>SMTP Password</FormLabel>
                  <Input 
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>From Email</FormLabel>
                  <Input 
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>From Name</FormLabel>
                  <Input 
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={emailSettings.enableEmailNotifications}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableEmailNotifications: checked})}
                />
                <span>Enable email notifications</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleResetDefaults("Email")}
                disabled={loading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button 
                onClick={() => handleSaveSettings("Email")}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Minimum Password Length</FormLabel>
                  <Input 
                    type="number"
                    value={securitySettings.minimumPasswordLength}
                    onChange={(e) => setSecuritySettings({...securitySettings, minimumPasswordLength: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Max Login Attempts</FormLabel>
                  <Input 
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Session Timeout (minutes)</FormLabel>
                  <Input 
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={securitySettings.requirePasswordComplexity}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requirePasswordComplexity: checked})}
                  />
                  <span>Require complex passwords</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={securitySettings.enforceSSL}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enforceSSL: checked})}
                  />
                  <span>Enforce SSL</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={securitySettings.allowSocialLogin}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, allowSocialLogin: checked})}
                  />
                  <span>Allow social login (Google, GitHub)</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={securitySettings.enableTwoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableTwoFactorAuth: checked})}
                  />
                  <span>Enable Two-Factor Authentication</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => handleResetDefaults("Security")}
                disabled={loading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button 
                onClick={() => handleSaveSettings("Security")}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how notifications are sent to users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Digest Frequency</FormLabel>
                  <Select 
                    value={notificationSettings.digestFrequency}
                    onValueChange={(value) => setNotificationSettings({...notificationSettings, digestFrequency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Email Notification Triggers</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>On Event Creation</span>
                    <Switch 
                      checked={notificationSettings.notifyOnEventCreation}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, notifyOnEventCreation: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>On Event Approval</span>
                    <Switch 
                      checked={notificationSettings.notifyOnEventApproval}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, notifyOnEventApproval: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>On Event Cancellation</span>
                    <Switch 
                      checked={notificationSettings.notifyOnEventCancellation}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, notifyOnEventCancellation: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>On Registration</span>
                    <Switch 
                      checked={notificationSettings.notifyOnRegistration}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, notifyOnRegistration: checked})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={notificationSettings.enablePushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enablePushNotifications: checked})}
                  />
                  <span>Enable Push Notifications</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={notificationSettings.enableEmailDigest}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enableEmailDigest: checked})}
                  />
                  <span>Enable Email Digest</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleResetDefaults("Notification")}
                disabled={loading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button 
                onClick={() => handleSaveSettings("Notification")}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;
