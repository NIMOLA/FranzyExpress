import { motion } from "motion/react";
import { MapPin, CheckCircle, Users, Store, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

interface StatsAndCTAProps {
  onBookDelivery: () => void;
  onAskQuestion: () => void;
}

export function StatsAndCTA({ onBookDelivery, onAskQuestion }: StatsAndCTAProps) {
  const stats = [
    { icon: CheckCircle, value: "95%", label: "Same-Day Completion Rate" },
    { icon: Users, value: "100%", label: "Local Riders" },
    { icon: Store, value: "15+", label: "Partner Businesses" },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Delivery Network Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 lg:mb-32"
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Central Hub */}
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <motion.div
                className="relative w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0099cc] shadow-[0_0_60px_rgba(0,212,255,0.6)] flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPin className="w-12 md:w-16 h-12 md:h-16 text-black" />
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Connecting Line to Center */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-8 md:h-12 w-px bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent opacity-30" />
                    
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center hover:border-[#00d4ff]/50 transition-all duration-300">
                      <div className="w-12 md:w-14 h-12 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                        <Icon className="w-6 md:w-7 h-6 md:h-7 text-[#00d4ff]" />
                      </div>
                      <div className="text-2xl md:text-3xl lg:text-4xl mb-1 md:mb-2 text-[#00d4ff]">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Animated Delivery Pins */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-[#a8ff35] shadow-[0_0_10px_rgba(168,255,53,0.6)]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Final Trust Block & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Trust Headline */}
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#a8ff35]/10 border border-[#a8ff35]/30 mb-4 md:mb-6">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a8ff35] border-2 border-black"
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm text-[#a8ff35]">★★★★★ Trusted by Ekpoma</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6">
              Trusted by <span className="text-[#00d4ff]">Ekpoma</span> —{" "}
              <span className="relative inline-block">
                Anytime, Anywhere.
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-[#a8ff35]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </span>
            </h2>

            <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust FranzyXpress for their delivery needs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button
              size="lg"
              onClick={onBookDelivery}
              className="w-full sm:w-auto bg-[#00d4ff] hover:bg-[#00b8e6] text-black shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all group text-sm md:text-base"
            >
              Order Your Delivery Now
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={onAskQuestion}
              className="w-full sm:w-auto border-white/20 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all group text-sm md:text-base"
            >
              <MessageCircle className="w-4 md:w-5 h-4 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
              Ask a Question?
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
            Available 24/7 for urgent deliveries • ₦1,000 minimum order
          </p>
        </motion.div>
      </div>
    </section>
  );
}