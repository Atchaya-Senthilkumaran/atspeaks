import React from "react";
import Tag from "./Tag";
import { Users, Award, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-8 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-gradient-to-br from-[#1f3492]/25 via-[#c8348f]/20 to-transparent blur-[90px] -z-10 rounded-full"></div>

      {/* LEFT CONTENT */}
      <div className="pl-2">
        <h1 className="text-[42px] sm:text-[48px] md:text-[54px] font-extrabold leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            AT Speaks
          </span>{" "}
          empowers
          <br />
          you to learn
          <br />
          Skills that shape
          <br />
          real careers.
        </h1>

        <p className="mt-5 text-lg text-slate-700 max-w-xl leading-relaxed">
          Building future-ready minds in design, code, and emerging tech
          through practical projects that turn learning into confident,
          lasting action.
        </p>

        {/* CTA Buttons */}
        <div className="mt-7 flex flex-wrap gap-4">
          <a
            href="#events"
            className="rounded-full px-6 py-3 bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-semibold shadow hover:brightness-95 transition"
          >
            Explore Events
          </a>

          <a
            href="#contact"
            className="rounded-full px-6 py-3 bg-white/80 backdrop-blur border border-slate-200 font-medium hover:bg-white transition"
          >
            Contact Us
          </a>
        </div>

        {/* Highlights */}
        <div className="mt-8">
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            What We Offer
          </div>

          <div className="mt-3 flex flex-wrap gap-3">
            <Tag text="Workshops" />
            <Tag text="Webinars" />
            <Tag text="Hands-on Training" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — IMPACT CARD (OLD POSITION) */}
      <div className="relative flex justify-center md:justify-end pr-6">
        {/* BACK CARD */}
        <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-[#1f3492] to-[#c8348f] shadow-2xl rotate-12 relative overflow-hidden">
          {/* Dot Pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1.4px, transparent 1.4px)",
              backgroundSize: "18px 18px",
            }}
          ></div>
        </div>

        {/* FRONT CARD */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col items-center justify-center p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Our Impact
          </h3>

          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#1f3492]/30 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-slate-900">1000+</div>
              <div className="text-[10px] text-slate-600">Students</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#c8348f]/30 flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-slate-900">10+</div>
              <div className="text-[10px] text-slate-600">Events</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#1f3492]/30 flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-slate-900">5+</div>
              <div className="text-[10px] text-slate-600">Domains</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
