import React from "react";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-b from-white via-[#1f3492]/5 to-white pt-8 sm:pt-10 pb-4 sm:pb-5 border-t relative w-full overflow-x-hidden">

      {/* Main footer container - Mobile First: 1 column on mobile, 2 columns on sm+, 4 columns on md+ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10 w-full overflow-x-hidden">

        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-lg sm:text-xl md:text-xl font-bold bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm md:text-sm mt-3 leading-relaxed">
            Building future-ready minds in design, code, and emerging tech through practical projects.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 sm:gap-3 md:gap-4 mt-4 sm:mt-4 md:mt-5">
            <a href="https://www.linkedin.com/company/atspeaks/" className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[40px] min-h-[40px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Linkedin className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.youtube.com/@ATSpeaksofficial" className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[40px] min-h-[40px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Youtube className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.instagram.com/at.speaks/" className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[40px] min-h-[40px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Instagram className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
            <a href="mailto:connect.atspeaks@gmail.com" className="p-2 sm:p-2 md:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition min-w-[40px] min-h-[40px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center">
              <Mail className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492]" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm sm:text-sm md:text-sm font-semibold text-slate-800 mb-3 sm:mb-3">Quick Links</h4>
          <ul className="space-y-2 sm:space-y-2 md:space-y-2 text-slate-600 text-xs sm:text-sm md:text-sm">
            <li><a href="#home" className="hover:text-[#1f3492] transition">Home</a></li>
            <li><a href="#events" className="hover:text-[#1f3492] transition">Events</a></li>
            <li><a href="#services" className="hover:text-[#1f3492] transition">Services</a></li>
            <li><a href="#testimonials" className="hover:text-[#1f3492] transition">Testimonials</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm sm:text-sm md:text-sm font-semibold text-slate-800 mb-3 sm:mb-3">Company</h4>
          <ul className="space-y-2 sm:space-y-2 md:space-y-2 text-slate-600 text-xs sm:text-sm md:text-sm">
            <li><a href="#about" className="hover:text-[#1f3492] transition">About Us</a></li>
            <li><a href="#community" className="hover:text-[#1f3492] transition">Community</a></li>
            <li><a href="#team" className="hover:text-[#1f3492] transition">Founder</a></li>
            <li><a href="mailto:connect.atspeaks@gmail.com" className="hover:text-[#1f3492] transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm sm:text-sm md:text-sm font-semibold text-slate-800 mb-3 sm:mb-3">Contact</h4>
          <p className="text-slate-600 text-xs sm:text-sm md:text-sm leading-relaxed">
            Got questions or collaboration ideas?
            Reach out anytime.
          </p>

          <a
            href="mailto:connect.atspeaks@gmail.com"
            className="block mt-3 sm:mt-3 text-xs sm:text-sm md:text-sm text-[#1f3492] font-medium hover:underline transition break-all"
          >
            connect.atspeaks@gmail.com
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-[#1f3492]/30 via-[#c8348f]/30 to-[#1f3492]/30 mt-6 sm:mt-8 md:mt-8 mb-4 sm:mb-4 md:mb-4"></div>

      {/* Bottom copyright bar */}
      <div className="text-center text-[10px] sm:text-xs md:text-xs text-slate-500 px-5 sm:px-6 leading-relaxed">
        © {new Date().getFullYear()} AT Speaks — Founded by Atchaya Senthilkumaran
      </div>
    </footer>
  );
}
