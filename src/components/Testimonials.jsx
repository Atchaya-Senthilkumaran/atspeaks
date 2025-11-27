import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { testimonials } from "../data/data";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`mt-14 sm:mt-16 md:mt-20 mb-8 sm:mb-10 md:mb-12 py-7 relative w-full scroll-reveal-3d ${isRevealed ? 'revealed' : ''} overflow-hidden`}
    >
      {/* Heading with 3D effect */}
      <div className="text-center max-w-2xl mx-auto px-2 animate-3d-pop">
        <div className="relative inline-block">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 animate-glow-pulse break-words">
            What learners say
          </h2>
          <div className="h-1 w-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 animate-glow-pulse shadow-lg shadow-[#c8348f]/30"></div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 sm:mt-3 animate-zoom-in-blur animate-delay-100">
          Real feedback from students who've experienced our workshops and sessions.
        </p>
      </div>

      {/* Scroll container with enhanced animations */}
      <div className="mt-6 sm:mt-8 md:mt-10 overflow-x-auto pb-6 hide-scrollbar scroll-smooth w-full">
        <div className="flex gap-3 sm:gap-4 md:gap-6 w-max pl-4 sm:pl-6 md:pl-6 pr-4 sm:pr-6 md:pr-6 py-4">
          {testimonials.map((t, index) => {
            const delay = index * 0.15;
            const animationType = index % 3 === 0 ? 'animate-3d-pop' : index % 3 === 1 ? 'animate-bounce-in' : 'animate-slide-up-rotate';
            return (
            <div
              key={t.id}
              className={`min-w-[240px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[360px] max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] group transition-all duration-500 hover:-translate-y-3 flex-shrink-0 perspective-3d ${animationType}`}
              style={{ animationDelay: `${delay}s` }}
            >
              <div className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover-3d-tilt card-flip">

                {/* Top Section - Quote + Stars with 3D */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center shadow-xl hover:scale-125 hover:rotate-12 transition-all duration-300 animate-bounce-in">
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="white" />
                  </div>

                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 hover:scale-125 ${
                          i < t.rating ? "text-yellow-400 animate-pulse-slow" : "text-gray-300"
                        }`}
                        fill={i < t.rating ? "#FACC15" : "none"}
                        stroke={i < t.rating ? "#FACC15" : "#D1D5DB"}
                        strokeWidth={1.3}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Text with fade effect */}
                <blockquote className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-[15px] min-h-[80px] sm:min-h-[100px] group-hover:text-[#1f3492] transition-colors duration-300 break-words">
                  "{t.quote}"
                </blockquote>

                {/* Animated Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#1f3492]/30 to-transparent my-3 sm:my-4 md:my-5 group-hover:via-[#c8348f]/50 transition-all duration-300"></div>

                {/* Author Info with 3D effects */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {t.pic ? (
                    <img
                      src={t.pic}
                      alt={t.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-lg border-2 border-white hover:scale-125 hover:rotate-12 transition-all duration-300 hover-3d-tilt"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg hover:scale-125 hover:rotate-12 transition-all duration-300 hover-3d-tilt animate-pulse-slow">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1f3492] transition-colors duration-300">
                      {t.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>

                {/* Enhanced gradient hover effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1f3492]/0 via-[#c8348f]/0 to-[#1f3492]/0 group-hover:from-[#1f3492]/10 group-hover:via-[#c8348f]/10 group-hover:to-[#1f3492]/10 transition-all duration-500 pointer-events-none"></div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: 'translateX(-100%)', animation: 'shimmer 2s infinite' }}></div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Hint with animation */}
      <div className="text-center mt-3 sm:mt-4 animate-bounce-in">
        <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium animate-pulse-slow">← Scroll to explore →</p>
      </div>

      {/* Hide scrollbar */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
}
