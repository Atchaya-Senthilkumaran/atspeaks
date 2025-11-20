import React from "react";
import { Mail, Instagram, Youtube, Linkedin, Sparkles, Heart, Code, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-10 md:mt-12 relative w-full overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12 sm:h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1f3492" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#c8348f" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1f3492" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#waveGradient)"></path>
        </svg>
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f3492]/5 via-white to-[#c8348f]/5"></div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-[#c8348f]/10 to-[#1f3492]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-[#1f3492]/5 to-[#c8348f]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Main footer container - Centered on mobile, grid on larger screens */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 md:px-6 pt-12 sm:pt-16 pb-4 sm:pb-5">
        {/* Mobile: Centered layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10 w-full text-center sm:text-left">
          
          {/* Brand - Centered on mobile */}
          <div className="sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-start">
            <div className="relative">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#1f3492] via-[#c8348f] to-[#1f3492] bg-clip-text text-transparent animate-gradient-x">
                AT Speaks
              </h3>
              <Sparkles className="absolute -top-1 -right-6 w-4 h-4 text-[#c8348f] animate-pulse" />
            </div>
            <p className="text-slate-600 text-xs sm:text-sm md:text-sm mt-3 leading-relaxed max-w-xs">
              Building future-ready minds in design, code, and emerging tech through practical projects.
            </p>

            {/* Decorative tech badges */}
            <div className="flex gap-2 mt-3 flex-wrap justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#1f3492]/10 to-[#c8348f]/10 rounded-full text-[10px] font-medium text-slate-700">
                <Code className="w-3 h-3" /> Design
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#c8348f]/10 to-[#1f3492]/10 rounded-full text-[10px] font-medium text-slate-700">
                <Zap className="w-3 h-3" /> Code
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#1f3492]/10 to-[#c8348f]/10 rounded-full text-[10px] font-medium text-slate-700">
                <Heart className="w-3 h-3" /> Community
              </span>
            </div>

            {/* Social icons - Centered on mobile with enhanced styling */}
            <div className="flex gap-3 sm:gap-3 md:gap-4 mt-5 sm:mt-5 md:mt-6 justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/company/atspeaks/"
                className="group relative p-2 sm:p-2 md:p-2.5 bg-white border-2 border-transparent rounded-full shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:border-[#1f3492]/20 hover:bg-gradient-to-br hover:from-[#1f3492]/5 hover:to-[#c8348f]/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492] group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.youtube.com/@ATSpeaksofficial"
                className="group relative p-2 sm:p-2 md:p-2.5 bg-white border-2 border-transparent rounded-full shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:border-[#1f3492]/20 hover:bg-gradient-to-br hover:from-[#1f3492]/5 hover:to-[#c8348f]/5"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492] group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.instagram.com/at.speaks/"
                className="group relative p-2 sm:p-2 md:p-2.5 bg-white border-2 border-transparent rounded-full shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:border-[#1f3492]/20 hover:bg-gradient-to-br hover:from-[#1f3492]/5 hover:to-[#c8348f]/5"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492] group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="mailto:connect.atspeaks@gmail.com"
                className="group relative p-2 sm:p-2 md:p-2.5 bg-white border-2 border-transparent rounded-full shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:border-[#1f3492]/20 hover:bg-gradient-to-br hover:from-[#1f3492]/5 hover:to-[#c8348f]/5"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492] group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links - Centered on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="relative text-sm sm:text-sm md:text-base font-bold text-slate-800 mb-4 sm:mb-4">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#1f3492] to-[#c8348f]"></div>
            </h4>
            <ul className="space-y-2.5 sm:space-y-2.5 md:space-y-3 text-slate-600 text-xs sm:text-sm md:text-sm">
              <li>
                <a href="#home" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#events" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Events
                </a>
              </li>
              <li>
                <a href="#services" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Company - Centered on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="relative text-sm sm:text-sm md:text-base font-bold text-slate-800 mb-4 sm:mb-4">
              Company
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#c8348f] to-[#1f3492]"></div>
            </h4>
            <ul className="space-y-2.5 sm:space-y-2.5 md:space-y-3 text-slate-600 text-xs sm:text-sm md:text-sm">
              <li>
                <a href="#about" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#community" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Community
                </a>
              </li>
              <li>
                <a href="#team" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Founder
                </a>
              </li>
              <li>
                <a href="mailto:connect.atspeaks@gmail.com" className="group inline-flex items-center gap-2 hover:text-[#1f3492] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#c8348f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact - Centered on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="relative text-sm sm:text-sm md:text-base font-bold text-slate-800 mb-4 sm:mb-4">
              Get In Touch
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-[#1f3492] to-[#c8348f]"></div>
            </h4>
            <div className="relative p-4 bg-gradient-to-br from-[#1f3492]/5 to-[#c8348f]/5 rounded-xl border border-[#1f3492]/10 backdrop-blur-sm">
              <p className="text-slate-600 text-xs sm:text-sm md:text-sm leading-relaxed max-w-xs mb-3">
                Got questions or collaboration ideas? Reach out anytime.
              </p>
              <a
                href="mailto:connect.atspeaks@gmail.com"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm md:text-sm text-[#1f3492] font-medium hover:text-[#c8348f] transition-all duration-300 break-all"
              >
                <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:underline">connect.atspeaks@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Divider with dots */}
      <div className="relative mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-6 md:mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1f3492]/30 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="flex gap-2">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] animate-pulse"></span>
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#c8348f] to-[#1f3492] animate-pulse delay-150"></span>
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] animate-pulse delay-300"></span>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar with enhanced styling */}
      <div className="relative text-center px-4 sm:px-6 pb-6">
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <p className="text-[10px] sm:text-xs md:text-xs text-slate-600 font-medium">
            © {new Date().getFullYear()} AT Speaks
          </p>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#c8348f]"></span>
          <p className="text-[10px] sm:text-xs md:text-xs text-slate-500">
            Founded by <span className="font-semibold text-slate-700">Atchaya Senthilkumaran</span>
          </p>
        </div>
        <p className="mt-2 text-[9px] sm:text-[10px] text-slate-400 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-[#c8348f] fill-[#c8348f] animate-pulse" /> for the community
        </p>
      </div>
    </footer>
  );
}
