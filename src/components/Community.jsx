import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Users, Building2, Rocket, Handshake } from "lucide-react";

export default function Community() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      id="community" 
      ref={sectionRef}
      className={`mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 w-full overflow-x-hidden scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      {/* Section Header */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold animate-fade-in">Community & Partnerships</h2>
      <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2"></div>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl animate-fade-in animate-delay-100">
        We collaborate with colleges, student clubs, and early-stage startups to run workshops and hands-on sessions.
        Interested in partnership opportunities? Let's connect.
      </p>

      {/* Partnership Cards - Mobile First: 1 column on mobile, 2 columns on sm+, 3 columns on lg+ */}
      <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
        {/* Colleges Card */}
        <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border hover:shadow-md hover:-translate-y-1 hover-lift transition-all duration-300 animate-fade-in animate-delay-100">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1f3492]/10 flex items-center justify-center mb-3 sm:mb-4">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#1f3492] hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">College Workshops</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Bring hands-on tech and design sessions to your campus. Tailored workshops for students.
          </p>
        </div>

        {/* Student Clubs Card */}
        <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border hover:shadow-md hover:-translate-y-1 hover-lift transition-all duration-300 animate-fade-in animate-delay-200">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c8348f]/10 flex items-center justify-center mb-3 sm:mb-4">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#c8348f] hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">Student Communities</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Collaborate with your club or community for exclusive learning events and sessions.
          </p>
        </div>

        {/* Startups Card */}
        <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border hover:shadow-md hover:-translate-y-1 hover-lift transition-all duration-300 animate-fade-in animate-delay-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1f3492]/10 flex items-center justify-center mb-3 sm:mb-4">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#1f3492] hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">Startup Collaborations</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Partner with us for skill development programs and team training initiatives.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-4 sm:mt-6 md:mt-8 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1f3492]/10 via-[#1f3492]/5 to-[#c8348f]/10 border shadow-sm relative overflow-hidden w-full hover-lift transition-all duration-300 animate-slide-in-right">
        <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 md:-top-10 md:-right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#1f3492]/20 rounded-full blur-3xl max-w-[50vw] animate-pulse-slow"></div>
        <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 md:-bottom-10 md:-left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#c8348f]/20 rounded-full blur-3xl max-w-[50vw] animate-pulse-slow"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 w-full">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full md:w-auto">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-300">
              <Handshake className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1f3492]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">Ready to Collaborate?</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-xl">
                Whether you're an educational institution or a growing startup, let's work together to empower learners.
              </p>
            </div>
          </div>
          <a
            href="mailto:connect.atspeaks@gmail.com"
            className="rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-semibold hover:brightness-95 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap w-full sm:w-auto text-center"
          >
            Partner with us
          </a>
        </div>
      </div>
    </section>
  );
}
