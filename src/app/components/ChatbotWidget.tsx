import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Package, MapPin, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  time: string;
}

type ConversationState = 
  | "initial"
  | "booking-pickup"
  | "booking-delivery"
  | "booking-package"
  | "booking-name"
  | "booking-phone"
  | "booking-confirm"
  | "inquiry-message"
  | "inquiry-name"
  | "inquiry-contact"
  | "inquiry-confirm"
  | "tracking";

interface OrderData {
  pickupLocation?: string;
  deliveryLocation?: string;
  packageDetails?: string;
  customerName?: string;
  phone?: string;
}

interface InquiryData {
  message?: string;
  name?: string;
  contact?: string;
}

interface ChatbotWidgetProps {
  externalOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  initialAction?: "booking" | "inquiry" | "tracking";
}

export function ChatbotWidget({ externalOpen, onOpenChange, initialAction }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "👋 Hi! I'm FranzyBot. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [conversationState, setConversationState] = useState<ConversationState>("initial");
  const [orderData, setOrderData] = useState<OrderData>({});
  const [inquiryData, setInquiryData] = useState<InquiryData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle external open control
  const effectiveIsOpen = externalOpen !== undefined ? externalOpen : isOpen;
  
  const toggleOpen = (newState: boolean) => {
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  // Handle initial action when chatbot is opened externally
  useEffect(() => {
    if (externalOpen && initialAction && messages.length === 1) {
      // Trigger the action based on initialAction prop
      setTimeout(() => {
        if (initialAction === "booking") {
          setConversationState("booking-pickup");
          addMessage("Great! Let's book your delivery. 📦 What's your pickup location in Ekpoma?", "bot");
        } else if (initialAction === "inquiry") {
          setConversationState("inquiry-message");
          addMessage("Sure! What would you like to know? Feel free to ask anything about our services.", "bot");
        } else if (initialAction === "tracking") {
          setConversationState("tracking");
          addMessage("📍 Please share your tracking ID or the phone number you used to book the delivery.", "bot");
        }
      }, 500);
    }
  }, [externalOpen, initialAction]);

  const quickActions = [
    { icon: Package, label: "Book Delivery", value: "I want to book a delivery", action: "booking" },
    { icon: MapPin, label: "Track Order", value: "Track my delivery", action: "tracking" },
    { icon: HelpCircle, label: "Ask Question", value: "I have a question", action: "inquiry" },
  ];

  const addMessage = (text: string, type: "bot" | "user") => {
    const newMessage: Message = {
      id: Date.now(),
      type,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6db4a86a`;
      const response = await fetch(`${baseUrl}/submit-order`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        addMessage(
          `✅ Order confirmed! Your order ID is ${result.orderId}.\n\n📞 Your Assigned Rider:\n🚴‍♂️ Rider AB - 0911 922 1407\n\nWe'll contact you shortly at ${orderData.phone}.\n\n⏱️ Expected delivery: 30-60 minutes\n📍 Track your delivery in real-time!`,
          "bot"
        );
        toast.success("Order submitted successfully!");
        // Reset state
        setOrderData({});
        setConversationState("initial");
      } else {
        addMessage("❌ Sorry, there was an error submitting your order. Please try again or call us directly.", "bot");
        toast.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      addMessage("❌ Connection error. Please check your internet and try again.", "bot");
      toast.error("Connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitInquiry = async () => {
    setIsSubmitting(true);
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6db4a86a`;
      const response = await fetch(`${baseUrl}/submit-inquiry`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });

      const result = await response.json();

      if (result.success) {
        addMessage(
          `✅ Thank you! We've received your inquiry (ID: ${result.inquiryId}). We'll get back to you as soon as possible!`,
          "bot"
        );
        toast.success("Inquiry submitted successfully!");
        // Reset state
        setInquiryData({});
        setConversationState("initial");
      } else {
        addMessage("❌ Sorry, there was an error submitting your inquiry. Please try again.", "bot");
        toast.error("Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      addMessage("❌ Connection error. Please check your internet and try again.", "bot");
      toast.error("Connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isSubmitting) return;

    const userInput = inputValue.trim();
    addMessage(userInput, "user");
    setInputValue("");

    // Handle conversation flow
    setTimeout(() => {
      switch (conversationState) {
        case "initial":
          // Auto-detect intent
          if (userInput.toLowerCase().includes("book") || userInput.toLowerCase().includes("delivery")) {
            setConversationState("booking-pickup");
            addMessage("Great! Let's book your delivery. 📦 What's your pickup location in Ekpoma?", "bot");
          } else if (userInput.toLowerCase().includes("track")) {
            setConversationState("tracking");
            addMessage("📍 Please share your tracking ID or the phone number you used to book the delivery.", "bot");
          } else if (userInput.toLowerCase().includes("question") || userInput.toLowerCase().includes("help") || userInput.toLowerCase().includes("ask")) {
            setConversationState("inquiry-message");
            addMessage("Sure! What would you like to know? Feel free to ask anything about our services.", "bot");
          } else {
            addMessage("I can help you with:\n• Booking a delivery\n• Tracking your order\n• Answering questions\n\nWhat would you like to do?", "bot");
          }
          break;

        case "booking-pickup":
          setOrderData((prev) => ({ ...prev, pickupLocation: userInput }));
          setConversationState("booking-delivery");
          addMessage(`Got it! Pickup from ${userInput}. Now, where should we deliver to?`, "bot");
          break;

        case "booking-delivery":
          setOrderData((prev) => ({ ...prev, deliveryLocation: userInput }));
          setConversationState("booking-package");
          addMessage(`Perfect! Delivering to ${userInput}. What are you sending? (e.g., documents, food, package)`, "bot");
          break;

        case "booking-package":
          setOrderData((prev) => ({ ...prev, packageDetails: userInput }));
          setConversationState("booking-name");
          addMessage("Great! What's your name?", "bot");
          break;

        case "booking-name":
          setOrderData((prev) => ({ ...prev, customerName: userInput }));
          setConversationState("booking-phone");
          addMessage("Thanks! What's your phone number?", "bot");
          break;

        case "booking-phone":
          setOrderData((prev) => ({ ...prev, phone: userInput }));
          setConversationState("booking-confirm");
          const tempOrderData = { ...orderData, phone: userInput };
          addMessage(
            `Perfect! Let me confirm your order:\n\n📍 Pickup: ${tempOrderData.pickupLocation}\n📍 Delivery: ${tempOrderData.deliveryLocation}\n📦 Package: ${tempOrderData.packageDetails}\n👤 Name: ${tempOrderData.customerName}\n📱 Phone: ${tempOrderData.phone}\n\nType "CONFIRM" to place your order or "CANCEL" to start over.`,
            "bot"
          );
          break;

        case "booking-confirm":
          if (userInput.toLowerCase() === "confirm") {
            submitOrder();
          } else if (userInput.toLowerCase() === "cancel") {
            setOrderData({});
            setConversationState("initial");
            addMessage("Order cancelled. How else can I help you?", "bot");
          } else {
            addMessage("Please type CONFIRM to place your order or CANCEL to start over.", "bot");
          }
          break;

        case "inquiry-message":
          setInquiryData((prev) => ({ ...prev, message: userInput }));
          setConversationState("inquiry-name");
          addMessage("Thanks for your question! What's your name?", "bot");
          break;

        case "inquiry-name":
          setInquiryData((prev) => ({ ...prev, name: userInput }));
          setConversationState("inquiry-contact");
          addMessage("And how can we reach you? (phone or email)", "bot");
          break;

        case "inquiry-contact":
          setInquiryData((prev) => ({ ...prev, contact: userInput }));
          setConversationState("inquiry-confirm");
          const tempInquiryData = { ...inquiryData, contact: userInput };
          addMessage(
            `Let me confirm:\n\n💬 Question: ${tempInquiryData.message}\n👤 Name: ${tempInquiryData.name}\n📱 Contact: ${tempInquiryData.contact}\n\nType "SEND" to submit or "CANCEL" to start over.`,
            "bot"
          );
          break;

        case "inquiry-confirm":
          if (userInput.toLowerCase() === "send") {
            submitInquiry();
          } else if (userInput.toLowerCase() === "cancel") {
            setInquiryData({});
            setConversationState("initial");
            addMessage("Inquiry cancelled. How else can I help you?", "bot");
          } else {
            addMessage("Please type SEND to submit your inquiry or CANCEL to start over.", "bot");
          }
          break;

        case "tracking":
          addMessage(
            `Looking up tracking info for: ${userInput}\n\n📍 For real-time tracking, please call us at 080-FRANZY-XP or check your SMS for the tracking link. Our system will be fully online soon!`,
            "bot"
          );
          setConversationState("initial");
          setTimeout(() => {
            addMessage("Anything else I can help you with?", "bot");
          }, 1000);
          break;

        default:
          addMessage("I'm here to help! What would you like to do?", "bot");
          setConversationState("initial");
      }
    }, 800);
  };

  const handleQuickAction = (action: string, actionType: string) => {
    setInputValue(action);
    // Trigger the message send after a short delay
    setTimeout(() => {
      if (!inputValue.trim() && !isSubmitting) {
        addMessage(action, "user");
        setInputValue("");

        setTimeout(() => {
          if (actionType === "booking") {
            setConversationState("booking-pickup");
            addMessage("Great! Let's book your delivery. 📦 What's your pickup location in Ekpoma?", "bot");
          } else if (actionType === "tracking") {
            setConversationState("tracking");
            addMessage("📍 Please share your tracking ID or the phone number you used to book the delivery.", "bot");
          } else if (actionType === "inquiry") {
            setConversationState("inquiry-message");
            addMessage("Sure! What would you like to know? Feel free to ask anything about our services.", "bot");
          }
        }, 800);
      }
    }, 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        id="chatbot-widget"
        onClick={() => toggleOpen(!effectiveIsOpen)}
        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 w-14 md:w-16 h-14 md:h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0099cc] shadow-[0_0_30px_rgba(0,212,255,0.5)] flex items-center justify-center group hover:shadow-[0_0_40px_rgba(0,212,255,0.7)] transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {effectiveIsOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 md:w-7 h-6 md:h-7 text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 md:w-7 h-6 md:h-7 text-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Dot */}
        {!effectiveIsOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 md:w-4 h-3 md:h-4 rounded-full bg-[#a8ff35] border-2 border-black"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {effectiveIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[calc(100vw-2rem)]"
          >
            <div className="bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-[#00d4ff] to-[#0099cc] p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageSquare className="w-5 md:w-6 h-5 md:h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base text-black">FranzyBot</h3>
                    <div className="flex items-center gap-1.5 text-xs text-black/70">
                      <div className="w-2 h-2 rounded-full bg-[#a8ff35] animate-pulse" />
                      <span>Online • AI-Powered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[350px] md:h-[400px] overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-black/50 to-black/80">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[85%] rounded-2xl px-4 py-3
                        ${
                          message.type === "user"
                            ? "bg-[#00d4ff] text-black rounded-br-sm"
                            : "bg-white/10 text-white rounded-bl-sm border border-white/10"
                        }
                      `}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      <p
                        className={`
                          text-xs mt-1.5
                          ${message.type === "user" ? "text-black/60" : "text-gray-400"}
                        `}
                      >
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Quick Actions - Show if only initial message */}
                {messages.length === 1 && conversationState === "initial" && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-gray-400 text-center mb-3">Quick Actions</p>
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={action.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          onClick={() => handleQuickAction(action.value, action.action)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-all">
                            <Icon className="w-5 h-5 text-[#00d4ff]" />
                          </div>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {action.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* Loading indicator */}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 text-white rounded-2xl rounded-bl-sm border border-white/10 px-4 py-3">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 md:p-4 bg-black/80 border-t border-white/10">
                <div className="flex items-center gap-2 p-2 bg-white/5 rounded-full border border-white/10 focus-within:border-[#00d4ff]/50 transition-all">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    disabled={isSubmitting}
                    className="flex-1 bg-transparent outline-none text-xs md:text-sm px-2 md:px-3 py-1.5 text-white placeholder:text-gray-500 disabled:opacity-50"
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={isSubmitting}
                    className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-[#00d4ff] hover:bg-[#00b8e6] text-black p-0 flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="w-3 md:w-4 h-3 md:h-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-2 md:mt-3">
                  Powered by Franzy AI • Instant responses
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}