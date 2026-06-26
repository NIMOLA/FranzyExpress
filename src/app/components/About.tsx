import { motion } from "motion/react";
import { Heart, Users, MapPin, Zap, Shield, TrendingUp } from "lucide-react";
import aboutImage from "figma:asset/588fae39d5438ff1eb9ba5d1e797a76fe3c8a727.png";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We're not just a service — we're your neighbors, friends, and fellow Ekpomans.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Same-day delivery across Ekpoma because we know the streets like our own backyard.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Every rider is verified, trained, and committed to handling your packages with care.",
  },
];

const stats = [
  { value: "2,000+", label: "Deliveries Completed" },
  { value: "50+", label: "Local Riders" },
  { value: "95%", label: "On-Time Rate" },
  { value: "24/7", label: "Available" },
];

export function About() {
  return (
    <section className="py-16 md:py-20 lg:py-32 relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 255, 53, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00d4ff]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#a8ff35]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#a8ff35]/10 border border-[#a8ff35]/30 mb-4 md:mb-6">
            <span className="text-xl md:text-2xl">🚀</span>
            <span className="text-xs md:text-sm text-[#a8ff35]\">Our Story</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6">
            Built for <span className="text-[#00d4ff]">Ekpoma</span>.{" "}
            Trusted by <span className="text-[#a8ff35]">You</span>.
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4 md:space-y-6">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                FranzyXpress isn't just another delivery service. We're your neighbors, 
                students, and entrepreneurs who know Ekpoma's streets better than anyone.
              </p>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Our mission is simple: make delivery{" "}
                <span className="text-[#00d4ff]">fast</span>,{" "}
                <span className="text-[#a8ff35]">safe</span>, and{" "}
                <span className="text-white">affordable</span>{" "}
                for everyone — from small businesses to everyday students.
              </p>

              <div className="pt-4 md:pt-6">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 to-[#a8ff35]/10 border border-[#00d4ff]/30">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-[#00d4ff] to-[#a8ff35] flex items-center justify-center"
                      >
                        <Users className="w-5 h-5 text-black" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-400">Our Tagline</div>
                    <div className="text-sm md:text-base text-[#00d4ff]">✨ "FranzyXpress – We move, you relax."</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Image with Stats Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Main Image */}
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={aboutImage}
                alt="FranzyXpress Rider Delivering to Happy Customer"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Stats Overlay */}
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/70 backdrop-blur-lg border border-white/10 rounded-lg p-1.5 md:p-2"
                  >
                    <div className="text-sm md:text-lg text-[#00d4ff] mb-0.5">{stat.value}</div>
                    <div className="text-[9px] md:text-[10px] text-gray-400 leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Location Badge */}
            <motion.div
              className="absolute -top-4 md:-top-6 -right-4 md:-right-6 px-3 md:px-4 py-2 md:py-3 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0099cc] shadow-[0_0_30px_rgba(0,212,255,0.6)] flex items-center gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="w-4 md:w-5 h-4 md:h-5 text-black" />
              <span className="text-xs md:text-sm text-black">Ekpoma, Nigeria</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl text-center mb-8 md:mb-12">
            What Makes Us <span className="text-[#00d4ff]">Different</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-[#00d4ff]/50 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#00d4ff]/20 transition-all">
                      <Icon className="w-6 md:w-7 h-6 md:h-7 text-[#00d4ff]" />
                    </div>

                    {/* Content */}
                    <h4 className="text-lg md:text-xl mb-2 md:mb-3">{value.title}</h4>
                    <p className="text-sm md:text-base text-gray-400">{value.description}</p>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent rounded-2xl" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl p-8 md:p-10 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #00d4ff 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 md:w-16 h-14 md:h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a8ff35] mb-4 md:mb-6">
                <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-black" />
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4">
                Our Mission
              </h3>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                To connect every corner of Ekpoma through reliable, affordable, 
                and tech-enabled delivery services — empowering local businesses, 
                supporting students, and building a stronger community, one delivery at a time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}