
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { AIAssistantProvider } from "@/contexts/AIAssistantContext";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Pages
import HomePage from "@/pages/HomePage";
import EventsPage from "@/pages/EventsPage";
import EventDetailsPage from "@/pages/EventDetailsPage";
import CreateEventPage from "@/pages/CreateEventPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import StudentDashboardPage from "@/pages/StudentDashboardPage";
import OrganizerDashboardPage from "@/pages/OrganizerDashboardPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import TicketsPage from "@/pages/TicketsPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";
import AIAssistantPage from "@/pages/AIAssistantPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <AuthProvider>
          <AIAssistantProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="events" element={<EventsPage />} />
                  <Route path="events/:id" element={<EventDetailsPage />} />
                  <Route path="assistant" element={<AIAssistantPage />} />
                </Route>

                {/* Auth routes */}
                <Route path="auth" element={<AuthLayout />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignupPage />} />
                  <Route path="forgot-password" element={<div className="p-6 text-center">Password reset functionality coming soon!</div>} />
                </Route>

                {/* Student routes */}
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<StudentDashboardPage />} />
                  <Route path="tickets" element={<TicketsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Organizer routes */}
                <Route path="organizer" element={<DashboardLayout isOrganizer={true} />}>
                  <Route index element={<OrganizerDashboardPage />} />
                  <Route path="create-event" element={<CreateEventPage />} />
                  <Route path="events" element={<div className="p-6">Your created events will appear here</div>} />
                  <Route path="registrations" element={<div className="p-6">Your event registrations will appear here</div>} />
                  <Route path="analytics" element={<div className="p-6">Event analytics will appear here</div>} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Admin routes */}
                <Route path="admin" element={<DashboardLayout isAdmin={true} />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="events" element={<div className="p-6">All events management will appear here</div>} />
                  <Route path="users" element={<div className="p-6">User management will appear here</div>} />
                  <Route path="approvals" element={<div className="p-6">Approval requests will appear here</div>} />
                  <Route path="system" element={<div className="p-6">System status will appear here</div>} />
                  <Route path="reports" element={<div className="p-6">Reports will appear here</div>} />
                  <Route path="settings" element={<div className="p-6">Settings will appear here</div>} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AIAssistantProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
