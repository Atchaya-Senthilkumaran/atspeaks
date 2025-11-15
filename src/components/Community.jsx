import React from "react";
import { Users, Building2, Rocket, Handshake } from "lucide-react";

export default function Community() {
  return (
    <section id="community" className="mt-16 sm:mt-18 md:mt-20">
      {/* Section Header */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Community & Partnerships</h2>
      <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2"></div>
      <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
        We collaborate with colleges, student clubs, and early-stage startups to run workshops and hands-on sessions.
        Interested in partnership opportunities? Let's connect.
      </p>

      {/* Partnership Cards */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">

        {/* Colleges Card */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <div className="w-12 h-12 rounded-full bg-[#1f3492]/10 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-[#1f3492]" />
          </div>
          <h3 className="text-lg font-semibold mb-2">College Workshops</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Bring hands-on tech and design sessions to your campus. Tailored workshops for students.
          </p>
        </div>

        {/* Student Clubs Card */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <div className="w-12 h-12 rounded-full bg-[#c8348f]/10 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-[#c8348f]" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Student Communities</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Collaborate with your club or community for exclusive learning events and sessions.
          </p>
        </div>

        {/* Startups Card */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <div className="w-12 h-12 rounded-full bg-[#1f3492]/10 flex items-center justify-center mb-4">
            <Rocket className="w-6 h-6 text-[#1f3492]" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Startup Collaborations</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Partner with us for skill development programs and team training initiatives.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1f3492]/10 via-[#1f3492]/5 to-[#c8348f]/10 border shadow-sm relative overflow-hidden w-full">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1f3492]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c8348f]/20 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 w-full">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full md:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0">
              <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-[#1f3492]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Ready to Collaborate?</h3>
              <p className="text-sm sm:text-base text-slate-700 max-w-xl">
                Whether you're an educational institution or a growing startup, let's work together to empower learners.
              </p>
            </div>
          </div>
          <a
            href="mailto:connect.atspeaks@gmail.com"
            className="rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-semibold hover:brightness-95 transition shadow-lg hover:shadow-xl whitespace-nowrap w-full sm:w-auto text-center"
          >
            Partner with us
          </a>
        </div>
      </div>
    </section>
  );
}
