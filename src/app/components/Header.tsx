import { Package, Menu, X, LogIn, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onLoginClick: () => void;
  user?: any;
  isAdmin?: boolean;
  onLogout?: () => void;
}

export function Header({ onLoginClick, user, isAdmin, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#track", label: "Track Delivery" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Package className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />
            </div>
            <span className="text-lg lg:text-xl tracking-tight">
              FRANZY<span className="text-[#00d4ff]">XPRESS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                  <User className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-sm text-white">{user.name || user.email}</span>
                </div>
                <Button 
                  onClick={onLogout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                id="login-button"
                onClick={onLoginClick}
                className="bg-[#00d4ff] hover:bg-[#00b8e6] text-black shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-lg overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="space-y-3"
              >
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                      <User className="w-4 h-4 text-[#00d4ff]" />
                      <span className="text-sm text-white">{user.name || user.email}</span>
                    </div>
                    <Button 
                      onClick={() => {
                        onLogout?.();
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full text-gray-400 hover:text-white"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full bg-[#00d4ff] hover:bg-[#00b8e6] text-black shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
                    onClick={() => {
                      onLoginClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}