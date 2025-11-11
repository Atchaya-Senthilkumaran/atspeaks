import React from "react";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-b from-white via-[#1f3492]/5 to-white pt-8 pb-4 border-t relative">

      {/* Main footer container */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </h3>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Building future-ready minds in design, code, and emerging tech through practical projects.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-5">
            <a href="https://www.linkedin.com/company/atspeaks/" className="p-2 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Linkedin className="w-5 h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.youtube.com/@ATSpeaksofficial" className="p-2 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Youtube className="w-5 h-5 text-[#1f3492]" />
            </a>
            <a href="https://www.instagram.com/at.speaks/" className="p-2 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Instagram className="w-5 h-5 text-[#1f3492]" />
            </a>
            <a href="mailto:connect.atspeaks@gmail.com" className="p-2 bg-white border rounded-full shadow hover:-translate-y-1 transition">
              <Mail className="w-5 h-5 text-[#1f3492]" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li><a href="#home" className="hover:text-[#1f3492]">Home</a></li>
            <li><a href="#events" className="hover:text-[#1f3492]">Events</a></li>
            <li><a href="#services" className="hover:text-[#1f3492]">Services</a></li>
            <li><a href="#testimonials" className="hover:text-[#1f3492]">Testimonials</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Company</h4>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li><a href="#about" className="hover:text-[#1f3492]">About Us</a></li>
            <li><a href="#community" className="hover:text-[#1f3492]">Community</a></li>
            <li><a href="#team" className="hover:text-[#1f3492]">Founder</a></li>
            <li><a href="mailto:connect.atspeaks@gmail.com" className="hover:text-[#1f3492]">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Contact</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Got questions or collaboration ideas?  
            Reach out anytime.
          </p>

          <a
            href="mailto:connect.atspeaks@gmail.com"
            className="block mt-3 text-[#1f3492] font-medium hover:underline"
          >
            connect.atspeaks@gmail.com
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-[#1f3492]/30 via-[#c8348f]/30 to-[#1f3492]/30 mt-8 mb-4"></div>

      {/* Bottom copyright bar */}
      <div className="text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AT Speaks — Founded by Atchaya Senthilkumaran
      </div>
    </footer>
  );
}
