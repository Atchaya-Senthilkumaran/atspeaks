import React from "react";
import { Layers, Award, Briefcase, UserCheck } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="mt-12 sm:mt-14 md:mt-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold flex flex-wrap items-center gap-2 sm:gap-3">
        Services & Courses
        <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-[#1f3492]/10 text-[#1f3492] font-medium">
          Coming Soon
        </span>
      </h2>

      <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2"></div>

      <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
        A set of premium learning experiences — designed to help students grow through structured, practical and hands-on learning.
      </p>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">

        {/* BOOTCAMPS */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-[#1f3492]/10 to-white rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-[#1f3492] mb-2 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-semibold">Bootcamps</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Intensive weekend programs with guided practice and real project building.
          </p>
        </div>

        {/* CERTIFICATION COURSES */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-[#1f3492]/10 to-white rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#1f3492] mb-2 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-semibold">Certification Courses</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Step-by-step structured courses with verified certification.
          </p>
        </div>

        {/* PLACEMENT GUIDANCE */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-[#1f3492]/10 to-white rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-[#1f3492] mb-2 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-semibold">Placement Guidance</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Resume support, portfolio building and mock interviews for job-readiness.
          </p>
        </div>

        {/* PERSONALIZED LEARNING */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-[#1f3492]/10 to-white rounded-xl shadow-sm border hover:shadow-md hover:-translate-y-1 transition">
          <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#1f3492] mb-2 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-semibold">1-on-1 Personalized Learning</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Private, customised sessions aligned to your speed and learning goals.
          </p>
        </div>

      </div>
    </section>
  );
}
