import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface GuideStep {
  title: string;
  description: string;
  targetId: string;
  position: "top" | "bottom" | "left" | "right";
}

const guideSteps: GuideStep[] = [
  {
    title: "👋 Welcome to FranzyXpress!",
    description: "Let's take a quick tour of Ekpoma's #1 delivery service. Click Next to get started!",
    targetId: "hero-section",
    position: "bottom",
  },
  {
    title: "📊 Live Delivery Stats",
    description: "See real-time statistics of successful deliveries, active riders, and happy customers in Ekpoma.",
    targetId: "stats-section",
    position: "top",
  },
  {
    title: "🚀 Book a Rider Instantly",
    description: "Click this button to open our AI chatbot and place an order in seconds. You'll get your rider's contact (Rider AB - 0911 922 1407) immediately!",
    targetId: "book-rider-button",
    position: "bottom",
  },
  {
    title: "⚡ Our Key Features",
    description: "Discover what makes FranzyXpress special: affordable pricing, verified local riders, and business partnerships.",
    targetId: "features-section",
    position: "top",
  },
  {
    title: "💰 Transparent Pricing",
    description: "Check out our simple pricing tiers starting from ₦1,000 for students, ₦1,500 for groceries, and ₦2,500 for businesses.",
    targetId: "pricing",
    position: "top",
  },
  {
    title: "💬 Custom Solutions via WhatsApp",
    description: "Need something special? Click 'Request a Quote' to chat with us directly on WhatsApp for custom logistics.",
    targetId: "custom-quote-section",
    position: "top",
  },
  {
    title: "🤖 24/7 AI Chatbot",
    description: "Click this chat icon anytime to book deliveries, track orders, or get help. Our AI assistant is always ready!",
    targetId: "chatbot-widget",
    position: "left",
  },
  {
    title: "🔐 Admin Access",
    description: "For FranzyXpress staff: Click here to login and manage orders, view customer requests, and monitor operations.",
    targetId: "login-button",
    position: "bottom",
  },
];

