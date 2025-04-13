
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      
      // Show success toast
      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.name}`,
        variant: "success",
      });
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'organizer':
          navigate('/organizer');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Sign in to access your EVENTSPHERE account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="student@srm.edu.in"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-srm-green hover:text-srm-green-dark"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-srm-green text-white hover:bg-srm-green-dark"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></span>
          ) : (
            <LogIn className="h-5 w-5 mr-2" />
          )}
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => toast({
              title: "Google Sign In",
              description: "This feature is coming soon!",
              variant: "info",
            })}
          >
            <Mail className="w-4 h-4 mr-2" />
            Google
          </Button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Not registered yet?{" "}
        <Link
          to="/auth/signup"
          className="font-medium text-srm-green hover:text-srm-green-dark"
        >
          Create an account
        </Link>
      </p>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-center text-xs text-gray-500 font-medium mb-2">
          Demo login credentials:
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
          <div className="bg-white dark:bg-gray-700 p-2 rounded shadow-sm">
            <div className="font-semibold mb-1">Student</div>
            <div>student@srm.edu.in</div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-2 rounded shadow-sm">
            <div className="font-semibold mb-1">Organizer</div>
            <div>organizer@srm.edu.in</div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-2 rounded shadow-sm">
            <div className="font-semibold mb-1">Admin</div>
            <div>admin@srm.edu.in</div>
          </div>
        </div>
        <div className="text-center text-xs mt-2">(Any password will work for demo)</div>
      </div>
    </div>
  );
};

export default LoginPage;
