import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Linkedin, Instagram, Mail } from "lucide-react";

export default function FounderSection() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className={`mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 w-full py-6 sm:py-8 md:py-10 overflow-x-hidden scroll-reveal-3d ${isRevealed ? 'revealed' : ''}`}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 animate-3d-pop break-words">Founder</h2>
      <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 mb-3 sm:mb-4 animate-glow-pulse"></div>

      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 border border-gray-100 relative overflow-hidden w-full hover-3d-tilt transition-all duration-500 perspective-3d animate-bounce-in">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f3492]/20 via-[#c8348f]/20 to-[#1f3492]/20 opacity-30 blur-3xl -z-10 animate-glow-pulse"></div>
        
        {/* Floating Particles Effect */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#1f3492]/30 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-[#c8348f]/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-[#1f3492]/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-[#c8348f]/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>

        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4">
          <div className="relative w-full flex justify-center lg:justify-start">
            {/* Clean circular frame with gradient border */}
            <div className="relative p-1 rounded-full bg-gradient-to-br from-[#1f3492] via-[#c8348f] to-[#1f3492] animate-glow-pulse">
              <div className="rounded-full bg-white p-1">
                <img
                  src="/atpic.jpg"
                  alt="Founder"
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 object-cover rounded-full hover:scale-105 transition-all duration-500 max-w-full"
                />
              </div>
            </div>
          </div>

          {/* Stats with 3D Effects */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 text-center w-full mt-2 sm:mt-3">
            <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:scale-110 hover:rotate-2 hover-3d-tilt transition-all duration-300 animate-bounce-in animate-delay-100 perspective-3d">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#1f3492] animate-pulse-slow">10+</p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Events</p>
            </div>
            <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:scale-110 hover:rotate-2 hover-3d-tilt transition-all duration-300 animate-bounce-in animate-delay-200 perspective-3d">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#1f3492] animate-pulse-slow">1000+</p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Learners</p>
            </div>
            <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:scale-110 hover:rotate-2 hover-3d-tilt transition-all duration-300 animate-bounce-in animate-delay-300 perspective-3d">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#1f3492] animate-pulse-slow">3+</p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Domains</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 animate-slide-up-rotate">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent animate-glow-pulse break-words">
            Atchaya Senthilkumaran
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium mb-3 sm:mb-4 animate-fade-in animate-delay-100 break-words">Founder & CEO — AT Speaks</p>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-2 sm:mb-3 animate-fade-in animate-delay-200 break-words">
            Atchaya is a visionary educator and tech enthusiast, known for delivering hands-on
            learning experiences that blend creativity, design thinking, and real-world development.
            Her journey with AT Speaks started with a mission to empower students to build practical
            skills and confidence through community-driven sessions.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 animate-fade-in animate-delay-300 break-words">
            With a strong background in UI/UX, Web development, Data visualization and Emerging Ai Techonologies, she has
            mentored 1000+ learners, hosted multiple workshops, and continues to push forward
            impactful education for the next generation.
          </p>

          {/* Social Icons + Mail with 3D Effects */}
          <div className="flex gap-2 sm:gap-2.5 md:gap-3 items-center justify-center lg:justify-start">
            <a
              href="https://www.linkedin.com/in/atchayasenthilkumaran/"
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-gray-100 to-white hover:from-[#1f3492] hover:to-[#1f3492] rounded-full border border-gray-200 hover:border-[#1f3492] transition-all duration-500 flex items-center justify-center min-w-[44px] min-h-[44px] hover:scale-125 hover:rotate-12 hover-3d-tilt shadow-md hover:shadow-xl animate-bounce-in animate-delay-400"
            >
              <Linkedin className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700 hover:text-white transition-colors duration-300" />
            </a>

            <a
              href="https://www.instagram.com/atchaya_senthilkumaran/"
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-gray-100 to-white hover:from-[#c8348f] hover:to-[#c8348f] rounded-full border border-gray-200 hover:border-[#c8348f] transition-all duration-500 flex items-center justify-center min-w-[44px] min-h-[44px] hover:scale-125 hover:rotate-12 hover-3d-tilt shadow-md hover:shadow-xl animate-bounce-in animate-delay-500"
            >
              <Instagram className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700 hover:text-white transition-colors duration-300" />
            </a>

            {/* Mail Link */}
            <a
              href="mailto:atchayasenthilkumaran@gmail.com"
              className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-gray-100 to-white hover:from-[#1f3492] hover:to-[#c8348f] rounded-full border border-gray-200 hover:border-transparent transition-all duration-500 flex items-center justify-center min-w-[44px] min-h-[44px] hover:scale-125 hover:rotate-12 hover-3d-tilt shadow-md hover:shadow-xl animate-bounce-in animate-delay-600"
            >
              <Mail className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-700 hover:text-white transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