export function UserGuide() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  console.log("UserGuide component rendered. isActive:", isActive, "hasSeenGuide:", hasSeenGuide);

  useEffect(() => {
    // Check if user has seen the guide before
    const seen = localStorage.getItem("franzyxpress-guide-seen");
    console.log("UserGuide: Checking if guide was seen before:", seen);
    // Disabled auto-start to prevent the dark overlay issue
    if (false) {
      // Show guide after a short delay for first-time users
      console.log("UserGuide: First time user detected, showing guide in 1.5s");
      setTimeout(() => {
        console.log("UserGuide: Activating guide now");
        setIsActive(true);
      }, 1500);
    } else {
      console.log("UserGuide: User has seen guide before, showing Quick Tour button");
      setHasSeenGuide(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToElement(guideSteps[currentStep + 1].targetId);
    } else {
      finishGuide();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToElement(guideSteps[currentStep - 1].targetId);
    }
  };

  const finishGuide = () => {
    localStorage.setItem("franzyxpress-guide-seen", "true");
    setIsActive(false);
    setHasSeenGuide(true);
    setCurrentStep(0);
  };

  const skipGuide = () => {
    finishGuide();
  };

  const restartGuide = () => {
    setCurrentStep(0);
    setIsActive(true);
    scrollToElement(guideSteps[0].targetId);
  };

  const scrollToElement = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const getTooltipPosition = (targetId: string, position: string) => {
    const element = document.getElementById(targetId);
    if (!element) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    switch (position) {
      case "top":
        return {
          top: `${rect.top + scrollTop - 20}px`,
          left: `${rect.left + scrollLeft + rect.width / 2}px`,
          transform: "translate(-50%, -100%)",
        };
      case "bottom":
        return {
          top: `${rect.bottom + scrollTop + 20}px`,
          left: `${rect.left + scrollLeft + rect.width / 2}px`,
          transform: "translate(-50%, 0)",
        };
      case "left":
        return {
          top: `${rect.top + scrollTop + rect.height / 2}px`,
          left: `${rect.left + scrollLeft - 20}px`,
          transform: "translate(-100%, -50%)",
        };
      case "right":
        return {
          top: `${rect.top + scrollTop + rect.height / 2}px`,
          left: `${rect.right + scrollLeft + 20}px`,
          transform: "translate(0, -50%)",
        };
      default:
        return {
          top: `${rect.top + scrollTop}px`,
          left: `${rect.left + scrollLeft}px`,
        };
    }
  };

  const currentStepData = guideSteps[currentStep];

  return (
    <>
      {/* Restart Guide Button (for users who have completed it) */}
      {hasSeenGuide && !isActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={restartGuide}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 px-4 py-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0099cc] text-black font-medium shadow-lg hover:shadow-xl hover:shadow-[#00d4ff]/20 transition-all duration-300 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Quick Tour</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isActive && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[100]"
            />

            {/* Spotlight on Current Element */}
            <div className="fixed inset-0 z-[101] pointer-events-none">
              {currentStepData.targetId && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute"
                  style={{
                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.8)",
                    ...(() => {
                      const element = document.getElementById(currentStepData.targetId);
                      if (!element) return {};
                      const rect = element.getBoundingClientRect();
                      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                      return {
                        top: `${rect.top + scrollTop - 8}px`,
                        left: `${rect.left + scrollLeft - 8}px`,
                        width: `${rect.width + 16}px`,
                        height: `${rect.height + 16}px`,
                        borderRadius: "12px",
                        border: "3px solid #00d4ff",
                      };
                    })(),
                  }}
                />
              )}
            </div>

            {/* Tooltip */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-[102] w-[90vw] md:w-96 max-w-md"
              style={getTooltipPosition(currentStepData.targetId, currentStepData.position)}
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#00d4ff] rounded-2xl p-6 shadow-2xl">
                {/* DEBUG INFO */}
                <div className="mb-2 p-2 bg-red-500 text-white text-xs rounded">
                  Step: {currentStep} | Target: {currentStepData.targetId} | Found: {document.getElementById(currentStepData.targetId) ? "YES" : "NO"}
                </div>
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl text-white mb-2">
                      {currentStepData.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {currentStepData.description}
                    </p>
                  </div>
                  <button
                    onClick={skipGuide}
                    className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>
                      Step {currentStep + 1} of {guideSteps.length}
                    </span>
                    <span>{Math.round(((currentStep + 1) / guideSteps.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00d4ff] to-[#a8ff35]"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentStep + 1) / guideSteps.length) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>

                  {currentStep < guideSteps.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      className="flex-1 bg-[#00d4ff] hover:bg-[#00b8e6] text-black"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={finishGuide}
                      className="flex-1 bg-gradient-to-r from-[#00d4ff] to-[#a8ff35] hover:opacity-90 text-black"
                    >
                      Got It! 🎉
                    </Button>
                  )}
                </div>

                {/* Skip Button */}
                <button
                  onClick={skipGuide}
                  className="w-full mt-3 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Skip Tour
                </button>
              </div>

              {/* Arrow Pointer */}
              <div
                className="absolute w-4 h-4 bg-[#1a1a1a] border-[#00d4ff] rotate-45"
                style={{
                  ...(currentStepData.position === "top" && {
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    borderBottom: "2px solid #00d4ff",
                    borderRight: "2px solid #00d4ff",
                  }),
                  ...(currentStepData.position === "bottom" && {
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    borderTop: "2px solid #00d4ff",
                    borderLeft: "2px solid #00d4ff",
                  }),
                  ...(currentStepData.position === "left" && {
                    right: "-10px",
                    top: "50%",
                    transform: "translateY(-50%) rotate(45deg)",
                    borderTop: "2px solid #00d4ff",
                    borderRight: "2px solid #00d4ff",
                  }),
                  ...(currentStepData.position === "right" && {
                    left: "-10px",
                    top: "50%",
                    transform: "translateY(-50%) rotate(45deg)",
                    borderBottom: "2px solid #00d4ff",
                    borderLeft: "2px solid #00d4ff",
                  }),
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}