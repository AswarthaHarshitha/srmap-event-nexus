
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database, 
  HardDrive, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle,
  BarChart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSystemPage = () => {
  const [systemStatus, setSystemStatus] = useState({
    server: { status: "online", uptime: "99.9%", lastRestart: "2023-09-15T08:30:00" },
    database: { status: "online", connections: 42, usage: 68 },
    storage: { used: 156, total: 500, files: 12485 },
    jobs: [
      { id: 1, name: "Database Backup", status: "completed", lastRun: "2023-09-18T02:00:00" },
      { id: 2, name: "User Cleanup", status: "scheduled", nextRun: "2023-09-20T03:00:00" },
      { id: 3, name: "Event Reminders", status: "running", startTime: "2023-09-19T12:00:00" },
      { id: 4, name: "Analytics Aggregation", status: "failed", lastRun: "2023-09-19T01:00:00", error: "Timeout" }
    ]
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const refreshSystemStatus = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "System Status Refreshed",
        description: "The latest system information has been loaded",
        variant: "success",
      });
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Online</Badge>;
      case "offline":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Offline</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Maintenance</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getJobStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "running":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-gray-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const restartService = (service) => {
    toast({
      title: `Restarting ${service}`,
      description: `The ${service} service is being restarted...`,
      variant: "info",
    });
  };

  const handleAnalytics = () => {
    toast({
      title: "System Analytics",
      description: "Generating system analytics report...",
      variant: "info",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Status</h1>
        <Button 
          onClick={refreshSystemStatus} 
          disabled={isRefreshing}
          variant="outline"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Status"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Server Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span>Status: {getStatusBadge(systemStatus.server.status)}</span>
              <span className="text-sm text-gray-500">Uptime: {systemStatus.server.uptime}</span>
            </div>
            <div className="text-xs text-gray-500">
              Last Restart: {formatDateTime(systemStatus.server.lastRestart)}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => restartService("server")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Restart Server
            </Button>
          </CardFooter>
        </Card>
        
        {/* Database Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span>Status: {getStatusBadge(systemStatus.database.status)}</span>
              <span className="text-sm text-gray-500">Connections: {systemStatus.database.connections}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">Database Usage</div>
            <Progress value={systemStatus.database.usage} className="h-2" />
            <div className="mt-1 text-xs text-right">{systemStatus.database.usage}%</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => restartService("database")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Restart Database
            </Button>
          </CardFooter>
        </Card>
        
        {/* Storage Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Status</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span>Used: {systemStatus.storage.used} GB</span>
              <span className="text-sm text-gray-500">Total: {systemStatus.storage.total} GB</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">Storage Usage</div>
            <Progress value={(systemStatus.storage.used / systemStatus.storage.total) * 100} className="h-2" />
            <div className="mt-1 text-xs text-right">{Math.round((systemStatus.storage.used / systemStatus.storage.total) * 100)}%</div>
            <div className="text-xs text-gray-500 mt-2">
              Total Files: {systemStatus.storage.files.toLocaleString()}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={handleAnalytics}>
              <BarChart className="mr-2 h-4 w-4" />
              Storage Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Background Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Background Jobs</CardTitle>
          <CardDescription>
            Status of automated system jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemStatus.jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  {getJobStatusIcon(job.status)}
                  <div className="ml-3">
                    <div className="font-medium">{job.name}</div>
                    {job.status === "completed" && (
                      <div className="text-xs text-gray-500">Last Run: {formatDateTime(job.lastRun)}</div>
                    )}
                    {job.status === "scheduled" && (
                      <div className="text-xs text-gray-500">Next Run: {formatDateTime(job.nextRun)}</div>
                    )}
                    {job.status === "running" && (
                      <div className="text-xs text-gray-500">Started: {formatDateTime(job.startTime)}</div>
                    )}
                    {job.status === "failed" && (
                      <div className="text-xs text-red-500">Error: {job.error}</div>
                    )}
                  </div>
                </div>
                <Badge 
                  className={`
                    ${job.status === "completed" ? "bg-green-100 text-green-800 border-green-300" : ""}
                    ${job.status === "running" ? "bg-blue-100 text-blue-800 border-blue-300" : ""}
                    ${job.status === "scheduled" ? "bg-gray-100 text-gray-800 border-gray-300" : ""}
                    ${job.status === "failed" ? "bg-red-100 text-red-800 border-red-300" : ""}
                  `}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => restartService("all jobs")}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Restart All Jobs
          </Button>
          <Button variant="outline" onClick={handleAnalytics}>
            <BarChart className="mr-2 h-4 w-4" />
            Performance Analytics
          </Button>
        </CardFooter>
      </Card>
      
      {/* MongoDB Connection Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>MongoDB Connection</CardTitle>
            <CardDescription>
              Connection to mongodb://localhost:27017/event_sphere
            </CardDescription>
          </div>
          {getStatusBadge("online")}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Connection Status</div>
              <div className="text-sm text-green-600 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1" /> Connected
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Database Size</div>
              <div className="text-sm">42.8 MB</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Collections</div>
              <div className="text-sm">Users, Events, Tickets, Attendance</div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Last Backup</div>
              <div className="text-sm">Today, 2:00 AM</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => toast({
            title: "Database Backup Started",
            description: "A new backup of the MongoDB database has been initiated",
            variant: "info",
          })}>
            <Database className="mr-2 h-4 w-4" />
            Backup Database
          </Button>
          <Button variant="outline" onClick={() => toast({
            title: "Database Repaired",
            description: "Database verification and repair completed successfully",
            variant: "success",
          })}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Verify & Repair
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSystemPage;
