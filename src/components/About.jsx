import React from "react";
import { Rocket, Users, MonitorSmartphone, PenTool } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 w-full overflow-x-hidden">
      {/* Heading - Mobile First */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        About AT Speaks
      </h2>
      <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mt-2"></div>

      {/* Main layout - Mobile First: 1 column on mobile, 2 columns on lg+ */}
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">

        {/* Left: What we do cards - Mobile First: 1 column on mobile, 2 columns on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full">

          {/* Card 1 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-600" />
            <h3 className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-semibold">Hands-on Workshops</h3>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">
              Practical sessions in tech, UI/UX & real-world tools.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <MonitorSmartphone className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-pink-600" />
            <h3 className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-semibold">Project-Driven Learning</h3>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">
              Helping learners build meaningful portfolio-ready work.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-600" />
            <h3 className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-semibold">Community Sessions</h3>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">
              Webinars, Q&As, and open learning spaces for students.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
            <PenTool className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-pink-600" />
            <h3 className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-semibold">Design & Tech Guidance</h3>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">
              Portfolio help, career clarity, and personal mentoring.
            </p>
          </div>

        </div>

        {/* Right: Highlighted founder-led mission */}
        <div className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50 to-pink-50 border shadow-sm hover:shadow-md transition">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">A Founder-Led Edutech Startup</h3>

          <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
            AT Speaks is a growing edutech startup led by
            Atchaya Senthilkumaran — focused on delivering
            practical, industry-aligned learning for students across
            design and technology.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed mt-2 sm:mt-3 md:mt-4">
            Everything we teach comes from doing, not just theory.
            We aim to make learning accessible, simple, and deeply hands-on.
          </p>

          {/* Stats */}
          <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center">
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-indigo-600">10+</h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-600">Events</p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-indigo-600">1000+</h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-600">Learners</p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-indigo-600">Practical</h4>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-600">Approach</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
