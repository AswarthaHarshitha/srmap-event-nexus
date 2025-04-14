
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
import OrganizerEventsPage from "@/pages/OrganizerEventsPage";
import OrganizerRegistrationsPage from "@/pages/OrganizerRegistrationsPage";
import OrganizerAnalyticsPage from "@/pages/OrganizerAnalyticsPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminEventsPage from "@/pages/AdminEventsPage";
import AdminReportsPage from "@/pages/AdminReportsPage";
import AdminSystemPage from "@/pages/AdminSystemPage";
import AdminSettingsPage from "@/pages/AdminSettingsPage";
import AdminApprovalsPage from "@/pages/AdminApprovalsPage";
import TicketsPage from "@/pages/TicketsPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";
import AIAssistantPage from "@/pages/AIAssistantPage";

// Authentication Guards
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleRoute } from "@/components/RoleRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

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

                {/* Student routes - protected for authenticated users */}
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<StudentDashboardPage />} />
                  <Route path="tickets" element={<TicketsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Organizer routes - protected for organizer role */}
                <Route 
                  path="organizer" 
                  element={
                    <RoleRoute allowedRoles={["organizer", "admin"]}>
                      <DashboardLayout isOrganizer={true} />
                    </RoleRoute>
                  }
                >
                  <Route index element={<OrganizerDashboardPage />} />
                  <Route path="create-event" element={<CreateEventPage />} />
                  <Route path="events" element={<OrganizerEventsPage />} />
                  <Route path="registrations" element={<OrganizerRegistrationsPage />} />
                  <Route path="analytics" element={<OrganizerAnalyticsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Admin routes - protected for admin role */}
                <Route 
                  path="admin" 
                  element={
                    <RoleRoute allowedRoles={["admin"]}>
                      <DashboardLayout isAdmin={true} />
                    </RoleRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="events" element={<AdminEventsPage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="approvals" element={<AdminApprovalsPage />} />
                  <Route path="system" element={<AdminSystemPage />} />
                  <Route path="reports" element={<AdminReportsPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
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
