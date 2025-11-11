import React from "react";
import { Rocket, Users, MonitorSmartphone, PenTool } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="mt-8 sm:mt-10 md:mt-12">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        About AT Speaks
      </h2>
      <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mt-2"></div>

      {/* Main layout */}
      <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

        {/* Left: What we do cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* Card 1 */}
          <div className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">Hands-on Workshops</h3>
            <p className="text-slate-600 mt-1 text-sm">
              Practical sessions in tech, UI/UX & real-world tools.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <MonitorSmartphone className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600" />
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">Project-Driven Learning</h3>
            <p className="text-slate-600 mt-1 text-sm">
              Helping learners build meaningful portfolio-ready work.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">Community Sessions</h3>
            <p className="text-slate-600 mt-1 text-sm">
              Webinars, Q&As, and open learning spaces for students.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <PenTool className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600" />
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">Design & Tech Guidance</h3>
            <p className="text-slate-600 mt-1 text-sm">
              Portfolio help, career clarity, and personal mentoring.
            </p>
          </div>

        </div>

        {/* Right: Highlighted founder-led mission */}
        <div className="p-6 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-pink-50 border shadow-sm hover:shadow-md transition">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">A Founder-Led Edutech Startup</h3>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            AT Speaks is a growing edutech startup led by
            Atchaya Senthilkumaran — focused on delivering
            practical, industry-aligned learning for students across
            design and technology.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-3 sm:mt-4">
            Everything we teach comes from doing, not just theory.
            We aim to make learning accessible, simple, and deeply hands-on.
          </p>

          {/* Stats */}
          <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600">10+</h4>
              <p className="text-xs sm:text-sm text-slate-600">Events</p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600">1000+</h4>
              <p className="text-xs sm:text-sm text-slate-600">Learners</p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600">Practical</h4>
              <p className="text-xs sm:text-sm text-slate-600">Approach</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
