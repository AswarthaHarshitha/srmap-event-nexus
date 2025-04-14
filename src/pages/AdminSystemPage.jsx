
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import mockMongoDBConnection from "@/utils/dbConnection";
import { 
  HardDrive, 
  Database, 
  Server, 
  Cpu, 
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert
} from "lucide-react";

const AdminSystemPage = () => {
  const [systemStats, setSystemStats] = useState({
    dbStatus: "connected",
    dbResponse: 45, // ms
    serverLoad: 23, // %
    memory: 42, // %
    storage: 15, // %
    activeUsers: 87,
    lastBackup: "2023-09-19 02:00:00",
    uptime: "12d 5h 32m",
    services: [
      { name: "Authentication", status: "operational" },
      { name: "Database", status: "operational" },
      { name: "File Storage", status: "operational" },
      { name: "Email Service", status: "warning", message: "High latency detected" },
      { name: "Payment Gateway", status: "operational" },
      { name: "Scheduler", status: "operational" }
    ],
    recentActions: [
      { time: "5 minutes ago", action: "Database backup completed", type: "info" },
      { time: "1 hour ago", action: "User authentication rate limit reached", type: "warning" },
      { time: "3 hours ago", action: "System update applied successfully", type: "success" },
      { time: "1 day ago", action: "Storage cleanup performed", type: "info" }
    ]
  });
  
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dbDetails, setDbDetails] = useState(null);

  const refreshStats = () => {
    setLoading(true);
    
    // Simulate stats refresh
    setTimeout(() => {
      setSystemStats({
        ...systemStats,
        dbResponse: Math.floor(Math.random() * 50) + 30,
        serverLoad: Math.floor(Math.random() * 30) + 10,
        memory: Math.floor(Math.random() * 20) + 30,
        activeUsers: Math.floor(Math.random() * 50) + 60
      });
      
      toast({
        title: "System stats refreshed",
        description: "All monitors have been updated with the latest data",
        variant: "success",
      });
      
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    // Test MongoDB connection on component mount
    const checkDbConnection = async () => {
      try {
        const result = await mockMongoDBConnection.testConnection();
        setDbDetails(result);
      } catch (error) {
        console.error("Error testing MongoDB connection:", error);
        toast({
          title: "Database Connection Error",
          description: "Could not connect to MongoDB",
          variant: "destructive",
        });
      }
    };
    
    checkDbConnection();
  }, [toast]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "operational":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Operational</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
      case "critical":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Status</h1>
        <Button 
          variant="outline" 
          onClick={refreshStats}
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Stats
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Connected</div>
            <p className="text-xs text-muted-foreground">Response time: {systemStats.dbResponse}ms</p>
            {dbDetails && (
              <div className="mt-2 text-xs">
                <span className="font-medium">Database:</span> {dbDetails.stats.databaseName}
                <br />
                <span className="font-medium">Collections:</span> {dbDetails.stats.collections.length}
                <br />
                <span className="font-medium">Size:</span> {dbDetails.stats.totalSizeInMB}MB
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Load</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.serverLoad}%</div>
            <Progress value={systemStats.serverLoad} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.memory}%</div>
            <Progress value={systemStats.memory} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.storage}%</div>
            <Progress value={systemStats.storage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Last backup: {systemStats.lastBackup}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="services">Services Status</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="collections">Database Collections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>System Services</CardTitle>
              <CardDescription>
                Status of all system services and components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStats.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="font-medium">{service.name}</div>
                    <div className="flex items-center space-x-4">
                      {service.message && (
                        <span className="text-sm text-muted-foreground">{service.message}</span>
                      )}
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>
                Recent system events and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStats.recentActions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 py-2 border-b last:border-0">
                    {getActionIcon(action.type)}
                    <div>
                      <p className="font-medium">{action.action}</p>
                      <p className="text-sm text-muted-foreground">{action.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collections">
          <Card>
            <CardHeader>
              <CardTitle>Database Collections</CardTitle>
              <CardDescription>
                MongoDB collections and document counts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dbDetails ? (
                <div className="space-y-4">
                  {dbDetails.stats.collections.map((collection, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="font-medium">{collection.name}</div>
                      <div className="flex items-center space-x-6">
                        <div className="text-sm">
                          <span className="font-medium">{collection.documentCount}</span> documents
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{collection.sizeInMB}</span> MB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSystemPage;
