import React from "react";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-b from-white via-[#1f3492]/5 to-white pt-8 pb-4 border-t relative w-full overflow-x-hidden">

      {/* Main footer container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full overflow-x-hidden">

        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Building future-ready minds in design, code, and emerging tech through practical projects.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-5">
            <a href="https://www.linkedin.com/company/atspeaks/" className="p-2 sm:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.youtube.com/@ATSpeaksofficial" className="p-2 sm:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.instagram.com/at.speaks/" className="p-2 sm:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#1f3492]" />
            </a>
            <a href="mailto:connect.atspeaks@gmail.com" className="p-2 sm:p-2.5 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#1f3492]" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mb-2 sm:mb-3">Quick Links</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-slate-600 text-xs sm:text-sm">
            <li><a href="#home" className="hover:text-[#1f3492]">Home</a></li>
            <li><a href="#events" className="hover:text-[#1f3492]">Events</a></li>
            <li><a href="#services" className="hover:text-[#1f3492]">Services</a></li>
            <li><a href="#testimonials" className="hover:text-[#1f3492]">Testimonials</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mb-2 sm:mb-3">Company</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-slate-600 text-xs sm:text-sm">
            <li><a href="#about" className="hover:text-[#1f3492]">About Us</a></li>
            <li><a href="#community" className="hover:text-[#1f3492]">Community</a></li>
            <li><a href="#team" className="hover:text-[#1f3492]">Founder</a></li>
            <li><a href="mailto:connect.atspeaks@gmail.com" className="hover:text-[#1f3492]">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mb-2 sm:mb-3">Contact</h4>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Got questions or collaboration ideas?
            Reach out anytime.
          </p>

          <a
            href="mailto:connect.atspeaks@gmail.com"
            className="block mt-2 sm:mt-3 text-xs sm:text-sm text-[#1f3492] font-medium hover:underline break-all"
          >
            connect.atspeaks@gmail.com
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-[#1f3492]/30 via-[#c8348f]/30 to-[#1f3492]/30 mt-6 sm:mt-8 mb-3 sm:mb-4"></div>

      {/* Bottom copyright bar */}
      <div className="text-center text-[10px] sm:text-xs text-slate-500 px-4">
        © {new Date().getFullYear()} AT Speaks — Founded by Atchaya Senthilkumaran
      </div>
    </footer>
  );
}
