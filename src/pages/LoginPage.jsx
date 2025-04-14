
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, LogIn, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const { login, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({ google: false, github: false });

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

  const handleGoogleLogin = async () => {
    setSocialLoading(prev => ({ ...prev, google: true }));
    
    try {
      const user = await googleLogin();
      
      toast({
        title: "Google Login Successful",
        description: `Welcome, ${user.name}`,
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
        title: "Google Login Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSocialLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleGithubLogin = async () => {
    setSocialLoading(prev => ({ ...prev, github: true }));
    
    try {
      const user = await githubLogin();
      
      toast({
        title: "GitHub Login Successful",
        description: `Welcome, ${user.name}`,
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
        title: "GitHub Login Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSocialLoading(prev => ({ ...prev, github: false }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0">
      <CardHeader className="space-y-2 text-center pb-6">
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Sign in to access your EVENTSPHERE account
        </CardDescription>
      </CardHeader>

      <CardContent>
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
                className="pl-10 border-gray-300 focus:border-srm-green focus:ring-srm-green"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/auth/forgot-password"
                className="text-sm font-medium text-srm-green hover:text-srm-green-dark transition-colors"
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
                className="pl-10 border-gray-300 focus:border-srm-green focus:ring-srm-green"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-srm-green text-white hover:bg-srm-green-dark transition-colors"
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

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              onClick={handleGoogleLogin}
              disabled={socialLoading.google}
            >
              {socialLoading.google ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-srm-green mr-2"></span>
              ) : (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              onClick={handleGithubLogin}
              disabled={socialLoading.github}
            >
              {socialLoading.github ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-srm-green mr-2"></span>
              ) : (
                <Github className="w-4 h-4 mr-2" />
              )}
              GitHub
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Not registered yet?{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-srm-green hover:text-srm-green-dark transition-colors"
          >
            Create an account
          </Link>
        </p>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg w-full">
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
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
