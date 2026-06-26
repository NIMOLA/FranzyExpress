import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Lock, X, LogIn, UserPlus, User, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginSuccess: (accessToken: string, user: any) => void;
  onUserLoginSuccess: (accessToken: string, user: any) => void;
}

type UserType = "user" | "admin";
type AuthMode = "login" | "signup";

export function AuthModal({ 
  isOpen, 
  onClose, 
  onAdminLoginSuccess, 
  onUserLoginSuccess 
}: AuthModalProps) {
  const [userType, setUserType] = useState<UserType>("user");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    adminCode: "",
  });

  const resetForm = () => {
    setLoginData({ email: "", password: "" });
    setSignupData({ email: "", password: "", name: "", phone: "", adminCode: "" });
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6db4a86a`;
      const endpoint = userType === "admin" ? "/admin/login" : "/user/login";
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Welcome back, ${result.user.name || result.user.email}!`);
        
        if (userType === "admin") {
          onAdminLoginSuccess(result.accessToken, result.user);
        } else {
          onUserLoginSuccess(result.accessToken, result.user);
        }
        
        handleClose();
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6db4a86a`;
      const endpoint = userType === "admin" ? "/admin/signup" : "/user/signup";
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`${userType === "admin" ? "Admin" : "User"} account created! Please login.`);
        setAuthMode("login");
        setSignupData({ email: "", password: "", name: "", phone: "", adminCode: "" });
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                {userType === "admin" ? (
                  <Shield className="w-5 h-5 text-black" />
                ) : (
                  <User className="w-5 h-5 text-black" />
                )}
              </div>
              <div>
                <h2 className="text-xl text-black">
                  {userType === "admin" ? "Admin Access" : "Customer Portal"}
                </h2>
                <p className="text-xs text-black/70">FranzyXpress</p>
              </div>
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="icon"
              className="text-black hover:bg-black/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Type Toggle */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => {
                setUserType("user");
                resetForm();
              }}
              className={`flex-1 px-6 py-3 text-sm transition-all flex items-center justify-center gap-2 ${
                userType === "user"
                  ? "text-[#00d4ff] border-b-2 border-[#00d4ff] bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <User className="w-4 h-4" />
              Customer
            </button>
            <button
              onClick={() => {
                setUserType("admin");
                resetForm();
              }}
              className={`flex-1 px-6 py-3 text-sm transition-all flex items-center justify-center gap-2 ${
                userType === "admin"
                  ? "text-[#00d4ff] border-b-2 border-[#00d4ff] bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>

          {/* Auth Mode Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => {
                setAuthMode("login");
                resetForm();
              }}
              className={`flex-1 px-6 py-3 text-sm transition-all ${
                authMode === "login"
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => {
                setAuthMode("signup");
                resetForm();
              }}
              className={`flex-1 px-6 py-3 text-sm transition-all ${
                authMode === "signup"
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Sign Up
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {authMode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={userType === "admin" ? "admin@franzyxpress.com" : "your@email.com"}
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00d4ff] hover:bg-[#00b8e6] text-black"
                >
                  {isLoading ? "Logging in..." : `Login as ${userType === "admin" ? "Admin" : "Customer"}`}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                {userType === "admin" && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
                    <p className="text-xs text-yellow-500">
                      ⚠️ Admin setup requires a special code
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-300">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={userType === "admin" ? "admin@franzyxpress.com" : "your@email.com"}
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>

                {userType === "user" && (
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="080-XXX-XXXX"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      required
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                {userType === "admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="admin-code" className="text-gray-300">Admin Setup Code</Label>
                    <Input
                      id="admin-code"
                      type="password"
                      placeholder="Enter admin setup code"
                      value={signupData.adminCode}
                      onChange={(e) => setSignupData({ ...signupData, adminCode: e.target.value })}
                      required
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-xs text-gray-500">
                      Contact system administrator for setup code
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00d4ff] hover:bg-[#00b8e6] text-black"
                >
                  {isLoading ? "Creating Account..." : `Sign Up as ${userType === "admin" ? "Admin" : "Customer"}`}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
