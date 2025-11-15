import React from "react";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-b from-white via-[#1f3492]/5 to-white pt-6 sm:pt-8 pb-3 sm:pb-4 border-t relative w-full overflow-x-hidden">

      {/* Main footer container - Mobile First: 1 column on mobile, 2 columns on sm+, 4 columns on md+ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 w-full overflow-x-hidden">

        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </h3>
          <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm mt-2 leading-relaxed">
            Building future-ready minds in design, code, and emerging tech through practical projects.
          </p>

          {/* Social icons */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-5">
            <a href="https://www.linkedin.com/company/atspeaks/" className="p-1.5 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.youtube.com/@ATSpeaksofficial" className="p-1.5 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Youtube className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.instagram.com/at.speaks/" className="p-1.5 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Instagram className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
            <a href="mailto:connect.atspeaks@gmail.com" className="p-1.5 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-800 mb-2 sm:mb-3">Quick Links</h4>
          <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-slate-600 text-[10px] sm:text-xs md:text-sm">
            <li><a href="#home" className="hover:text-[#1f3492]">Home</a></li>
            <li><a href="#events" className="hover:text-[#1f3492]">Events</a></li>
            <li><a href="#services" className="hover:text-[#1f3492]">Services</a></li>
            <li><a href="#testimonials" className="hover:text-[#1f3492]">Testimonials</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-800 mb-2 sm:mb-3">Company</h4>
          <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-slate-600 text-[10px] sm:text-xs md:text-sm">
            <li><a href="#about" className="hover:text-[#1f3492]">About Us</a></li>
            <li><a href="#community" className="hover:text-[#1f3492]">Community</a></li>
            <li><a href="#team" className="hover:text-[#1f3492]">Founder</a></li>
            <li><a href="mailto:connect.atspeaks@gmail.com" className="hover:text-[#1f3492]">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-800 mb-2 sm:mb-3">Contact</h4>
          <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm leading-relaxed">
            Got questions or collaboration ideas?
            Reach out anytime.
          </p>

          <a
            href="mailto:connect.atspeaks@gmail.com"
            className="block mt-2 sm:mt-3 text-[10px] sm:text-xs md:text-sm text-[#1f3492] font-medium hover:underline break-all"
          >
            connect.atspeaks@gmail.com
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-[#1f3492]/30 via-[#c8348f]/30 to-[#1f3492]/30 mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4"></div>

      {/* Bottom copyright bar */}
      <div className="text-center text-[9px] sm:text-[10px] md:text-xs text-slate-500 px-3 sm:px-4">
        © {new Date().getFullYear()} AT Speaks — Founded by Atchaya Senthilkumaran
      </div>
    </footer>
  );
}
