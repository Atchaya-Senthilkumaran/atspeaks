import React, { useState, useRef } from "react";
import {
  Sparkles,
  Laptop,
  Clock,
  TrendingUp,
  Users,
  Search,
  MessageSquare,
  Megaphone,
  Award,
  Handshake,
  BarChart3,
  CheckCircle2,
  Briefcase,
  MapPin,
  Calendar,
  ChevronDown,
  ArrowDown,
  FileText,
  UserCheck,
  PhoneCall,
  Rocket
} from "lucide-react";
import SalesInternForm from "../components/SalesInternForm";
import ApplicationSuccess from "../components/ApplicationSuccess";

const RESPONSIBILITIES = [
  {
    num: "01",
    title: "Lead Generation",
    desc: "Identify potential students through colleges, social media and other digital platforms.",
    icon: Search
  },
  {
    num: "02",
    title: "Student Outreach",
    desc: "Connect with prospective students through calls, WhatsApp and social media.",
    icon: MessageSquare
  },
  {
    num: "03",
    title: "Program Promotion",
    desc: "Explain AT Speaks training programs, their benefits and learning outcomes.",
    icon: Megaphone
  },
  {
    num: "04",
    title: "Sales & Conversions",
    desc: "Follow up with interested students and drive successful registrations.",
    icon: TrendingUp
  },
  {
    num: "05",
    title: "Relationship Building",
    desc: "Build relationships with student communities and potential learners.",
    icon: Handshake
  },
  {
    num: "06",
    title: "Performance Tracking",
    desc: "Maintain lead records, follow-ups and conversion reports.",
    icon: BarChart3
  }
];

const GAINS = [
  "Real-world sales and business development experience.",
  "Communication and negotiation skills.",
  "Practical lead generation experience.",
  "Networking opportunities.",
  "Exposure to the EdTech industry.",
  "Internship certificate, subject to completion criteria.",
  "Performance-based earning opportunities."
];

const WHO_CAN_APPLY = [
  "College students and fresh graduates.",
  "Individuals with good communication skills.",
  "Self-motivated and target-oriented candidates.",
  "Individuals interested in sales, marketing and entrepreneurship.",
  "Candidates comfortable with independent and remote work."
];

const INTERNSHIP_DETAILS = [
  { field: "Position", value: "Sales & Business Development Intern", icon: Briefcase },
  { field: "Department", value: "Sales & Growth", icon: BarChart3 },
  { field: "Work Mode", value: "Remote", icon: Laptop },
  { field: "Duration", value: "To be announced", icon: Calendar },
  { field: "Location", value: "Work from Anywhere", icon: MapPin },
  { field: "Compensation", value: "Performance-Based", icon: TrendingUp },
  { field: "Openings", value: "Limited", icon: Users },
  { field: "Experience", value: "Freshers Welcome", icon: Award }
];

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Submit Application",
    desc: "Complete the online application form.",
    icon: FileText
  },
  {
    step: "2",
    title: "Application Screening",
    desc: "Our recruitment team reviews your application.",
    icon: UserCheck
  },
  {
    step: "3",
    title: "Interview / Discussion",
    desc: "Shortlisted candidates will be contacted.",
    icon: PhoneCall
  },
  {
    step: "4",
    title: "Selection & Onboarding",
    desc: "Selected candidates receive onboarding instructions.",
    icon: Rocket
  }
];

const FAQS = [
  {
    q: "Q1. Is this a remote internship?",
    a: "Yes. The internship is conducted remotely."
  },
  {
    q: "Q2. Who can apply?",
    a: "College students and fresh graduates can apply."
  },
  {
    q: "Q3. Is prior sales experience required?",
    a: "No. Candidates with strong communication skills and a willingness to learn are welcome."
  },
  {
    q: "Q4. How is the stipend determined?",
    a: "The stipend is performance-based and depends on individual performance and successful conversions."
  },
  {
    q: "Q5. Will I receive an internship certificate?",
    a: "Yes, subject to successful completion of the internship and applicable performance and attendance criteria."
  },
  {
    q: "Q6. How will I know if I am shortlisted?",
    a: "Shortlisted applicants will be contacted by the AT Speaks recruitment team through their registered email address or phone number."
  }
];

