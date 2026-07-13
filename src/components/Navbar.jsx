import React, { useState, useEffect } from "react";
import { Instagram, Linkedin, Sparkles } from "lucide-react";

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
          <div className="flex items-center gap-1 sm:gap-1.5" aria-label="Social media links">
            <a
              href="https://www.linkedin.com/company/atspeaks/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#1f3492]/30 transition-all duration-300 flex items-center justify-center"
              aria-label="Visit AT Speaks on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-[#1f3492] group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href="https://chat.whatsapp.com/B9GxPUSs4SFA7rMJUHo84I?mode=wwt"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-green-500/30 transition-all duration-300 flex items-center justify-center"
              aria-label="Join AT Speaks on WhatsApp"
            >
              <svg className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/at.speaks/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#c8348f]/30 transition-all duration-300 flex items-center justify-center"
              aria-label="Visit AT Speaks on Instagram"
            >
              <Instagram className="w-4 h-4 text-[#c8348f] group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
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
