import { motion } from "motion/react";
import { MapPin, Users, TrendingUp, Bike } from "lucide-react";
import { Button } from "./ui/button";
import heroRiderImage from "figma:asset/b97de6249576c718f8f040064f6b5d4ff42784d8.png";

interface HeroProps {
  onBookRider: () => void;
}

export function Hero({ onBookRider }: HeroProps) {
  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 lg:pb-32 overflow-hidden" id="hero-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 212, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d4ff]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a8ff35]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 mb-4 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="text-xs md:text-sm tracking-wider text-[#00d4ff]">
                DELIVERED SAFE. DELIVERED FAST.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl mb-4 md:mb-6 leading-tight">
              Ekpoma's <span className="text-[#00d4ff]">#1</span> Local{" "}
              <span className="relative inline-block">
                Delivery
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a8ff35]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>{" "}
              Service.
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-6 md:mb-8 max-w-xl">
              From ₦1,000. Riders you trust, service you can count on.
            </p>

            {/* CTA Button */}
            <div className="mb-8 md:mb-10">
              <Button
                id="book-rider-button"
                onClick={onBookRider}
                size="lg"
                className="bg-[#00d4ff] hover:bg-[#00b8e6] text-black shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all group text-sm md:text-base"
              >
                <Bike className="w-4 md:w-5 h-4 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Book a Rider Now
              </Button>
              <p className="text-xs md:text-sm text-gray-500 mt-3">
                🚀 Quick delivery • 📍 Track in real-time • ⚡ Starting from ₦1,000
              </p>
            </div>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap gap-4 md:gap-8 mb-8 md:mb-10" id="stats-section">
              <div className="flex items-center gap-3">
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                  <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-[#00d4ff]" />
                </div>
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl">1,000+</div>
                  <div className="text-xs lg:text-sm text-gray-500">Deliveries Completed</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#a8ff35]/10 border border-[#a8ff35]/30 flex items-center justify-center">
                  <Users className="w-4 md:w-5 h-4 md:h-5 text-[#a8ff35]" />
                </div>
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl">500+</div>
                  <div className="text-xs lg:text-sm text-gray-500">Trusted Customers</div>
                </div>
              </div>
            </div>

            {/* Avatar Cluster */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-[#00d4ff] to-[#a8ff35] flex items-center justify-center"
                  >
                    <Users className="w-5 h-5 text-black" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Trusted by <span className="text-white">Students & Businesses</span>
              </p>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={heroRiderImage}
                alt="FranzyXpress Delivery Rider in Action"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Floating Delivery Pins */}
            <motion.div
              className="absolute -top-2 md:-top-4 -right-2 md:-right-4 w-16 md:w-20 h-16 md:h-20 rounded-full bg-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.6)] flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="w-8 md:w-10 h-8 md:h-10 text-black" />
            </motion.div>

            {/* Route Lines (decorative) */}
            <div className="absolute top-1/4 -left-4 md:-left-8 w-16 md:w-24 h-16 md:h-24 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M10,50 Q30,10 50,50 T90,50"
                  stroke="#00d4ff"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}