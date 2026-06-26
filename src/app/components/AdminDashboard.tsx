import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Package, MessageSquare, Clock, X, LogOut, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { toast } from "sonner";

interface Order {
  id: string;
  customerName: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  packageDetails: string;
  timestamp: string;
  status: string;
}

interface Inquiry {
  id: string;
  name: string;
  contact: string;
  message: string;
  timestamp: string;
  status: string;
}

interface AdminDashboardProps {
  accessToken: string | null;
  user: any;
  onLogout: () => void;
}

export function AdminDashboard({ accessToken, user, onLogout }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "inquiries">("orders");
  const [isVisible, setIsVisible] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAllInquiries, setShowAllInquiries] = useState(false);
  
  const INITIAL_DISPLAY_COUNT = 5; // Show 5 items initially

  // Helper function to check if an item is new (within last 24 hours)
  const isNew = (timestamp: string) => {
    const itemDate = new Date(timestamp);
    const now = new Date();
    const hoursDiff = (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 24;
  };

  const fetchData = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6db4a86a`;
      const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const [ordersRes, inquiriesRes] = await Promise.all([
        fetch(`${baseUrl}/orders`, { headers }),
        fetch(`${baseUrl}/inquiries`, { headers }),
      ]);

      if (!ordersRes.ok || !inquiriesRes.ok) {
        toast.error("Session expired. Please login again.");
        onLogout();
        return;
      }

      const ordersData = await ordersRes.json();
      const inquiriesData = await inquiriesRes.json();

      if (ordersData.success) setOrders(ordersData.orders);
      if (inquiriesData.success) setInquiries(inquiriesData.inquiries);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
      // Refresh data every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [accessToken]);

  // Sort orders and inquiries by timestamp (newest first)
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  const sortedInquiries = [...inquiries].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Get displayed items based on "show all" state
  const displayedOrders = showAllOrders ? sortedOrders : sortedOrders.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedInquiries = showAllInquiries ? sortedInquiries : sortedInquiries.slice(0, INITIAL_DISPLAY_COUNT);
  
  const hasMoreOrders = sortedOrders.length > INITIAL_DISPLAY_COUNT;
  const hasMoreInquiries = sortedInquiries.length > INITIAL_DISPLAY_COUNT;
  const newOrdersCount = sortedOrders.filter(order => isNew(order.timestamp)).length;
  const newInquiriesCount = sortedInquiries.filter(inquiry => isNew(inquiry.timestamp)).length;

  if (!accessToken) {
    return null;
  }

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-24 md:bottom-28 right-4 md:right-6 z-40 px-3 md:px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-xs md:text-sm text-white hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
      >
        📊 Admin Dashboard
        {(newOrdersCount > 0 || newInquiriesCount > 0) && (
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#a8ff35] text-black text-xs">
            {newOrdersCount + newInquiriesCount}
          </span>
        )}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-2 md:inset-4 z-50 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] p-4 md:p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl text-black">Admin Dashboard</h2>
          <p className="text-xs md:text-sm text-black/70">
            Welcome, {user?.name || user?.email}
          </p>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            onClick={() => {
              onLogout();
              setIsVisible(false);
            }}
            variant="ghost"
            size="sm"
            className="text-black hover:bg-black/10 text-xs md:text-sm"
          >
            <LogOut className="w-3 md:w-4 h-3 md:h-4 md:mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="icon"
            className="text-black hover:bg-black/10 w-8 h-8 md:w-auto"
          >
            <X className="w-4 md:w-5 h-4 md:h-5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 md:gap-2 p-2 md:p-4 bg-black/50 border-b border-white/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-all text-xs md:text-sm whitespace-nowrap relative ${
            activeTab === "orders"
              ? "bg-[#00d4ff] text-black"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          <Package className="w-3 md:w-4 h-3 md:h-4" />
          Orders ({orders.length})
          {newOrdersCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#a8ff35] text-black text-xs">
              {newOrdersCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-all text-xs md:text-sm whitespace-nowrap relative ${
            activeTab === "inquiries"
              ? "bg-[#00d4ff] text-black"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          <MessageSquare className="w-3 md:w-4 h-3 md:h-4" />
          Inquiries ({inquiries.length})
          {newInquiriesCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#a8ff35] text-black text-xs">
              {newInquiriesCount}
            </span>
          )}
        </button>
        <button
          onClick={fetchData}
          className="ml-auto px-3 md:px-4 py-2 bg-white/5 text-gray-400 hover:bg-white/10 rounded-lg transition-all text-xs md:text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-sm md:text-base text-gray-400">Loading...</div>
          </div>
        ) : activeTab === "orders" ? (
          <div className="space-y-3 md:space-y-4">
            {sortedOrders.length === 0 ? (
              <div className="text-center text-gray-400 py-12 text-sm md:text-base">
                No orders yet
              </div>
            ) : (
              <>
                {displayedOrders.map((order) => {
                  const orderIsNew = isNew(order.timestamp);
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all relative"
                    >
                      {/* New Badge */}
                      {orderIsNew && (
                        <div className="absolute top-3 md:top-4 right-3 md:right-4">
                          <div className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-[#a8ff35]/20 border border-[#a8ff35]/50">
                            <Sparkles className="w-3 h-3 text-[#a8ff35]" />
                            <span className="text-xs text-[#a8ff35]">NEW</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 md:mb-4 gap-2">
                        <div className={orderIsNew ? "pr-16" : ""}>
                          <h3 className="text-sm md:text-base text-[#00d4ff]">{order.id}</h3>
                          <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3" />
                            {new Date(order.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span className="px-2 md:px-3 py-1 bg-[#00d4ff]/20 text-[#00d4ff] rounded-full text-xs self-start">
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Customer</p>
                          <p className="text-white text-sm">{order.customerName}</p>
                          <p className="text-gray-400 text-xs">{order.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Package</p>
                          <p className="text-white text-sm">{order.packageDetails}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Pickup</p>
                          <p className="text-white text-sm">{order.pickupLocation}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Delivery</p>
                          <p className="text-white text-sm">{order.deliveryLocation}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                {/* See More Button */}
                {hasMoreOrders && !showAllOrders && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAllOrders(true)}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/50 rounded-xl transition-all text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 group"
                  >
                    <span>See More Orders ({sortedOrders.length - INITIAL_DISPLAY_COUNT} older)</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </motion.button>
                )}
                
                {/* Show Less Button */}
                {showAllOrders && hasMoreOrders && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAllOrders(false)}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/50 rounded-xl transition-all text-sm text-gray-400 hover:text-white"
                  >
                    Show Less
                  </motion.button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {sortedInquiries.length === 0 ? (
              <div className="text-center text-gray-400 py-12 text-sm md:text-base">
                No inquiries yet
              </div>
            ) : (
              <>
                {displayedInquiries.map((inquiry) => {
                  const inquiryIsNew = isNew(inquiry.timestamp);
                  return (
                    <motion.div
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all relative"
                    >
                      {/* New Badge */}
                      {inquiryIsNew && (
                        <div className="absolute top-3 md:top-4 right-3 md:right-4">
                          <div className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-[#a8ff35]/20 border border-[#a8ff35]/50">
                            <Sparkles className="w-3 h-3 text-[#a8ff35]" />
                            <span className="text-xs text-[#a8ff35]">NEW</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 md:mb-4 gap-2">
                        <div className={inquiryIsNew ? "pr-16" : ""}>
                          <h3 className="text-sm md:text-base text-[#00d4ff]">{inquiry.id}</h3>
                          <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3" />
                            {new Date(inquiry.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span className="px-2 md:px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs self-start">
                          {inquiry.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 md:space-y-3 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">From</p>
                          <p className="text-white text-sm">{inquiry.name || "Anonymous"}</p>
                          <p className="text-gray-400 text-xs">{inquiry.contact || "No contact provided"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Message</p>
                          <p className="text-white text-sm">{inquiry.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                {/* See More Button */}
                {hasMoreInquiries && !showAllInquiries && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAllInquiries(true)}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/50 rounded-xl transition-all text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 group"
                  >
                    <span>See More Inquiries ({sortedInquiries.length - INITIAL_DISPLAY_COUNT} older)</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </motion.button>
                )}
                
                {/* Show Less Button */}
                {showAllInquiries && hasMoreInquiries && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAllInquiries(false)}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/50 rounded-xl transition-all text-sm text-gray-400 hover:text-white"
                  >
                    Show Less
                  </motion.button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}