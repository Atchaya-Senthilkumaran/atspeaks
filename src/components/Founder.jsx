import React from "react";
import { Linkedin, Instagram, Mail } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Founder</h2>
      <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 mb-6 sm:mb-8 md:mb-10"></div>

      <div className="bg-white shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 border border-gray-100 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f3492]/20 via-[#c8348f]/20 to-[#1f3492]/20 opacity-30 blur-3xl -z-10"></div>

        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5">
          <div className="relative w-full flex justify-center lg:justify-start">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1f3492] to-[#c8348f] blur-xl opacity-60"></div>
            <img
              src="/atpic.jpg"
              alt="Founder"
              className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-cover rounded-2xl shadow-xl border border-white/40 hover:scale-105 transition duration-300 max-w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center w-full mt-2 sm:mt-4">
            <div className="p-2 sm:p-3 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-lg sm:text-xl font-bold text-[#1f3492]">10+</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Events</p>
            </div>
            <div className="p-2 sm:p-3 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-lg sm:text-xl font-bold text-[#1f3492]">1000+</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Learners</p>
            </div>
            <div className="p-2 sm:p-3 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-lg sm:text-xl font-bold text-[#1f3492]">3+</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Domains</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">Atchaya Senthilkumaran</h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium mb-4 sm:mb-5">Founder & CEO — AT Speaks</p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Atchaya is a visionary educator and tech enthusiast, known for delivering hands-on
            learning experiences that blend creativity, design thinking, and real-world development.
            Her journey with AT Speaks started with a mission to empower students to build practical
            skills and confidence through community-driven sessions.
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
            With a strong background in UI/UX, Web development, Data visualization and Emerging Ai Techonologies, she has
            mentored 1000+ learners, hosted multiple workshops, and continues to push forward
            impactful education for the next generation.
          </p>

          {/* Social Icons + Mail */}
          <div className="flex gap-2 sm:gap-3 items-center justify-center lg:justify-start">
            <a
              href="https://www.linkedin.com/in/atchayasenthilkumaran/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition flex items-center justify-center"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </a>

            <a
              href="https://www.instagram.com/atchaya_senthilkumaran/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition flex items-center justify-center"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </a>

            {/* Mail Link */}
            <a
              href="mailto:atchayasenthilkumaran@gmail.com"
              className="p-2.5 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition flex items-center justify-center"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
