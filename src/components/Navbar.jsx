import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b w-full overflow-x-hidden transition-all duration-300 ${
      scrolled
        ? 'shadow-lg border-slate-300 bg-gradient-to-r from-white via-[#1f3492]/5 to-white'
        : 'border-slate-200'
    }`}>
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-2 flex items-center justify-between w-full overflow-x-hidden relative">
        <div className="flex items-center flex-shrink-0 animate-fade-in">
          <img
            src="/logo2.png"
            alt="AT Speaks Logo"
            className="h-[35px] w-[100px] sm:h-[45px] sm:w-[140px] md:h-[50px] md:w-[160px] lg:h-[60px] lg:w-[200px] object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6 text-xs lg:text-sm font-medium flex-wrap justify-end animate-fade-in">
          <a href="#home" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap hover:scale-105">Home</a>
          <a href="#about" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap hover:scale-105">About</a>
          <a href="#events" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap hover:scale-105">Events</a>
          <a href="#services" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap hover:scale-105">Services</a>
          <a href="#community" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap hover:scale-105">Community</a>
          <a href="#testimonials" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap hover:scale-105">Testimonials</a>
          <a href="#contact" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap hover:scale-105">Contact</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a
            href="https://chat.whatsapp.com/B9GxPUSs4SFA7rMJUHo84I?mode=wwt"
            className="group hidden md:inline-flex items-center gap-1.5 rounded-full px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 whitespace-nowrap animate-fade-in relative overflow-hidden"
          >
            <span className="relative z-10 inline-flex items-center gap-1">
              Join Now
              <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
            </span>
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 min-w-[44px] min-h-[44px] rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 hover:from-[#1f3492]/10 hover:to-[#c8348f]/10 border border-slate-200 hover:border-[#1f3492]/20 transition-all text-xl flex items-center justify-center hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Animated */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-200 shadow-xl w-full animate-fade-in backdrop-blur-lg relative overflow-hidden">
          {/* Decorative gradient blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1f3492]/5 to-[#c8348f]/5 rounded-full blur-2xl -z-10"></div>

          <nav className="flex flex-col px-4 py-3 space-y-3">
            <a href="#home" onClick={handleLinkClick} className="group text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-all duration-300 text-sm hover:translate-x-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Home
            </a>
            <a href="#about" onClick={handleLinkClick} className="group text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-all duration-300 text-sm hover:translate-x-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              About
            </a>
            <a href="#events" onClick={handleLinkClick} className="group text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-all duration-300 text-sm hover:translate-x-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Events
            </a>
            <a href="#services" onClick={handleLinkClick} className="group text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-all duration-300 text-sm hover:translate-x-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Services
            </a>
            <a href="#community" onClick={handleLinkClick} className="group text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-all duration-300 text-sm hover:translate-x-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Community
            </a>
            <a href="#testimonials" onClick={handleLinkClick} className="group text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-all duration-300 text-sm hover:translate-x-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Testimonials
            </a>
            <a href="#contact" onClick={handleLinkClick} className="group text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-all duration-300 text-sm hover:translate-x-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              Contact
            </a>
            <a
              href="https://chat.whatsapp.com/B9GxPUSs4SFA7rMJUHo84I?mode=wwt"
              onClick={handleLinkClick}
              className="group inline-flex items-center justify-center gap-1.5 text-center rounded-full px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 mt-2 relative overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-1">
                Join Now
                <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
              </span>
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
