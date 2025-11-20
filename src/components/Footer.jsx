import React from "react";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-b from-white via-[#1f3492]/5 to-white pt-8 sm:pt-10 pb-4 sm:pb-5 border-t relative w-full overflow-x-hidden">
      {/* Main footer container - Centered on mobile, grid on larger screens */}
      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6">
        {/* Mobile: Centered layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10 w-full text-center sm:text-left">
          
          {/* Brand - Centered on mobile */}
          <div className="sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-start">
            <h3 className="text-lg sm:text-xl md:text-xl font-bold bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
              AT Speaks
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm md:text-sm mt-3 leading-relaxed max-w-xs">
              Building future-ready minds in design, code, and emerging tech through practical projects.
            </p>

            {/* Social icons - Centered on mobile */}
            <div className="flex gap-3 sm:gap-3 md:gap-4 mt-4 sm:mt-4 md:mt-5 justify-center sm:justify-start">
              <a 
                href="https://www.linkedin.com/company/atspeaks/" 
                className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-[#1f3492]/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
              </a>
              <a 
                href="https://www.youtube.com/@ATSpeaksofficial" 
                className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-[#1f3492]/5"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
              </a>
              <a 
                href="https://www.instagram.com/at.speaks/" 
                className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-[#1f3492]/5"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
              </a>
              <a 
                href="mailto:connect.atspeaks@gmail.com" 
                className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 hover:shadow-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-[#1f3492]/5"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
              </a>
            </div>
          </div>

          {/* Quick Links - Centered on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm sm:text-sm md:text-sm font-semibold text-slate-800 mb-3 sm:mb-3">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-2 md:space-y-2 text-slate-600 text-xs sm:text-sm md:text-sm">
              <li><a href="#home" className="hover:text-[#1f3492] transition-colors duration-300">Home</a></li>
              <li><a href="#events" className="hover:text-[#1f3492] transition-colors duration-300">Events</a></li>
              <li><a href="#services" className="hover:text-[#1f3492] transition-colors duration-300">Services</a></li>
              <li><a href="#testimonials" className="hover:text-[#1f3492] transition-colors duration-300">Testimonials</a></li>
            </ul>
          </div>

          {/* Company - Centered on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm sm:text-sm md:text-sm font-semibold text-slate-800 mb-3 sm:mb-3">Company</h4>
            <ul className="space-y-2 sm:space-y-2 md:space-y-2 text-slate-600 text-xs sm:text-sm md:text-sm">
              <li><a href="#about" className="hover:text-[#1f3492] transition-colors duration-300">About Us</a></li>
              <li><a href="#community" className="hover:text-[#1f3492] transition-colors duration-300">Community</a></li>
              <li><a href="#team" className="hover:text-[#1f3492] transition-colors duration-300">Founder</a></li>
              <li><a href="mailto:connect.atspeaks@gmail.com" className="hover:text-[#1f3492] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact - Centered on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm sm:text-sm md:text-sm font-semibold text-slate-800 mb-3 sm:mb-3">Contact</h4>
            <p className="text-slate-600 text-xs sm:text-sm md:text-sm leading-relaxed max-w-xs">
              Got questions or collaboration ideas?
              Reach out anytime.
            </p>
            <a
              href="mailto:connect.atspeaks@gmail.com"
              className="block mt-3 sm:mt-3 text-xs sm:text-sm md:text-sm text-[#1f3492] font-medium hover:underline transition-all duration-300 break-all"
            >
              connect.atspeaks@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-[#1f3492]/30 via-[#c8348f]/30 to-[#1f3492]/30 mt-6 sm:mt-8 md:mt-8 mb-4 sm:mb-4 md:mb-4"></div>

      {/* Bottom copyright bar */}
      <div className="text-center text-[10px] sm:text-xs md:text-xs text-slate-500 px-4 sm:px-6 leading-relaxed">
        © {new Date().getFullYear()} AT Speaks — Founded by Atchaya Senthilkumaran
      </div>
    </footer>
  );
}
