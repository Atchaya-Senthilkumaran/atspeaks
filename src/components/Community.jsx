import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Building2, Eye, GraduationCap, Handshake, Rocket, Users, X } from "lucide-react";

const partners = [
  {
    name: "WeLocalHost",
    logo: "/partners/welocalhost.svg",
    website: "https://www.welocalhost.com/"
  }
];

export default function Community() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });
  const [showWorkshopPoster, setShowWorkshopPoster] = useState(false);

  useEffect(() => {
    if (!showWorkshopPoster) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowWorkshopPoster(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showWorkshopPoster]);

  return (
    <section
      id="community"
      ref={sectionRef}
      className={`relative py-7 w-full scroll-reveal-3d ${isRevealed ? "revealed" : ""} overflow-hidden`}
    >
      <div className="relative inline-block">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 animate-3d-pop break-words">
          Community & Partnerships
        </h2>
        <div className="h-1 w-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 animate-glow-pulse shadow-lg shadow-[#c8348f]/30" />
      </div>

      <div className="mt-5 sm:mt-6 rounded-2xl border border-[#1f3492]/15 bg-gradient-to-br from-[#1f3492]/10 via-white to-[#c8348f]/10 p-5 sm:p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#c8348f]/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#1f3492] to-[#c8348f] text-white flex items-center justify-center shadow-xl flex-shrink-0">
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#c8348f]">
              Nexus
            </p>
            <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
              Nexus — AT Speaks&apos; Student Community
            </h3>
            <h4 className="mt-2 text-sm sm:text-base md:text-lg font-semibold text-[#1f3492]">
              Launch Nexus on Your College Campus
            </h4>
            <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 max-w-3xl">
              Create a student-led learning hub for peer mentorship, hands-on workshops, project showcases, career conversations, and cross-campus collaboration—supported by AT Speaks.
            </p>
          </div>
          <a
            href="mailto:connect.atspeaks@gmail.com?subject=Launch%20Nexus%20on%20Our%20College%20Campus"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white shadow-lg hover:brightness-110 hover:scale-105 transition-all whitespace-nowrap"
          >
            Launch Nexus
          </a>
        </div>
      </div>

      <div className="mt-7 sm:mt-8">
        <div className="text-center">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#c8348f]">Growing Together</p>
          <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-slate-900">Our Partners & Collaborations</h3>
        </div>

        <div className="partner-sphere-stage mt-4 sm:mt-5" aria-label="AT Speaks partners and collaborators">
          {partners.map((partner, index) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-sphere-node"
              style={{ "--partner-delay": `${index * 140}ms` }}
              aria-label={`Visit ${partner.name}`}
            >
              <span className="partner-sphere-face">
                <img src={partner.logo} alt={partner.name} className="max-w-[72%] max-h-[72%] object-contain" />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
        <div data-testid="college-workshops-card" className="isolate p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1f3492]/10 to-[#1f3492]/20 flex items-center justify-center mb-3 sm:mb-4 hover:scale-125 hover:rotate-12 transition-all duration-300">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#1f3492] animate-float" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 hover:text-[#1f3492] transition-colors duration-300 break-words">College Workshops</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words flex-1">
            Bring practical AI, technology, aptitude, and career-focused learning experiences directly to your campus.
          </p>
          <button
            type="button"
            onClick={() => setShowWorkshopPoster(true)}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:brightness-110 hover:scale-105 transition-all"
          >
            <Eye className="w-4 h-4" />
            View Workshop
          </button>
        </div>

        <div className="isolate p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#c8348f]/10 to-[#c8348f]/20 flex items-center justify-center mb-3 sm:mb-4 hover:scale-125 hover:rotate-12 transition-all duration-300">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#c8348f] animate-float" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 hover:text-[#c8348f] transition-colors duration-300 break-words">Student Community Programs</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words flex-1">
            Collaborative learning events, peer-led initiatives, and community experiences for student clubs.
          </p>
          <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">Coming Soon</p>
        </div>

        <div className="isolate p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1f3492]/10 to-[#1f3492]/20 flex items-center justify-center mb-3 sm:mb-4 hover:scale-125 hover:rotate-12 transition-all duration-300">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#1f3492] animate-float" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 hover:text-[#1f3492] transition-colors duration-300 break-words">Startup Collaborations</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words flex-1">
            Skill-development programs, team training, and meaningful learning partnerships for growing organizations.
          </p>
          <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">Coming Soon</p>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg bg-gradient-to-br from-[#1f3492]/10 via-[#1f3492]/5 to-[#c8348f]/10 border-2 border-[#1f3492]/20 shadow-xl relative overflow-hidden w-full hover-3d-tilt transition-all duration-500 perspective-3d animate-slide-up-rotate">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full z-10">
          <div className="flex items-start gap-3 md:gap-4 w-full md:w-auto">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center flex-shrink-0">
              <Handshake className="w-5 h-5 md:w-6 md:h-6 text-[#1f3492]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">Ready to Collaborate?</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-xl">
                Invite AT Speaks to your institution or collaborate with us to build practical learning experiences that create lasting student impact.
              </p>
            </div>
          </div>
          <a
            href="mailto:connect.atspeaks@gmail.com?subject=Partnership%20with%20AT%20Speaks"
            className="rounded-full px-5 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-semibold hover:brightness-110 hover:scale-105 transition-all shadow-xl whitespace-nowrap w-full sm:w-auto text-center"
          >
            Partner with Us
          </a>
        </div>
      </div>

      {showWorkshopPoster && createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="workshop-poster-title"
          onClick={() => setShowWorkshopPoster(false)}
        >
          <div className="relative w-fit max-w-[96vw] max-h-[96vh] overflow-hidden rounded-2xl bg-white p-2.5 sm:p-4 shadow-2xl flex flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 px-1 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#c8348f]">College Workshop</p>
                <h3 id="workshop-poster-title" className="text-base sm:text-lg font-bold text-slate-900">Break the Limits — AI Edition</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWorkshopPoster(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100 hover:scale-105 transition-all flex-shrink-0"
                aria-label="Close workshop poster"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 flex items-center justify-center overflow-hidden">
              <img
                src="/community/egs-pillay-ai-workshop.jpeg"
                alt="Break the Limits AI Edition workshop at E.G.S. Pillay Engineering College"
                className="block w-auto h-auto max-w-full max-h-[calc(96vh-5.5rem)] rounded-xl object-contain"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
