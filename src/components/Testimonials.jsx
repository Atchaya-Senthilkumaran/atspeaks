import React from "react";
import { testimonials } from "../data/data";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="mt-12 sm:mt-16 md:mt-20 relative w-full overflow-x-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f3492]/10 via-transparent to-[#c8348f]/10 -z-10 rounded-3xl blur-3xl"></div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">What learners say</h2>
        <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 mx-auto"></div>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 sm:mt-3">
          Real feedback from students who've experienced our workshops and sessions.
        </p>
      </div>

      {/* Scroll container (manual only) */}
      <div className="mt-6 sm:mt-8 md:mt-10 overflow-x-auto pb-6 hide-scrollbar scroll-smooth w-full">
        <div className="flex gap-3 sm:gap-4 md:gap-6 w-max pl-4 sm:pl-6 md:pl-6 pr-4 sm:pr-6 md:pr-6 py-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="min-w-[240px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[360px] max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] group transition-transform duration-300 hover:-translate-y-2 flex-shrink-0"
            >
              <div className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">

                {/* Top Section - Quote + Stars */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center shadow-lg">
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="white" />
                  </div>

                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < t.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill={i < t.rating ? "#FACC15" : "none"}
                        stroke={i < t.rating ? "#FACC15" : "#D1D5DB"}
                        strokeWidth={1.3}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <blockquote className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-[15px] min-h-[80px] sm:min-h-[100px]">
                  "{t.quote}"
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-3 sm:my-4 md:my-5"></div>

                {/* Author Info */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {t.pic ? (
                    <img
                      src={t.pic}
                      alt={t.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md border-2 border-white"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-md">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>

                {/* Accent gradient hover effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1f3492]/0 to-[#c8348f]/0 group-hover:from-[#1f3492]/5 group-hover:to-[#c8348f]/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-3 sm:mt-4">
        <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium">← Scroll to explore →</p>
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
