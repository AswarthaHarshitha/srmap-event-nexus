
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import mockMongoDBConnection from "@/utils/dbConnection";
import { 
  Database, 
  Server, 
  HardDrive, 
  RefreshCw, 
  AlarmClock, 
  Shield,
  Download,
  RotateCw,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminSystemPage = () => {
  const { toast } = useToast();
  const [dbStatus, setDbStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSystemStatus();
  }, []);

  const fetchSystemStatus = async () => {
    setIsLoading(true);
    try {
      const result = await mockMongoDBConnection.testConnection();
      setDbStatus(result);
    } catch (error) {
      toast({
        title: "Failed to get system status",
        description: error.message || "Could not connect to database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackupDb = () => {
    toast({
      title: "Database Backup Started",
      description: "A full backup of the database has been initiated",
      variant: "info",
    });

    // Simulate backup process
    setTimeout(() => {
      toast({
        title: "Database Backup Completed",
        description: "The backup was successful and saved to the secure storage",
        variant: "success",
      });
    }, 3000);
  };

  const handleRestartService = (service) => {
    toast({
      title: `Restarting ${service}`,
      description: `The ${service} service is being restarted`,
      variant: "info",
    });

    // Simulate service restart
    setTimeout(() => {
      toast({
        title: `${service} Restarted`,
        description: `The ${service} service was successfully restarted`,
        variant: "success",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">System Status</h1>
          <p className="text-gray-500">Monitor and manage system services</p>
        </div>
        <Button 
          onClick={fetchSystemStatus} 
          variant="outline"
          disabled={isLoading}
        >
          {isLoading ? (
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh Status
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-srm-green"></div>
        </div>
      ) : dbStatus ? (
        <>
          {/* Database Connection Status */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Database Connection</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  Connected
                </Badge>
              </div>
              <CardDescription>
                MongoDB Status and Information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Connection String:</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 dark:bg-gray-800">
                    {mockMongoDBConnection.connectionString}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Database Name:</p>
                  <p className="font-medium mt-1">{dbStatus.stats.databaseName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Storage Usage:</p>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Used: {dbStatus.stats.totalSizeInMB} MB</span>
                  <span>Total: 500 MB</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Collections:</p>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {dbStatus.stats.collections.map((collection, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded dark:bg-gray-800">
                      <div className="flex justify-between">
                        <span className="font-medium">{collection.name}</span>
                        <span className="text-sm text-gray-500">{collection.sizeInMB} MB</span>
                      </div>
                      <p className="text-sm text-gray-500">{collection.documentCount} documents</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Last Backup:</p>
                <p className="mt-1">{new Date(dbStatus.stats.lastBackup).toLocaleString()}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBackupDb}>
                <Download className="mr-2 h-4 w-4" />
                Backup Database
              </Button>
              <Button variant="outline" onClick={() => handleRestartService('MongoDB')}>
                <RotateCw className="mr-2 h-4 w-4" />
                Restart Database
              </Button>
            </CardFooter>
          </Card>

          {/* System Services Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">API Server</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Running
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Uptime:</span>
                    <span>7 days, 4 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Response time:</span>
                    <span>120ms</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleRestartService('API Server')}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Restart Service
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Authentication Service</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Running
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active sessions:</span>
                    <span>247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Login rate:</span>
                    <span>62/hour</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleRestartService('Auth Service')}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Restart Service
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">File Storage</CardTitle>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                    Warning
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Storage used:</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Files:</span>
                    <span>5,642</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleRestartService('File Storage')}>
                  <HardDrive className="mr-2 h-4 w-4" />
                  Clean Storage
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Scheduled Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Tasks</CardTitle>
              <CardDescription>
                System maintenance and automated tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <AlarmClock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Daily Database Backup</p>
                      <p className="text-sm text-gray-500">Runs every day at 2:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <AlarmClock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Clean Expired Sessions</p>
                      <p className="text-sm text-gray-500">Runs every 12 hours</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <AlarmClock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Analytics Report Generation</p>
                      <p className="text-sm text-gray-500">Runs every Monday at 8:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Alerts */}
          <div>
            <h2 className="text-xl font-bold mb-4">Security Status</h2>
            <div className="space-y-4">
              <Alert variant="warning">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle>High Storage Usage Warning</AlertTitle>
                <AlertDescription>
                  File storage is at 82% capacity. Consider cleaning up unused files to prevent service disruptions.
                </AlertDescription>
              </Alert>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <CardTitle>Security Assessment</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Overall Security Score</span>
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        Good (87/100)
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Authentication Security</span>
                        <span className="text-green-600">Strong</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Data Encryption</span>
                        <span className="text-green-600">Enabled</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Firewall Status</span>
                        <span className="text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Failed Login Attempts (24h)</span>
                        <span>12</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Security Scan</span>
                        <span>Today, 06:30 AM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-srm-green hover:bg-srm-green-dark">
                    Run Security Scan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Database Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to the database. Please check your connection settings and try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdminSystemPage;
