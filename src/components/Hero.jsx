import React from "react";
import Tag from "./Tag";
import { Users, Award, TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-0 pb-8 sm:pb-12 md:pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center w-full overflow-visible"
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-[#1f3492]/20 via-[#c8348f]/20 to-transparent blur-[100px] sm:blur-[120px] md:blur-[140px] -z-10 rounded-full"></div>

      {/* LEFT CONTENT */}
      <div className="px-2 sm:px-0 w-full overflow-x-hidden order-1 md:order-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight break-words">
          <span className="bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </span>{" "}
          empowers you to learn
          <br />
          <span className="text-slate-900">
            Skills that shape real careers.
          </span>
        </h1>

        <p className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed break-words">
          Building future-ready minds in design, code, and emerging tech through practical projects that turn learning into confident, lasting action.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-7 md:mt-8 flex flex-wrap gap-3 sm:gap-4">
          <a
            href="#events"
            className="rounded-full px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white text-sm sm:text-base font-semibold shadow hover:brightness-95 transition"
          >
            Explore Events
          </a>

          <a
            href="#contact"
            className="rounded-full px-5 py-2.5 sm:px-6 sm:py-3 bg-white/80 backdrop-blur border border-slate-200 text-sm sm:text-base font-medium hover:bg-white transition"
          >
            Contact Us
          </a>
        </div>

        {/* Highlights */}
        <div className="mt-8 sm:mt-9 md:mt-10">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            What We Offer
          </div>

          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
            <Tag text="Workshops" />
            <Tag text="Webinars" />
            <Tag text="Hands-on Training" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — IMPACT SHOWCASE */}
      <div className="relative flex justify-center md:justify-end mt-12 md:mt-0 w-full overflow-visible max-w-full order-2 md:order-2">
        {/* Background Card - Rotated Gradient with Pattern */}
        <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-[#1f3492] to-[#c8348f] shadow-2xl transform rotate-12 relative overflow-hidden">
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
          <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full bg-white/25 blur-3xl"></div>
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-6 sm:left-8 md:left-12 w-28 sm:w-36 md:w-40 h-28 sm:h-36 md:h-40 rounded-full bg-white/25 blur-3xl"></div>
        </div>

        {/* Foreground Card - Stats & Impact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl bg-gradient-to-br from-white via-[#1f3492]/20 to-[#c8348f]/20 backdrop-blur-xl border-2 border-[#1f3492]/40 shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">

          {/* Header */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">Our Impact</h3>
          </div>

          {/* Stats Grid - Simple 3 Column */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">

            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#1f3567]/40 flex items-center justify-center mb-2 sm:mb-2.5 md:mb-3 shadow-md">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#ededef]" strokeWidth={2.5} />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">1000+</div>
              <div className="text-[10px] sm:text-xs text-white mt-0.5 sm:mt-1 font-semibold">Students</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#c8348e]/40 flex items-center justify-center mb-2 sm:mb-2.5 md:mb-3 shadow-md">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#ededef]" strokeWidth={2.5} />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">10+</div>
              <div className="text-[10px] sm:text-xs text-white mt-0.5 sm:mt-1 font-semibold">Events</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#1f3567]/40 flex items-center justify-center mb-2 sm:mb-2.5 md:mb-3 shadow-md">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#ededef]" strokeWidth={2.5} />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">5+</div>
              <div className="text-[10px] sm:text-xs text-white mt-0.5 sm:mt-1 font-semibold">Domains</div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
