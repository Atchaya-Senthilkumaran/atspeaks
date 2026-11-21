import React from "react";
import { CheckCircle2, MessageCircle, ArrowLeft, Sparkles, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { SALES_INTERN_WHATSAPP_GROUP_URL } from "../config/links";

export default function ApplicationSuccess({ application }) {
  const applicationId = application?.applicationId || "N/A";
  const position = application?.position || "Sales & Business Development Intern";

  return (
    <section
      id="application-success"
      className="my-8 sm:my-12 max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in"
    >
      {/* Top gradient banner */}
      <div className="bg-gradient-to-r from-[#1f3492] via-[#5e3491] to-[#c8348f] px-6 py-8 sm:px-10 sm:py-10 text-center text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 mb-4 animate-bounce">
          <CheckCircle2 className="w-11 h-11 text-emerald-300" />
        </div>

        <h2 className="relative text-2xl sm:text-3xl font-extrabold tracking-tight">
          Application Submitted Successfully!
        </h2>
        <p className="relative mt-3 text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
          Thank you for applying to AT Speaks. Your application has been received successfully.
          Our recruitment team will review your profile and contact shortlisted candidates.
        </p>
      </div>

      {/* Details body */}
      <div className="p-6 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Application ID
            </p>
            <p className="mt-1 text-lg font-bold text-[#1f3492] font-mono select-all">
              {applicationId}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Position Applied For
            </p>
            <p className="mt-1 text-base font-bold text-slate-900">{position}</p>
          </div>
          <div className="sm:col-span-2 pt-3 border-t border-slate-200 flex items-start gap-2.5 text-sm text-slate-700">
            <Sparkles className="w-4 h-4 text-[#c8348f] flex-shrink-0 mt-0.5" />
            <span>
              A confirmation email with your Application ID and next steps has been sent to{" "}
              <strong className="text-slate-900">{application?.email}</strong>.
            </span>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-6 text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Join the Official AT Speaks Recruitment WhatsApp Group
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Stay informed about recruitment announcements, updates, and further instructions from
            the AT Speaks team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <a
              href={SALES_INTERN_WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              JOIN OUR WHATSAPP GROUP
            </a>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#1f3492] border border-slate-300 font-semibold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO AT SPEAKS WEBSITE
            </Link>
          </div>
        </div>

        {/* Important Note */}
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs sm:text-sm text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Important Note: </span>
            Joining the WhatsApp group does not guarantee selection. Shortlisted candidates will be
            contacted separately.
          </div>
        </div>
      </div>
    </section>
  );
}
