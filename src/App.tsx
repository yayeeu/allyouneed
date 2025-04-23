import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster as HotToaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import MainLayout from "@/components/layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SMEDashboard from "./pages/SMEDashboard";
import StartupDashboard from "./pages/StartupDashboard";
import BrowseTools from "./pages/BrowseTools";
import Onboarding from "./pages/Onboarding";
import StartupDetail from "./pages/StartupDetail";
import NotFound from "./pages/NotFound";
import ChatbotPage from "./pages/Chatbot";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <HotToaster position="top-right" />
        <BrowserRouter>
          <MainLayout>
            <Chatbot />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<PublicRoute restricted><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute restricted><Signup /></PublicRoute>} />
              <Route path="/browse" element={<BrowseTools />} />
              <Route path="/chat" element={<ChatbotPage />} />
              <Route path="/startup/:id" element={<StartupDetail />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <SMEDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/sme-dashboard" 
                element={
                  <ProtectedRoute>
                    <SMEDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/startup-dashboard" 
                element={
                  <ProtectedRoute>
                    <StartupDashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
