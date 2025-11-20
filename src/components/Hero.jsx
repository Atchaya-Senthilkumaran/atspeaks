import React, { useEffect, useRef } from "react";
import Tag from "./Tag";
import { Users, Award, TrendingUp } from "lucide-react";

export default function Hero() {
  const cardRef = useRef(null);

  useEffect(() => {
    // Add animation to the impact card
    if (cardRef.current) {
      cardRef.current.style.animation = 'scaleIn 0.8s ease-out forwards';
    }
  }, []);

  return (
    <section
      id="home"
      className="relative pt-3 pb-16 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full overflow-visible md:-ml-3 md:-mt-2"
    >
      {/* Background Glow - Animated */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#1f3492]/20 via-[#c8348f]/20 to-transparent blur-[60px] -z-10 rounded-full animate-pulse-slow"></div>

      {/* LEFT CONTENT - Fade in animation */}
      <div className="w-full animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
          <span className="bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </span>{" "}
          empowers you to learn
          <span className="text-slate-900"> skills that shape real careers.</span>
        </h1>

        <p className="mt-3 text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed animate-fade-in animate-delay-100">
          Building future-ready minds in design, code, and emerging tech through
          practical projects that turn learning into confident, lasting action.
        </p>

        {/* CTA Buttons - Slide in */}
        <div className="mt-4 flex flex-wrap gap-3 animate-fade-in animate-delay-200">
          <a
            href="#events"
            className="rounded-full px-6 py-3 bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white text-base font-semibold shadow hover:brightness-95 hover:scale-105 transition-all duration-300 hover:shadow-lg"
          >
            Explore Events
          </a>

          <a
            href="#contact"
            className="rounded-full px-6 py-3 bg-white/80 backdrop-blur border border-slate-200 text-base font-medium hover:bg-white hover:scale-105 transition-all duration-300 hover:shadow-md"
          >
            Contact Us
          </a>
        </div>

        {/* Highlights - Fade in */}
        <div className="mt-4 animate-fade-in animate-delay-300">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            What We Offer
          </div>

          <div className="mt-1.5 flex flex-wrap gap-2">
            <Tag text="Workshops" />
            <Tag text="Webinars" />
            <Tag text="Hands-on Training" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — IMPACT SHOWCASE - Animated */}
      <div className="relative flex justify-center md:justify-end w-full px-4 md:pr-6 overflow-visible animate-slide-in-right">
        {/* Background Card - Float animation */}
        <div 
          ref={cardRef}
          className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-3xl bg-gradient-to-br from-[#1f3492] to-[#c8348f] shadow-2xl rotate-12 relative overflow-hidden animate-float"
        >
          {/* Dot Pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)`,
              backgroundSize: "18px 18px",
            }}
          ></div>
          {/* Lines Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.25) 12px, rgba(255,255,255,0.25) 14px)`,
            }}
          ></div>
        </div>

        {/* Foreground Card - Scale in */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl bg-gradient-to-br from-white via-[#1f3492]/20 to-[#c8348f]/20 backdrop-blur-xl border-2 border-[#1f3492]/40 shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 animate-scale-in">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white text-center mb-3 sm:mb-4">
            Our Impact
          </h3>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center animate-fade-in animate-delay-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1f3567]/40 flex items-center justify-center shadow-md mb-1.5 sm:mb-2 hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#ededef]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-white">1000+</div>
              <div className="text-[9px] sm:text-[10px] text-white font-semibold">Students</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center animate-fade-in animate-delay-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c8348e]/40 flex items-center justify-center shadow-md mb-1.5 sm:mb-2 hover:scale-110 transition-transform duration-300">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#ededef]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-white">10+</div>
              <div className="text-[9px] sm:text-[10px] text-white font-semibold">Events</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center animate-fade-in animate-delay-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1f3567]/40 flex items-center justify-center shadow-md mb-1.5 sm:mb-2 hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#ededef]" />
              </div>
              <div className="text-base sm:text-lg font-bold text-white">5+</div>
              <div className="text-[9px] sm:text-[10px] text-white font-semibold">Domains</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
