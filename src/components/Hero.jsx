import React from "react";
import Tag from "./Tag";
import { Users, Award, TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-4 pb-8 md:pb-12 lg:pb-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center w-full overflow-hidden"
    >

      {/* Background Glow - Mobile First */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] bg-gradient-to-br from-[#1f3492]/20 via-[#c8348f]/20 to-transparent blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[140px] -z-10 rounded-full max-w-[90vw]"></div>

      {/* LEFT CONTENT - Mobile First */}
      <div className="px-2 md:px-0 w-full overflow-x-hidden order-2 md:order-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight break-words">
          <span className="bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </span>{" "}
          empowers you to learn
          <br className="hidden md:block" />
          <span className="text-slate-900">
            Skills that shape real careers.
          </span>
        </h1>

        <p className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-sm sm:text-base md:text-lg text-slate-700 max-w-xl leading-relaxed break-words">
          Building future-ready minds in design, code, and emerging tech through practical projects that turn learning into confident, lasting action.
        </p>

        {/* CTA Buttons - Mobile First */}
        <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          <a
            href="#events"
            className="rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white text-xs sm:text-sm md:text-base font-semibold shadow hover:brightness-95 transition whitespace-nowrap"
          >
            Explore Events
          </a>

          <a
            href="#contact"
            className="rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white/80 backdrop-blur border border-slate-200 text-xs sm:text-sm md:text-base font-medium hover:bg-white transition whitespace-nowrap"
          >
            Contact Us
          </a>
        </div>

        {/* Highlights - Mobile First */}
        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10">
          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            What We Offer
          </div>

          <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap gap-2 sm:gap-3">
            <Tag text="Workshops" />
            <Tag text="Webinars" />
            <Tag text="Hands-on Training" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — IMPACT SHOWCASE - Mobile First */}
      <div className="relative flex justify-center md:justify-end mt-6 md:mt-0 w-full overflow-hidden max-w-full order-1 md:order-2">
        {/* Background Card - Rotated Gradient with Pattern */}
        <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[380px] xl:h-[380px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1f3492] to-[#c8348f] shadow-2xl transform rotate-12 relative overflow-hidden max-w-[85vw] sm:max-w-[80vw] md:max-w-[75vw] lg:max-w-full">
          {/* Dot Pattern */}
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)`,
            backgroundSize: '18px 18px'
          }}></div>
          {/* Diagonal Lines Pattern */}
          <div className="absolute inset-0 opacity-35" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.25) 12px, rgba(255,255,255,0.25) 14px)`
          }}></div>
          {/* Decorative Glow Circles */}
          <div className="absolute top-2 sm:top-4 md:top-6 lg:top-8 right-2 sm:right-4 md:right-6 lg:right-8 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 rounded-full bg-white/25 blur-3xl"></div>
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-3 sm:left-4 md:left-6 lg:left-8 w-20 sm:w-24 md:w-28 lg:w-36 xl:w-40 h-20 sm:h-24 md:h-28 lg:h-36 xl:h-40 rounded-full bg-white/25 blur-3xl"></div>
        </div>

        {/* Foreground Card - Stats & Impact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] xl:w-[340px] xl:h-[340px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-[#1f3492]/20 to-[#c8348f]/20 backdrop-blur-xl border-2 border-[#1f3492]/40 shadow-2xl flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 max-w-[80vw] sm:max-w-[75vw] md:max-w-[70vw] lg:max-w-full">

          {/* Header */}
          <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white text-center">Our Impact</h3>
          </div>

          {/* Stats Grid - Simple 3 Column */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 w-full px-1 sm:px-2">

            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full bg-[#1f3567]/40 flex items-center justify-center mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 xl:mb-3 shadow-md">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#ededef]" strokeWidth={2.5} />
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white">1000+</div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white mt-0.5 sm:mt-1 font-semibold">Students</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full bg-[#c8348e]/40 flex items-center justify-center mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 xl:mb-3 shadow-md">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#ededef]" strokeWidth={2.5} />
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white">10+</div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white mt-0.5 sm:mt-1 font-semibold">Events</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full bg-[#1f3567]/40 flex items-center justify-center mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 xl:mb-3 shadow-md">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#ededef]" strokeWidth={2.5} />
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white">5+</div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white mt-0.5 sm:mt-1 font-semibold">Domains</div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
