import { motion } from "motion/react";
import { MapPin, MessageSquare, CheckCircle, Clock, Navigation, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const trackingSteps = [
  {
    number: "1",
    icon: Smartphone,
    title: "Book a Delivery",
    description: "Through WhatsApp, website, or our chatbot — it's that easy.",
  },
  {
    number: "2",
    icon: Navigation,
    title: "Get Live Updates",
    description: "Our AI chatbot sends rider status + ETA directly to you.",
  },
  {
    number: "3",
    icon: CheckCircle,
    title: "Delivery Confirmed",
    description: "Instant notification when your item arrives safely.",
  },
];

const chatMessages = [
  {
    type: "bot",
    text: "Hi! Your delivery is on the way 🚴‍♂️",
    time: "2:34 PM",
  },
  {
    type: "bot",
    text: "Your rider is on College Road — ETA 12 mins ⏳",
    time: "2:35 PM",
  },
  {
    type: "user",
    text: "Great! Can you share the rider's location?",
    time: "2:36 PM",
  },
  {
    type: "bot",
    text: "Sure! 📍 Live location: [Map Link] - Rider is 2.3km away",
    time: "2:36 PM",
  },
];

export function Tracking() {
  const [activeMessage, setActiveMessage] = useState(0);

  return (
    <section className="py-16 md:py-20 lg:py-32 relative overflow-hidden" id="track">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00d4ff]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#a8ff35]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 mb-4 md:mb-6">
            <span className="text-xl md:text-2xl">📍</span>
            <span className="text-xs md:text-sm text-[#00d4ff]\">AI-Powered Tracking</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6">
            Track Your Delivery in{" "}
            <span className="relative inline-block">
              Real Time
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a8ff35]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </span>
            .
          </h2>
          
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            No guessing games. From the moment you book, Franzy keeps you updated. 
            Our AI-powered chatbot gives you live updates on rider location, estimated arrival, 
            and delivery confirmation — directly in WhatsApp or on our site.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left: How It Works Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4 md:space-y-6">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 md:gap-6 items-start group"
                  >
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-12 md:w-14 h-12 md:h-14 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0099cc] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all">
                      <span className="text-lg md:text-xl">{step.number}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1 md:pt-2">
                      <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <Icon className="w-5 md:w-6 h-5 md:h-6 text-[#00d4ff]" />
                        <h3 className="text-lg md:text-xl">{step.title}</h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Chatbot Mockup + Map Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Chatbot Interface */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
              {/* Chat Header */}
              <div className="flex items-center gap-2 md:gap-3 pb-3 md:pb-4 border-b border-white/10 mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center">
                  <MessageSquare className="w-4 md:w-5 h-4 md:h-5 text-black" />
                </div>
                <div className="flex-1">
                  <div className="text-xs md:text-sm\">FranzyBot</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#a8ff35] animate-pulse" />
                    Online
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 h-48 md:h-64 overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: index <= activeMessage ? 1 : 0.3, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.5 }}
                    className={`
                      flex
                      ${message.type === "user" ? "justify-end" : "justify-start"}
                    `}
                  >
                    <div className={`
                      max-w-[80%] rounded-2xl px-4 py-3
                      ${
                        message.type === "user"
                          ? "bg-[#00d4ff] text-black rounded-br-sm"
                          : "bg-white/10 text-white rounded-bl-sm"
                      }
                    `}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`
                        text-xs mt-1
                        ${message.type === "user" ? "text-black/60" : "text-gray-400"}
                      `}>
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-full border border-white/10">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none text-xs md:text-sm px-2"
                />
                <div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-[#00d4ff] flex items-center justify-center cursor-pointer hover:bg-[#00b8e6] transition-colors">
                  <MessageSquare className="w-3 md:w-4 h-3 md:h-4 text-black" />
                </div>
              </div>
            </div>

            {/* Floating Map Pin */}
            <motion.div
              className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-br from-[#a8ff35] to-[#8ed929] shadow-[0_0_30px_rgba(168,255,53,0.6)] flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="w-8 md:w-10 h-8 md:h-10 text-black" />
            </motion.div>

            {/* Animated Rider Status */}
            <motion.div
              className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-black/80 backdrop-blur-lg border border-[#00d4ff]/50 flex items-center gap-2 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <Clock className="w-3 md:w-4 h-3 md:h-4 text-[#00d4ff]" />
              <span className="text-xs md:text-sm">Rider is 5 mins away</span>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#00d4ff] hover:bg-[#00b8e6] text-black shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all text-sm md:text-base"
          >
            Track My Delivery
          </Button>
          <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
            Enter your tracking ID or phone number to get started
          </p>
        </motion.div>
      </div>
    </section>
  );
}