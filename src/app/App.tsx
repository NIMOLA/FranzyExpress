import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { Tracking } from "./components/Tracking";
import { About } from "./components/About";
import { StatsAndCTA } from "./components/StatsAndCTA";
import { Footer } from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { AdminDashboard } from "./components/AdminDashboard";
import { AuthModal } from "./components/AuthModal";
import { UserGuide } from "./components/UserGuide";
import { Toaster } from "./components/ui/sonner";
import { projectId } from "./utils/supabase/info";

export default function App() {
  const [adminAccessToken, setAdminAccessToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVerifyingSession, setIsVerifyingSession] = useState(true);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotInitialAction, setChatbotInitialAction] = useState<"booking" | "inquiry" | "tracking" | undefined>();

  // Verify stored sessions on load
  useEffect(() => {
    const storedAdminToken = localStorage.getItem("franzy_admin_token");
    const storedUserToken = localStorage.getItem("franzy_user_token");
    
    const verifyBoth = async () => {
      if (storedAdminToken) {
        await verifyAdminToken(storedAdminToken);
      }
      if (storedUserToken) {
        await verifyUserToken(storedUserToken);
      }
      setIsVerifyingSession(false);
    };
    
    verifyBoth();
  }, []);

  const verifyAdminToken = async (token: string) => {
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6db4a86a`;
      const response = await fetch(`${baseUrl}/admin/verify`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setAdminAccessToken(token);
        setAdminUser(result.user);
      } else {
        localStorage.removeItem("franzy_admin_token");
      }
    } catch (error) {
      console.error("Error verifying admin token:", error);
      localStorage.removeItem("franzy_admin_token");
    }
  };

  const verifyUserToken = async (token: string) => {
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6db4a86a`;
      const response = await fetch(`${baseUrl}/user/verify`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setUserAccessToken(token);
        setUser(result.user);
      } else {
        localStorage.removeItem("franzy_user_token");
      }
    } catch (error) {
      console.error("Error verifying user token:", error);
      localStorage.removeItem("franzy_user_token");
    }
  };

  const handleAdminLogin = (accessToken: string, adminUserData: any) => {
    setAdminAccessToken(accessToken);
    setAdminUser(adminUserData);
    localStorage.setItem("franzy_admin_token", accessToken);
  };

  const handleUserLogin = (accessToken: string, userData: any) => {
    setUserAccessToken(accessToken);
    setUser(userData);
    localStorage.setItem("franzy_user_token", accessToken);
  };

  const handleAdminLogout = () => {
    setAdminAccessToken(null);
    setAdminUser(null);
    localStorage.removeItem("franzy_admin_token");
  };

  const handleUserLogout = () => {
    setUserAccessToken(null);
    setUser(null);
    localStorage.removeItem("franzy_user_token");
  };

  const handleLogout = () => {
    // Log out from both if logged in
    if (adminAccessToken) handleAdminLogout();
    if (userAccessToken) handleUserLogout();
  };

  // Determine which user to show in header (admin takes precedence)
  const displayUser = adminUser || user;
  const isAdmin = !!adminUser;

  // Functions to open chatbot with specific actions
  const openChatbotForBooking = () => {
    setChatbotInitialAction("booking");
    setChatbotOpen(true);
  };

  const openChatbotForInquiry = () => {
    setChatbotInitialAction("inquiry");
    setChatbotOpen(true);
  };

  const handleChatbotOpenChange = (isOpen: boolean) => {
    setChatbotOpen(isOpen);
    if (!isOpen) {
      // Reset initial action when closing
      setTimeout(() => setChatbotInitialAction(undefined), 300);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={displayUser}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main>
        <Hero onBookRider={openChatbotForBooking} />
        <Features />
        <Pricing />
        <Tracking />
        <About />
        <StatsAndCTA 
          onBookDelivery={openChatbotForBooking}
          onAskQuestion={openChatbotForInquiry}
        />
      </main>
      <Footer />
      <ChatbotWidget 
        externalOpen={chatbotOpen}
        onOpenChange={handleChatbotOpenChange}
        initialAction={chatbotInitialAction}
      />
      
      {/* Auth Modal */}
      {!isVerifyingSession && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAdminLoginSuccess={handleAdminLogin}
          onUserLoginSuccess={handleUserLogin}
        />
      )}
      
      {/* Admin Dashboard - only show if admin is logged in */}
      {adminAccessToken && (
        <AdminDashboard
          accessToken={adminAccessToken}
          user={adminUser}
          onLogout={handleAdminLogout}
        />
      )}
      
      <Toaster />
      <UserGuide />
    </div>
  );
}