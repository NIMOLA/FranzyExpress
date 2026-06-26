import { motion } from "motion/react";
import { DollarSign, Zap, Building2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    number: "01",
    icon: DollarSign,
    title: "Affordable Pricing.",
    description: "Deliveries from ₦1,000 — budget-friendly for students and businesses.",
    highlighted: false,
  },
  {
    number: "02",
    icon: Zap,
    title: "Fast & Reliable Riders.",
    description: "Same-day dispatch across Ekpoma. Riders trained, verified, and trusted.",
    highlighted: true,
    cta: "Book a Rider",
  },
  {
    number: "03",
    icon: Building2,
    title: "Built for Businesses.",
    description: "Discounts and partnerships for restaurants, vendors, and shops.",
    highlighted: false,
  },
];

export function Features() {
  return (
    <section className="py-16 md:py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-black to-[#0a0a0a]" id="features-section">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#00d4ff] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#a8ff35] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-5xl mb-3 md:mb-4">
            Your trusted partner in{" "}
            <span className="text-[#00d4ff]">every delivery</span>.
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Built for the Ekpoma community, powered by local expertise.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  relative group rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 overflow-hidden
                  ${
                    feature.highlighted
                      ? "bg-gradient-to-br from-[#00d4ff] to-[#0099cc] text-black"
                      : "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                  }
                  transition-all duration-300 hover:scale-[1.02]
                `}
              >
                {/* Background Pattern for Highlighted */}
                {feature.highlighted && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                )}

                {/* Number Badge */}
                <div className={`
                  inline-flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full mb-4 md:mb-6
                  ${
                    feature.highlighted
                      ? "bg-black/20 text-black"
                      : "bg-white/5 text-[#00d4ff]"
                  }
                `}>
                  <span className="text-xs md:text-sm">{feature.number}</span>
                </div>

                {/* Icon */}
                <div className="mb-4 md:mb-6">
                  <Icon className={`
                    w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14
                    ${feature.highlighted ? "text-black" : "text-[#00d4ff]"}
                  `} />
                </div>

                {/* Content */}
                <h3 className={`
                  text-lg md:text-xl lg:text-2xl mb-2 md:mb-3
                  ${feature.highlighted ? "text-black" : "text-white"}
                `}>
                  {feature.title}
                </h3>
                
                <p className={`
                  text-sm md:text-base mb-4 md:mb-6
                  ${feature.highlighted ? "text-black/80" : "text-gray-400"}
                `}>
                  {feature.description}
                </p>

                {/* CTA for Highlighted Feature */}
                {feature.cta && (
                  <Button
                    className="bg-black hover:bg-black/80 text-[#00d4ff] group/btn text-sm md:text-base"
                  >
                    {feature.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                )}

                {/* Hover Glow Effect */}
                {!feature.highlighted && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-transparent" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}