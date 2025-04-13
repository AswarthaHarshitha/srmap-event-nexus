
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, UserCheck, BookUser, ShieldCheck, Github } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

const SignupPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("student");
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student"
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password, role);
      toast({
        title: "Account created!",
        description: `Welcome to EVENTSPHERE! You've been registered as a ${role}.`,
      });
      
      // Redirect based on role
      switch (role) {
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
        title: "Registration failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    toast({
      title: `${provider} Sign Up`,
      description: "This feature is coming soon!",
      variant: "info",
    });
  };

  const roleOptions = [
    { value: "student", label: "Student", icon: UserCheck },
    { value: "organizer", label: "Event Organizer", icon: BookUser },
    { value: "admin", label: "Administrator", icon: ShieldCheck },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Create your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-medium text-srm-green hover:text-srm-green-dark"
        >
          Sign in
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </Label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="name"
              type="text"
              className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </Label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              type="email"
              className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            I am signing up as
          </Label>
          <div className="mt-2">
            <RadioGroup 
              value={role} 
              onValueChange={setRole}
              className="grid grid-cols-3 gap-4"
            >
              {roleOptions.map((option) => (
                <div key={option.value} className="relative">
                  <RadioGroupItem
                    value={option.value}
                    id={`role-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`role-${option.value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-srm-green peer-data-[state=checked]:bg-green-50 [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <option.icon className="mb-3 h-6 w-6" />
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </Label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </Label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value =>
                  value === password || "The passwords do not match"
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-srm-green focus:ring-srm-green border-gray-300 rounded"
            {...register("terms", {
              required: "You must agree to the terms and conditions",
            })}
          />
          <label
            htmlFor="terms"
            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
          >
            I agree to the{" "}
            <a
              href="#"
              className="font-medium text-srm-green hover:text-srm-green-dark"
            >
              terms and conditions
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-600">{errors.terms.message}</p>
        )}

        <div>
          <Button
            type="submit"
            className="w-full flex justify-center items-center bg-srm-green text-white hover:bg-srm-green-dark"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></span>
            ) : (
              <User className="h-5 w-5 mr-2" />
            )}
            Create Account
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignup('Google')}
          >
            <Mail className="w-5 h-5 mr-2" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialSignup('GitHub')}
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        <span className="block mb-1">For testing purposes:</span>
        <span className="block">Student: Register with any @srm.edu.in email</span>
        <span className="block">Organizer: Use organizer@srm.edu.in pattern</span>
        <span className="block">Admin: Use admin@srm.edu.in pattern</span>
      </div>
    </div>
  );
};

export default SignupPage;
