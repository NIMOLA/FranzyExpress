import { Package, Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10 md:py-12 lg:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="relative">
                <Package className="w-6 md:w-7 h-6 md:h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />
              </div>
              <span className="text-base md:text-lg tracking-tight">
                FRANZY<span className="text-[#00d4ff]">XPRESS</span>
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">
              Ekpoma's #1 local delivery service. Fast, reliable, and trusted by the community.
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              <a
                href="#"
                className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all"
              >
                <Facebook className="w-3 md:w-4 h-3 md:h-4" />
              </a>
              <a
                href="#"
                className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all"
              >
                <Instagram className="w-3 md:w-4 h-3 md:h-4" />
              </a>
              <a
                href="#"
                className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all"
              >
                <Twitter className="w-3 md:w-4 h-3 md:h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 md:mb-4 text-white text-sm md:text-base">Services</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  Same-Day Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  Express Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  Business Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  Bulk Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 md:mb-4 text-white text-sm md:text-base">Company</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  Our Riders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00d4ff] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 md:mb-4 text-white text-sm md:text-base">Get in Touch</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3 md:w-4 h-3 md:h-4 text-[#00d4ff] flex-shrink-0" />
                <a href="mailto:hello@franzyxpress.com" className="hover:text-[#00d4ff] transition-colors break-all">
                  hello@franzyxpress.com
                </a>
              </li>
              <li>
                <p>Ekpoma, Edo State</p>
                <p>Nigeria</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
          <p>&copy; 2025 FranzyXpress. All rights reserved.</p>
          <div className="flex items-center gap-4 md:gap-6">
            <a href="#" className="hover:text-[#00d4ff] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}