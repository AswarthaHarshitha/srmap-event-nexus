
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, UserCog, Shield, BookUser, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const mockUsers = [
  { 
    id: "usr1", 
    name: "John Doe", 
    email: "john.doe@srm.edu.in", 
    role: "student", 
    department: "Computer Science",
    status: "active",
    joined: "2023-05-15" 
  },
  { 
    id: "usr2", 
    name: "Jane Smith", 
    email: "jane.smith@srm.edu.in", 
    role: "student", 
    department: "Mechanical Engineering",
    status: "active",
    joined: "2023-06-22" 
  },
  { 
    id: "usr3", 
    name: "Robert Johnson", 
    email: "organizer@srm.edu.in", 
    role: "organizer", 
    department: "Event Management",
    status: "active",
    joined: "2023-04-10" 
  },
  { 
    id: "usr4", 
    name: "Sarah Williams", 
    email: "admin@srm.edu.in", 
    role: "admin", 
    department: "Administration",
    status: "active",
    joined: "2023-01-05" 
  },
  { 
    id: "usr5", 
    name: "Michael Brown", 
    email: "michael.brown@srm.edu.in", 
    role: "student", 
    department: "Electronics Engineering",
    status: "suspended",
    joined: "2023-07-30" 
  },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4 text-red-500" />;
      case "organizer":
        return <BookUser className="w-4 h-4 text-blue-500" />;
      default:
        return <UserIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Active</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "active" ? "suspended" : "active";
        
        toast({
          title: `User ${newStatus}`,
          description: `${user.name}'s account has been ${newStatus}`,
          variant: newStatus === "active" ? "success" : "destructive",
        });
        
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const changeUserRole = (userId, newRole) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        toast({
          title: "Role updated",
          description: `${user.name}'s role has been changed to ${newRole}`,
          variant: "success",
        });
        
        return { ...user, role: newRole };
      }
      return user;
    }));
  };

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button 
          variant="outline" 
          onClick={() => {
            toast({
              title: "Add User",
              description: "This feature is coming soon!",
              variant: "info",
            });
          }}
        >
          <UserCog className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="organizer">Organizer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(user.role)}
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Select 
                        defaultValue={user.role}
                        onValueChange={(value) => changeUserRole(user.id, value)}
                      >
                        <SelectTrigger className="h-8 w-24">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="organizer">Organizer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        variant={user.status === "active" ? "destructive" : "outline"} 
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No users found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
