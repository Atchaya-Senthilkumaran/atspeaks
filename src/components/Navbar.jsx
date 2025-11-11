import React, { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center -ml-2 sm:-ml-[30px]">
          <img
            src="/logo2.png"
            alt="AT Speaks Logo"
            className="h-[50px] w-[160px] sm:h-[60px] sm:w-[200px] object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
          <a href="#home" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300">Home</a>
          <a href="#about" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300">About</a>
          <a href="#events" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300">Events</a>
          <a href="#services" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300">Services</a>
          <a href="#community" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300">Community</a>
          <a href="#testimonials" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300">Testimonials</a>
          <a href="#contact" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://chat.whatsapp.com/B9GxPUSs4SFA7rMJUHo84I?mode=wwt"
            className="hidden md:inline-block rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Join Now
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-all text-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <nav className="flex flex-col px-4 py-3 space-y-3">
            <a href="#home" onClick={handleLinkClick} className="text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-colors">Home</a>
            <a href="#about" onClick={handleLinkClick} className="text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-colors">About</a>
            <a href="#events" onClick={handleLinkClick} className="text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-colors">Events</a>
            <a href="#services" onClick={handleLinkClick} className="text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-colors">Services</a>
            <a href="#community" onClick={handleLinkClick} className="text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-colors">Community</a>
            <a href="#testimonials" onClick={handleLinkClick} className="text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-colors">Testimonials</a>
            <a href="#contact" onClick={handleLinkClick} className="text-slate-700 hover:text-[#1f3492] py-2 border-b border-slate-100 transition-colors">Contact</a>
            <a
              href="https://chat.whatsapp.com/B9GxPUSs4SFA7rMJUHo84I?mode=wwt"
              className="inline-block text-center rounded-full px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white shadow-md hover:shadow-lg transition-all mt-2"
            >
              Join Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
