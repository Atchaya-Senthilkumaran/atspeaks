import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Layers, Award, Briefcase, UserCheck } from "lucide-react";

export default function Services() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className={`mt-8 sm:mt-10 md:mt-12 mb-12 sm:mb-16 md:mb-20 w-full overflow-x-hidden scroll-reveal-3d ${isRevealed ? 'revealed' : ''}`}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex flex-wrap items-center gap-2 sm:gap-3 animate-3d-pop break-words">
        Services & Courses
        <span className="text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#1f3492]/10 text-[#1f3492] font-medium animate-glow-pulse">
          Coming Soon
        </span>
      </h2>

      <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 animate-glow-pulse"></div>

      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl animate-zoom-in-blur animate-delay-100">
        A set of premium learning experiences — designed to help students grow through structured, practical and hands-on learning.
      </p>

      {/* Grid - Mobile First: 1 column on mobile, 2 columns on sm+, 4 columns on lg+ */}
      <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
        {/* BOOTCAMPS */}
        <div className="p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-white shadow-sm border hover:shadow-2xl hover:-translate-y-3 hover-3d-tilt transition-all duration-500 animate-3d-rotate-y animate-delay-100 perspective-3d">
          <Layers className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1f3492] mb-2 sm:mb-3 hover:scale-125 hover:rotate-12 transition-all duration-300 animate-float" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold break-words">Bootcamps</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 break-words">
            Intensive weekend programs with guided practice and real project building.
          </p>
        </div>

        {/* CERTIFICATION COURSES */}
        <div className="p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-white shadow-sm border hover:shadow-2xl hover:-translate-y-3 hover-3d-tilt transition-all duration-500 animate-3d-rotate-y animate-delay-200 perspective-3d">
          <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1f3492] mb-2 sm:mb-3 hover:scale-125 hover:rotate-12 transition-all duration-300 animate-float" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold break-words">Certification Courses</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 break-words">
            Step-by-step structured courses with verified certification.
          </p>
        </div>

        {/* PLACEMENT GUIDANCE */}
        <div className="p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-white shadow-sm border hover:shadow-2xl hover:-translate-y-3 hover-3d-tilt transition-all duration-500 animate-3d-rotate-y animate-delay-300 perspective-3d">
          <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1f3492] mb-2 sm:mb-3 hover:scale-125 hover:rotate-12 transition-all duration-300 animate-float" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold break-words">Placement Guidance</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 break-words">
            Resume support, portfolio building and mock interviews for job-readiness.
          </p>
        </div>

        {/* PERSONALIZED LEARNING */}
        <div className="p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-white shadow-sm border hover:shadow-2xl hover:-translate-y-3 hover-3d-tilt transition-all duration-500 animate-3d-rotate-y animate-delay-400 perspective-3d">
          <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1f3492] mb-2 sm:mb-3 hover:scale-125 hover:rotate-12 transition-all duration-300 animate-float" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold break-words">1-on-1 Personalized Learning</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 break-words">
            Private, customised sessions aligned to your speed and learning goals.
          </p>
        </div>
      </div>
    </section>
  );
}
