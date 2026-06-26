import { motion } from "motion/react";
import { GraduationCap, ShoppingBag, Building2, Sparkles, Check } from "lucide-react";
import { Button } from "./ui/button";

const pricingTiers = [
  {
    icon: GraduationCap,
    title: "Student Deliveries",
    price: "₦1,000",
    description: "Perfect for students across Ekpoma campus",
    features: [
      "Campus-wide delivery",
      "Fast response time",
      "Student-friendly rates",
      "Same-day delivery",
    ],
    highlighted: false,
  },
  {
    icon: ShoppingBag,
    title: "Grocery & Food Dispatch",
    price: "₦1,500",
    description: "Get your essentials delivered quickly",
    features: [
      "Restaurant partnerships",
      "Fresh grocery delivery",
      "Real-time tracking",
      "Safe handling guarantee",
    ],
    highlighted: true,
  },
  {
    icon: Building2,
    title: "Business Packages",
    price: "₦2,500",
    description: "Reliable logistics for your business",
    features: [
      "Bulk order discounts",
      "Priority rider assignment",
      "Dedicated support",
      "Monthly billing options",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-16 md:py-20 lg:py-32 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#a8ff35]/10 rounded-full blur-[120px]" />
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
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#a8ff35]/10 border border-[#a8ff35]/30 mb-4 md:mb-6">
            <span className="text-xl md:text-2xl">💸</span>
            <span className="text-xs md:text-sm text-[#a8ff35]">Transparent Pricing</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6">
            Simple, Affordable Pricing.{" "}
            <span className="text-[#00d4ff]">No Surprises.</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            FranzyXpress is designed for students, families, and businesses in Ekpoma. 
            Whether it's lunch, groceries, or business packages, our rates stay fair and upfront.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  relative rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 overflow-hidden group
                  ${
                    tier.highlighted
                      ? "bg-gradient-to-br from-[#00d4ff] to-[#0099cc] text-black border-2 border-[#00d4ff] md:transform md:scale-105"
                      : "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                  }
                  hover:border-[#00d4ff]/50 transition-all duration-300
                `}
              >
                {/* Popular Badge */}
                {tier.highlighted && (
                  <div className="absolute top-3 md:top-4 right-3 md:right-4">
                    <div className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-black/20 text-black">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-xs">Popular</span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  inline-flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl mb-4 md:mb-6
                  ${
                    tier.highlighted
                      ? "bg-black/10 text-black"
                      : "bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff]"
                  }
                `}>
                  <Icon className="w-6 md:w-7 h-6 md:h-7" />
                </div>

                {/* Title & Price */}
                <h3 className={`
                  text-lg md:text-xl lg:text-2xl mb-2
                  ${tier.highlighted ? "text-black" : "text-white"}
                `}>
                  {tier.title}
                </h3>

                <div className="mb-3 md:mb-4">
                  <span className={`
                    text-2xl md:text-3xl lg:text-4xl
                    ${tier.highlighted ? "text-black" : "text-[#00d4ff]"}
                  `}>
                    {tier.price}
                  </span>
                  <span className={`
                    text-xs md:text-sm ml-2
                    ${tier.highlighted ? "text-black/60" : "text-gray-500"}
                  `}>
                    starting from
                  </span>
                </div>

                <p className={`
                  text-sm md:text-base mb-4 md:mb-6
                  ${tier.highlighted ? "text-black/80" : "text-gray-400"}
                `}>
                  {tier.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`
                        flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                        ${
                          tier.highlighted
                            ? "bg-black/20"
                            : "bg-[#00d4ff]/10"
                        }
                      `}>
                        <Check className={`
                          w-3 h-3
                          ${tier.highlighted ? "text-black" : "text-[#00d4ff]"}
                        `} />
                      </div>
                      <span className={`text-sm ${tier.highlighted ? "text-black" : "text-gray-300"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`
                    w-full text-sm md:text-base
                    ${
                      tier.highlighted
                        ? "bg-black hover:bg-black/80 text-[#00d4ff]"
                        : "bg-[#00d4ff]/10 hover:bg-[#00d4ff] hover:text-black border border-[#00d4ff]/30 text-[#00d4ff]"
                    }
                  `}
                >
                  Book a Delivery
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Logistics CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
          id="custom-quote-section"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10">
            <div className="inline-flex items-center justify-center w-14 md:w-16 h-14 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#a8ff35]/20 border border-[#00d4ff]/30 mb-4 md:mb-6">
              <Sparkles className="w-6 md:w-8 h-6 md:h-8 text-[#00d4ff]" />
            </div>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">
              Custom Logistics Solutions
            </h3>
            
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
              Need something specific? We offer customized delivery solutions for special requests, 
              bulk orders, and enterprise partnerships.
            </p>
            
            <Button
              variant="outline"
              className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black"
              onClick={() => window.open('https://wa.me/2348133031183', '_blank')}
            >
              Request a Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}