export default function SalesInternPage() {
  const [submittedApp, setSubmittedApp] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const formSectionRef = useRef(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 md:pb-8">
      {/* Section 1: Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1f3492] via-[#342f8f] to-[#c8348f] text-white p-6 sm:p-10 md:p-14 shadow-2xl">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-[#c8348f]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            WE&apos;RE HIRING
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Turn Your Communication Skills Into Opportunities!
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            Join AT Speaks as a Sales &amp; Business Development Intern. Learn, connect, grow and
            earn based on your performance.
          </p>

          {/* Key Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { label: "Remote Internship", icon: Laptop },
              { label: "Flexible Working", icon: Clock },
              { label: "Performance-Based Earnings", icon: TrendingUp },
              { label: "Open to Students and Freshers", icon: Users }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-pink-200 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Earning Potential & CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-3">
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-5 py-3.5">
              <p className="text-xl sm:text-2xl font-extrabold text-white">
                ₹5,000 - ₹2,00,000
              </p>
              <p className="text-xs text-white/85 font-medium">
                Performance-Based Stipend Potential
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1f3492] font-extrabold text-sm sm:text-base shadow-xl hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              APPLY NOW
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: About the Opportunity */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
            The Role
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f3492]">
            About the Opportunity
          </h2>
          <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold text-slate-900">
              At AT Speaks, we believe growth begins with opportunities.
            </p>
            <p>
              We are looking for enthusiastic, confident and self-driven individuals who are
              interested in sales, business development and student outreach.
            </p>
            <p>
              As a Sales &amp; Business Development Intern, you will play an important role in
              connecting students with industry-relevant training programs offered by AT Speaks.
            </p>
            <p>
              This opportunity allows you to develop practical sales experience, strengthen your
              communication skills and contribute to the growth of an emerging EdTech platform.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: What You'll Do */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
            Responsibilities
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1f3492]">
            What You&apos;ll Do
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESPONSIBILITIES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-[#1f3492]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 flex items-center justify-center text-[#1f3492] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">{item.num}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4 & 5: What You'll Gain & Who Can Apply */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
            Benefits
          </span>
          <h2 className="mt-1 text-2xl font-extrabold text-[#1f3492] mb-5">
            What You&apos;ll Gain
          </h2>
          <ul className="space-y-3">
            {GAINS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
              Eligibility
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-[#1f3492] mb-5">
              Who Can Apply?
            </h2>
            <ul className="space-y-3">
              {WHO_CAN_APPLY.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm sm:text-base text-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1f3492] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#1f3492]/10 to-[#c8348f]/10 border border-[#1f3492]/20 px-4 py-3 text-sm font-bold text-[#1f3492]">
            Prior sales experience is not mandatory.
          </div>
        </div>
      </section>

      {/* Section 6: Compensation and Earning Potential */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1f3492]/5 via-white to-[#c8348f]/10 border border-[#1f3492]/20 p-6 sm:p-10 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
          Compensation &amp; Earning Potential
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f3492]">
          Your Performance. Your Growth.
        </h2>

        <div className="inline-block bg-white rounded-2xl border border-slate-200 shadow-md px-8 py-5 my-2">
          <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#1f3492] to-[#c8348f] bg-clip-text text-transparent">
            ₹5,000 - ₹2,00,000
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Performance-Based Stipend Potential
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Your earning potential is driven by your individual performance, consistency and
          successful conversions. Actual earnings vary based on individual performance and are not
          guaranteed.
        </p>
      </section>

      {/* Section 7: Internship Details */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
            Overview
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1f3492]">
            Internship Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INTERNSHIP_DETAILS.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.field}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1f3492]/10 text-[#1f3492] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {row.field}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{row.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 8: Application Process */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
            How It Works
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1f3492]">
            Application Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <Icon className="w-5 h-5 text-[#1f3492]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="max-w-3xl mx-auto space-y-5">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
            Questions
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1f3492]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#1f3492] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 10: Final Call to Action */}
      {!submittedApp && (
        <section className="rounded-3xl bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Make Your Move?</h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Your journey into sales, business and entrepreneurship starts here. Become a part of
            AT Speaks and grow with us!
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#1f3492] font-extrabold text-sm shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
          >
            APPLY NOW
            <ArrowDown className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* Multi-Step Application Form or Success Screen */}
      <section ref={formSectionRef} id="apply-now" className="scroll-mt-24">
        {submittedApp ? (
          <ApplicationSuccess application={submittedApp} />
        ) : (
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c8348f]">
                Online Application
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1f3492]">
                Apply for Sales &amp; Business Development Intern
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Complete all 7 steps below to submit your application.
              </p>
            </div>
            <SalesInternForm
              onSuccess={(data) => {
                setSubmittedApp(data);
                setTimeout(() => {
                  formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
              }}
            />
          </div>
        )}
      </section>

      {/* Sticky Apply Now Button on Mobile */}
      {!submittedApp && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-extrabold text-sm shadow-2xl shadow-[#1f3492]/40 flex items-center justify-center gap-2"
          >
            APPLY NOW
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
