import React, { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { testimonials } from "../data/data";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });
  const scrollerRef = useRef(null);

  const scrollTestimonials = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector("[data-testimonial-card]");
    const distance = card ? card.getBoundingClientRect().width + 24 : scroller.clientWidth * 0.85;
    scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`py-7 relative w-full scroll-reveal-3d ${isRevealed ? "revealed" : ""} overflow-hidden`}
    >
      <div className="text-center max-w-2xl mx-auto px-2 animate-3d-pop">
        <div className="relative inline-block">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 animate-glow-pulse break-words">
            What learners say
          </h2>
          <div className="h-1 w-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 animate-glow-pulse shadow-lg shadow-[#c8348f]/30"></div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 sm:mt-3 animate-zoom-in-blur animate-delay-100">
          Real feedback from students who've experienced our workshops and sessions.
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="feedback-scroller mt-6 sm:mt-8 md:mt-10 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory overscroll-x-contain w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3492]/40 focus-visible:ring-offset-2 rounded-2xl"
        tabIndex="0"
        aria-label="Learner feedback carousel"
      >
        <div className="flex gap-3 sm:gap-4 md:gap-6 w-max min-w-full pl-4 sm:pl-6 md:pl-2 pr-4 sm:pr-6 md:pr-2 py-4">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              data-testimonial-card
              className={`feedback-card min-w-[240px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[360px] max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] group flex-shrink-0 perspective-3d snap-start ${isRevealed ? "feedback-card-visible" : ""}`}
              style={{ "--feedback-delay": `${index * 90}ms` }}
            >
              <div className="feedback-card-surface relative h-full p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover-3d-tilt">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="white" />
                  </div>

                  <div className="flex gap-0.5 sm:gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110 ${
                          starIndex < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill={starIndex < testimonial.rating ? "#FACC15" : "none"}
                        stroke={starIndex < testimonial.rating ? "#FACC15" : "#D1D5DB"}
                        strokeWidth={1.3}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-[15px] min-h-[80px] sm:min-h-[100px] group-hover:text-[#1f3492] transition-colors duration-300 break-words">
                  “{testimonial.quote}”
                </blockquote>

                <div className="h-px bg-gradient-to-r from-transparent via-[#1f3492]/30 to-transparent my-3 sm:my-4 md:my-5 group-hover:via-[#c8348f]/50 transition-all duration-300"></div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {testimonial.pic ? (
                    <img
                      src={testimonial.pic}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-lg border-2 border-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {testimonial.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1f3492] transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500">{testimonial.role}</div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1f3492]/0 via-[#c8348f]/0 to-[#1f3492]/0 group-hover:from-[#1f3492]/10 group-hover:via-[#c8348f]/10 group-hover:to-[#1f3492]/10 transition-all duration-500 pointer-events-none"></div>
                <div className="feedback-shimmer absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"></div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hidden md:flex justify-center gap-4 mt-5 px-2">
        <button
          type="button"
          onClick={() => scrollTestimonials(-1)}
          className="w-14 h-14 rounded-full border-2 border-[#1f3492]/20 bg-white text-[#1f3492] shadow-lg hover:bg-[#1f3492] hover:text-white hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3492] focus-visible:ring-offset-2"
          aria-label="Show previous feedback"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          type="button"
          onClick={() => scrollTestimonials(1)}
          className="w-14 h-14 rounded-full border-2 border-[#c8348f]/20 bg-white text-[#c8348f] shadow-lg hover:bg-[#c8348f] hover:text-white hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8348f] focus-visible:ring-offset-2"
          aria-label="Show next feedback"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      <div className="text-center mt-3 sm:mt-4 animate-bounce-in">
        <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-medium">
          <span className="md:hidden">← Swipe to explore →</span>
          <span className="hidden md:inline">Use the arrows to explore more feedback</span>
        </p>
      </div>

      <style>
        {`
          .feedback-scroller {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .feedback-scroller::-webkit-scrollbar {
            display: none;
          }

          .feedback-card {
            opacity: 0;
          }

          .feedback-card-visible {
            animation: feedback-card-reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: var(--feedback-delay);
          }

          .feedback-card-surface {
            transform-origin: center bottom;
          }

          .feedback-card:hover .feedback-card-surface {
            transform: translateY(-10px) rotateX(2deg) rotateY(-1deg) scale(1.015);
          }

          .feedback-card:hover .feedback-shimmer {
            animation: feedback-shimmer 900ms ease-out;
          }

          @keyframes feedback-card-reveal {
            from {
              opacity: 0;
              transform: translate3d(0, 38px, 0) scale(0.96) rotateY(-8deg);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1) rotateY(0);
            }
          }

          @keyframes feedback-shimmer {
            from { transform: translateX(0) rotate(12deg); }
            to { transform: translateX(550%) rotate(12deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .feedback-card,
            .feedback-card-visible {
              opacity: 1;
              animation: none;
              transform: none;
            }
          }
        `}
      </style>
    </section>
  );
}
