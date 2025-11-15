import React, { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-slate-200 w-full overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-2 sm:px-4 md:px-6 py-2 flex items-center justify-between w-full overflow-x-hidden">
        <div className="flex items-center ml-0 sm:ml-0 md:-ml-[30px] flex-shrink-0">
          <img
            src="/logo2.png"
            alt="AT Speaks Logo"
            className="h-[40px] w-[120px] xs:h-[45px] xs:w-[140px] sm:h-[50px] sm:w-[160px] md:h-[60px] md:w-[200px] object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6 text-xs lg:text-sm font-medium flex-wrap justify-end">
          <a href="#home" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap">Home</a>
          <a href="#about" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap">About</a>
          <a href="#events" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap">Events</a>
          <a href="#services" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap">Services</a>
          <a href="#community" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap">Community</a>
          <a href="#testimonials" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap">Testimonials</a>
          <a href="#contact" className="text-slate-700 hover:text-[#1f3492] hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap">Contact</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a
            href="https://chat.whatsapp.com/B9GxPUSs4SFA7rMJUHo84I?mode=wwt"
            className="hidden md:inline-block rounded-full px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Join Now
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 min-w-[44px] min-h-[44px] rounded-md bg-slate-100 hover:bg-slate-200 transition-all text-xl flex items-center justify-center"
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
