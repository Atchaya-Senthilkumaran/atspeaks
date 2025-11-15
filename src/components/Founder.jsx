import React from "react";
import { Linkedin, Instagram, Mail } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 overflow-x-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Founder</h2>
      <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 mb-4 sm:mb-6 md:mb-8 lg:mb-10"></div>

      <div className="bg-white shadow-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 border border-gray-100 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f3492]/20 via-[#c8348f]/20 to-[#1f3492]/20 opacity-30 blur-3xl -z-10"></div>

        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 md:gap-5">
          <div className="relative w-full flex justify-center lg:justify-start">
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1f3492] to-[#c8348f] blur-xl opacity-60"></div>
            <img
              src="/atpic.jpg"
              alt="Founder"
              className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 object-cover rounded-xl sm:rounded-2xl shadow-xl border border-white/40 hover:scale-105 transition duration-300 max-w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 text-center w-full mt-2 sm:mt-3 md:mt-4">
            <div className="p-2 sm:p-2.5 md:p-3 bg-gray-50 rounded-lg sm:rounded-xl shadow-sm">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#1f3492]">10+</p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Events</p>
            </div>
            <div className="p-2 sm:p-2.5 md:p-3 bg-gray-50 rounded-lg sm:rounded-xl shadow-sm">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#1f3492]">1000+</p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Learners</p>
            </div>
            <div className="p-2 sm:p-2.5 md:p-3 bg-gray-50 rounded-lg sm:rounded-xl shadow-sm">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#1f3492]">3+</p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Domains</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Atchaya Senthilkumaran</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium mb-3 sm:mb-4 md:mb-5">Founder & CEO — AT Speaks</p>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-2 sm:mb-3 md:mb-4">
            Atchaya is a visionary educator and tech enthusiast, known for delivering hands-on
            learning experiences that blend creativity, design thinking, and real-world development.
            Her journey with AT Speaks started with a mission to empower students to build practical
            skills and confidence through community-driven sessions.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6">
            With a strong background in UI/UX, Web development, Data visualization and Emerging Ai Techonologies, she has
            mentored 1000+ learners, hosted multiple workshops, and continues to push forward
            impactful education for the next generation.
          </p>

          {/* Social Icons + Mail */}
          <div className="flex gap-2 sm:gap-2.5 md:gap-3 items-center justify-center lg:justify-start">
            <a
              href="https://www.linkedin.com/in/atchayasenthilkumaran/"
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 md:p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <Linkedin className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700" />
            </a>

            <a
              href="https://www.instagram.com/atchaya_senthilkumaran/"
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 md:p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <Instagram className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700" />
            </a>

            {/* Mail Link */}
            <a
              href="mailto:atchayasenthilkumaran@gmail.com"
              className="p-2 sm:p-2.5 md:p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <Mail className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
