import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Share2,
  Briefcase,
  Target,
  CalendarClock,
  FileUp,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
  Upload,
  X
} from "lucide-react";
import API_URL from "../config/api";

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Education", icon: GraduationCap },
  { id: 3, title: "Social Profiles", icon: Share2 },
  { id: 4, title: "Experience & Skills", icon: Briefcase },
  { id: 5, title: "Sales Assessment", icon: Target },
  { id: 6, title: "Availability", icon: CalendarClock },
  { id: 7, title: "Resume & Submit", icon: FileUp }
];

const SKILL_OPTIONS = [
  "Communication",
  "Negotiation",
  "Lead Generation",
  "Marketing",
  "Networking",
  "Public Speaking",
  "Sales",
  "Social Media Management"
];

const CALL_COMFORT_OPTIONS = [
  "Very Comfortable",
  "Moderately Comfortable",
  "Willing to Learn"
];

const HOURS_OPTIONS = ["1-2 hours", "2-4 hours", "4-6 hours", "6+ hours"];
const DURATION_OPTIONS = ["1 month", "2 months", "3 months", "6 months"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS = (v = "") => String(v).replace(/\D/g, "");

export default function SalesInternForm({ onSuccess }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    currentLocation: "",
    age: ""
  });

  const [education, setEducation] = useState({
    collegeName: "",
    degreeDepartment: "",
    currentYearOfStudy: "",
    graduationYear: "",
    currentlyStudying: ""
  });

  const [socialProfiles, setSocialProfiles] = useState({
    instagramUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
    facebookUrl: "",
    portfolioUrl: "",
    otherProfiles: ""
  });

  const [experienceAndSkills, setExperienceAndSkills] = useState({
    hasPreviousSalesExperience: "",
    previousPromotionDetails: "",
    workedAsAmbassador: "",
    strongestSkills: [],
    experienceDescription: ""
  });

  const [salesAssessment, setSalesAssessment] = useState({
    approachFiftyStudents: "",
    convinceHesitantStudent: "",
    handleFeeObjection: "",
    callComfortLevel: "",
    whyGoodFit: ""
  });

  const [availability, setAvailability] = useState({
    hoursPerDay: "",
    daysPerWeek: "",
    preferredDuration: "",
    earliestJoiningDate: "",
    comfortableIndependent: "",
    comfortablePerformanceBased: ""
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [certificatesFile, setCertificatesFile] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [declarations, setDeclarations] = useState({
    accurateInfo: false,
    understandPerformanceBased: false,
    agreeToContact: false
  });

  const clearFieldError = (key) => {
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateStep = (targetStep) => {
    const newErrors = {};

    if (targetStep === 1) {
      if (!personalInfo.fullName.trim()) newErrors.fullName = "Full name is required.";
      if (!personalInfo.email.trim()) {
        newErrors.email = "Email address is required.";
      } else if (!EMAIL_REGEX.test(personalInfo.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
      const mobLen = PHONE_DIGITS(personalInfo.mobileNumber).length;
      if (mobLen < 10 || mobLen > 15) {
        newErrors.mobileNumber = "Enter a valid 10-15 digit mobile number.";
      }
      const waLen = PHONE_DIGITS(personalInfo.whatsappNumber).length;
      if (waLen < 10 || waLen > 15) {
        newErrors.whatsappNumber = "Enter a valid 10-15 digit WhatsApp number.";
      }
      if (!personalInfo.currentLocation.trim()) {
        newErrors.currentLocation = "Current location (City and State) is required.";
      }
      const ageNum = Number(personalInfo.age);
      if (!personalInfo.age || Number.isNaN(ageNum) || ageNum < 15 || ageNum > 99) {
        newErrors.age = "Enter a valid age (15-99).";
      }
    }

    if (targetStep === 2) {
      if (!education.collegeName.trim()) newErrors.collegeName = "College / University name is required.";
      if (!education.degreeDepartment.trim()) newErrors.degreeDepartment = "Degree / Department is required.";
      if (!education.currentYearOfStudy.trim()) newErrors.currentYearOfStudy = "Current year of study is required.";
      if (!education.graduationYear.trim()) newErrors.graduationYear = "Graduation year is required.";
      if (!education.currentlyStudying) newErrors.currentlyStudying = "Please select Yes or No.";
    }

    // Step 3 is completely optional

    if (targetStep === 4) {
      if (!experienceAndSkills.hasPreviousSalesExperience) {
        newErrors.hasPreviousSalesExperience = "Please select Yes or No.";
      }
      if (!experienceAndSkills.previousPromotionDetails.trim()) {
        newErrors.previousPromotionDetails = "Please provide an answer (write 'None' if not applicable).";
      }
      if (!experienceAndSkills.workedAsAmbassador) {
        newErrors.workedAsAmbassador = "Please select Yes or No.";
      }
      if (experienceAndSkills.strongestSkills.length === 0) {
        newErrors.strongestSkills = "Select at least one skill.";
      }
    }

    if (targetStep === 5) {
      if (!salesAssessment.approachFiftyStudents.trim()) {
        newErrors.approachFiftyStudents = "Please share your approach.";
      }
      if (!salesAssessment.convinceHesitantStudent.trim()) {
        newErrors.convinceHesitantStudent = "Please share how you would convince a hesitant student.";
      }
      if (!salesAssessment.handleFeeObjection.trim()) {
        newErrors.handleFeeObjection = "Please share how you would respond to a fee objection.";
      }
      if (!salesAssessment.callComfortLevel) {
        newErrors.callComfortLevel = "Please select your comfort level.";
      }
      if (!salesAssessment.whyGoodFit.trim()) {
        newErrors.whyGoodFit = "Please explain why you are a good fit for AT Speaks.";
      }
    }

    if (targetStep === 6) {
      if (!availability.hoursPerDay) newErrors.hoursPerDay = "Select hours available per day.";
      if (!availability.daysPerWeek.trim()) newErrors.daysPerWeek = "Enter days available per week.";
      if (!availability.preferredDuration) newErrors.preferredDuration = "Select preferred internship duration.";
      if (!availability.earliestJoiningDate.trim()) newErrors.earliestJoiningDate = "Select earliest joining date.";
      if (!availability.comfortableIndependent) newErrors.comfortableIndependent = "Please select Yes or No.";
      if (!availability.comfortablePerformanceBased) {
        newErrors.comfortablePerformanceBased = "Please select Yes or No.";
      }
    }

    if (targetStep === 7) {
      if (!resumeFile) {
        newErrors.resume = "Resume upload (PDF, max 5 MB) is mandatory.";
      }
      if (
        !declarations.accurateInfo ||
        !declarations.understandPerformanceBased ||
        !declarations.agreeToContact
      ) {
        newErrors.declarations = "Please check all three declaration boxes to proceed.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setSubmitError("");
    if (validateStep(step)) {
      setStep((s) => Math.min(7, s + 1));
    }
  };

  const handlePrev = () => {
    setSubmitError("");
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const toggleSkill = (skill) => {
    clearFieldError("strongestSkills");
    setExperienceAndSkills((prev) => {
      const exists = prev.strongestSkills.includes(skill);
      return {
        ...prev,
        strongestSkills: exists
          ? prev.strongestSkills.filter((s) => s !== skill)
          : [...prev.strongestSkills, skill]
      };
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    clearFieldError("resume");
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF format is accepted for Resume." }));
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: "Resume file size must be 5 MB or less." }));
      e.target.value = "";
      return;
    }
    setResumeFile(file);
  };

  const handleCertificatesChange = (e) => {
    const file = e.target.files?.[0];
    clearFieldError("certificates");
    if (!file) return;

    const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        certificates: "Certificates must be PDF, PNG, or JPG."
      }));
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        certificates: "Certificate file size must be 5 MB or less."
      }));
      e.target.value = "";
      return;
    }
    setCertificatesFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateStep(7)) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("personalInfo", JSON.stringify(personalInfo));
      formData.append("education", JSON.stringify(education));
      formData.append("socialProfiles", JSON.stringify(socialProfiles));
      formData.append("experienceAndSkills", JSON.stringify(experienceAndSkills));
      formData.append("salesAssessment", JSON.stringify(salesAssessment));
      formData.append("availability", JSON.stringify(availability));
      formData.append("additionalInfo", additionalInfo);
      formData.append("declarations", JSON.stringify(declarations));
      formData.append("resume", resumeFile);
      if (certificatesFile) {
        formData.append("certificates", certificatesFile);
      }

      const response = await fetch(`${API_URL}/api/intern-applications`, {
        method: "POST",
        body: formData
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your application. Please try again."
        );
      }

      onSuccess(result.data);
    } catch (err) {
      setSubmitError(
        err.message || "Network error occurred while submitting. Your details are preserved — please retry."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldKey) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all ${
      errors[fieldKey]
        ? "border-red-400 focus:ring-red-200"
        : "border-slate-300 focus:border-[#1f3492] focus:ring-[#1f3492]/20"
    }`;

  const renderError = (fieldKey) =>
    errors[fieldKey] ? (
      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {errors[fieldKey]}
      </p>
    ) : null;

  const progressPercent = Math.round((step / 7) * 100);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header & Progress Bar */}
      <div className="bg-gradient-to-r from-[#1f3492] via-[#4a3492] to-[#c8348f] px-5 py-6 sm:px-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-white/15 px-3 py-1 rounded-full">
              Step {step} of 7
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold">
              {STEPS[step - 1].title}
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-white/80">Application Progress</p>
            <p className="text-lg font-bold">{progressPercent}%</p>
          </div>
        </div>

        {/* Progress track */}
        <div className="mt-4 h-2 w-full bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Pills */}
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isCompleted = s.id < step;
            const isCurrent = s.id === step;
            return (
              <button
                key={s.id}
                type="button"
                disabled={s.id > step}
                onClick={() => {
                  if (s.id < step) {
                    setErrors({});
                    setStep(s.id);
                  }
                }}
                className={`flex flex-col items-center py-2 px-1 rounded-xl text-[10px] sm:text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-white text-[#1f3492] shadow-md font-bold"
                    : isCompleted
                    ? "bg-white/25 text-white hover:bg-white/35 cursor-pointer"
                    : "bg-white/10 text-white/60 cursor-not-allowed"
                }`}
                title={s.title}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                <span className="hidden md:block mt-1 truncate max-w-full">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
        {submitError && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-sm text-red-800">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Submission Failed</p>
              <p className="mt-0.5">{submitError}</p>
            </div>
          </div>
        )}

        {/* STEP 1: Personal Information */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Full Name <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => {
                  clearFieldError("fullName");
                  setPersonalInfo({ ...personalInfo, fullName: e.target.value });
                }}
                placeholder="Enter your full name"
                className={inputClass("fullName")}
              />
              {renderError("fullName")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => {
                  clearFieldError("email");
                  setPersonalInfo({ ...personalInfo, email: e.target.value });
                }}
                placeholder="you@example.com"
                className={inputClass("email")}
              />
              {renderError("email")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Mobile Number <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="tel"
                value={personalInfo.mobileNumber}
                onChange={(e) => {
                  clearFieldError("mobileNumber");
                  setPersonalInfo({ ...personalInfo, mobileNumber: e.target.value });
                }}
                placeholder="+91 98765 43210"
                className={inputClass("mobileNumber")}
              />
              {renderError("mobileNumber")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                WhatsApp Number <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="tel"
                value={personalInfo.whatsappNumber}
                onChange={(e) => {
                  clearFieldError("whatsappNumber");
                  setPersonalInfo({ ...personalInfo, whatsappNumber: e.target.value });
                }}
                placeholder="+91 98765 43210"
                className={inputClass("whatsappNumber")}
              />
              {renderError("whatsappNumber")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Current Location (City and State) <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="text"
                value={personalInfo.currentLocation}
                onChange={(e) => {
                  clearFieldError("currentLocation");
                  setPersonalInfo({ ...personalInfo, currentLocation: e.target.value });
                }}
                placeholder="e.g., Chennai, Tamil Nadu"
                className={inputClass("currentLocation")}
              />
              {renderError("currentLocation")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Age <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="number"
                min="15"
                max="99"
                value={personalInfo.age}
                onChange={(e) => {
                  clearFieldError("age");
                  setPersonalInfo({ ...personalInfo, age: e.target.value });
                }}
                placeholder="e.g., 21"
                className={inputClass("age")}
              />
              {renderError("age")}
            </div>
          </div>
        )}

        {/* STEP 2: Educational Details */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                College / University Name <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="text"
                value={education.collegeName}
                onChange={(e) => {
                  clearFieldError("collegeName");
                  setEducation({ ...education, collegeName: e.target.value });
                }}
                placeholder="Enter your college or university name"
                className={inputClass("collegeName")}
              />
              {renderError("collegeName")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Degree / Department <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="text"
                value={education.degreeDepartment}
                onChange={(e) => {
                  clearFieldError("degreeDepartment");
                  setEducation({ ...education, degreeDepartment: e.target.value });
                }}
                placeholder="e.g., B.Tech Computer Science / BBA"
                className={inputClass("degreeDepartment")}
              />
              {renderError("degreeDepartment")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Current Year of Study <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="text"
                value={education.currentYearOfStudy}
                onChange={(e) => {
                  clearFieldError("currentYearOfStudy");
                  setEducation({ ...education, currentYearOfStudy: e.target.value });
                }}
                placeholder="e.g., 3rd Year / Graduated"
                className={inputClass("currentYearOfStudy")}
              />
              {renderError("currentYearOfStudy")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Graduation Year <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="text"
                value={education.graduationYear}
                onChange={(e) => {
                  clearFieldError("graduationYear");
                  setEducation({ ...education, graduationYear: e.target.value });
                }}
                placeholder="e.g., 2026"
                className={inputClass("graduationYear")}
              />
              {renderError("graduationYear")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Currently Studying? <span className="text-[#c8348f]">*</span>
              </label>
              <div className="flex gap-4 pt-1">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                      education.currentlyStudying === opt
                        ? "border-[#1f3492] bg-[#1f3492]/10 text-[#1f3492]"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="currentlyStudying"
                      value={opt}
                      checked={education.currentlyStudying === opt}
                      onChange={(e) => {
                        clearFieldError("currentlyStudying");
                        setEducation({ ...education, currentlyStudying: e.target.value });
                      }}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {renderError("currentlyStudying")}
            </div>
          </div>
        )}

        {/* STEP 3: Digital Presence and Social Profiles (Optional) */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs sm:text-sm text-slate-600">
              All fields in this step are <strong>optional</strong>. You may skip any profile you
              do not have and click Next.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={socialProfiles.instagramUrl}
                  onChange={(e) =>
                    setSocialProfiles({ ...socialProfiles, instagramUrl: e.target.value })
                  }
                  placeholder="https://instagram.com/username"
                  className={inputClass("instagramUrl")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={socialProfiles.linkedinUrl}
                  onChange={(e) =>
                    setSocialProfiles({ ...socialProfiles, linkedinUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                  className={inputClass("linkedinUrl")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={socialProfiles.youtubeUrl}
                  onChange={(e) =>
                    setSocialProfiles({ ...socialProfiles, youtubeUrl: e.target.value })
                  }
                  placeholder="https://youtube.com/@channel"
                  className={inputClass("youtubeUrl")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Facebook Profile URL
                </label>
                <input
                  type="url"
                  value={socialProfiles.facebookUrl}
                  onChange={(e) =>
                    setSocialProfiles({ ...socialProfiles, facebookUrl: e.target.value })
                  }
                  placeholder="https://facebook.com/username"
                  className={inputClass("facebookUrl")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Portfolio / Personal Website
                </label>
                <input
                  type="url"
                  value={socialProfiles.portfolioUrl}
                  onChange={(e) =>
                    setSocialProfiles({ ...socialProfiles, portfolioUrl: e.target.value })
                  }
                  placeholder="https://yourportfolio.com"
                  className={inputClass("portfolioUrl")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Other Professional or Social Media Profiles
                </label>
                <input
                  type="text"
                  value={socialProfiles.otherProfiles}
                  onChange={(e) =>
                    setSocialProfiles({ ...socialProfiles, otherProfiles: e.target.value })
                  }
                  placeholder="X / GitHub / Behance / etc."
                  className={inputClass("otherProfiles")}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Experience and Skills */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  1. Do you have previous experience in sales, marketing or business development?{" "}
                  <span className="text-[#c8348f]">*</span>
                </label>
                <div className="flex gap-3">
                  {["Yes", "No"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                        experienceAndSkills.hasPreviousSalesExperience === opt
                          ? "border-[#1f3492] bg-[#1f3492]/10 text-[#1f3492]"
                          : "border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasPreviousSalesExperience"
                        value={opt}
                        checked={experienceAndSkills.hasPreviousSalesExperience === opt}
                        onChange={(e) => {
                          clearFieldError("hasPreviousSalesExperience");
                          setExperienceAndSkills({
                            ...experienceAndSkills,
                            hasPreviousSalesExperience: e.target.value
                          });
                        }}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {renderError("hasPreviousSalesExperience")}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  3. Have you worked as a campus ambassador, community lead or student representative?{" "}
                  <span className="text-[#c8348f]">*</span>
                </label>
                <div className="flex gap-3">
                  {["Yes", "No"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                        experienceAndSkills.workedAsAmbassador === opt
                          ? "border-[#1f3492] bg-[#1f3492]/10 text-[#1f3492]"
                          : "border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="workedAsAmbassador"
                        value={opt}
                        checked={experienceAndSkills.workedAsAmbassador === opt}
                        onChange={(e) => {
                          clearFieldError("workedAsAmbassador");
                          setExperienceAndSkills({
                            ...experienceAndSkills,
                            workedAsAmbassador: e.target.value
                          });
                        }}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {renderError("workedAsAmbassador")}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                2. Have you previously promoted or sold any product, service or course?{" "}
                <span className="text-[#c8348f]">*</span>
              </label>
              <textarea
                rows={3}
                value={experienceAndSkills.previousPromotionDetails}
                onChange={(e) => {
                  clearFieldError("previousPromotionDetails");
                  setExperienceAndSkills({
                    ...experienceAndSkills,
                    previousPromotionDetails: e.target.value
                  });
                }}
                placeholder="Share details of what you promoted or sold (or write 'No prior experience')"
                className={inputClass("previousPromotionDetails")}
              />
              {renderError("previousPromotionDetails")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                4. What are your strongest skills? (Select all that apply){" "}
                <span className="text-[#c8348f]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SKILL_OPTIONS.map((skill) => {
                  const selected = experienceAndSkills.strongestSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium text-left flex items-center gap-2 transition-all ${
                        selected
                          ? "border-[#1f3492] bg-[#1f3492]/10 text-[#1f3492]"
                          : "border-slate-300 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${
                          selected
                            ? "bg-[#1f3492] border-[#1f3492] text-white"
                            : "border-slate-400"
                        }`}
                      >
                        {selected && <Check className="w-3 h-3" />}
                      </span>
                      <span className="leading-tight">{skill}</span>
                    </button>
                  );
                })}
              </div>
              {renderError("strongestSkills")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                5. Briefly describe your previous experience, if any.
              </label>
              <textarea
                rows={3}
                value={experienceAndSkills.experienceDescription}
                onChange={(e) =>
                  setExperienceAndSkills({
                    ...experienceAndSkills,
                    experienceDescription: e.target.value
                  })
                }
                placeholder="Optional: describe internships, clubs, events, or projects you've handled"
                className={inputClass("experienceDescription")}
              />
            </div>
          </div>
        )}

        {/* STEP 5: Sales and Business Understanding */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                1. How would you find and approach 50 potential students for an online training
                program? <span className="text-[#c8348f]">*</span>
              </label>
              <textarea
                rows={3}
                value={salesAssessment.approachFiftyStudents}
                onChange={(e) => {
                  clearFieldError("approachFiftyStudents");
                  setSalesAssessment({
                    ...salesAssessment,
                    approachFiftyStudents: e.target.value
                  });
                }}
                placeholder="Describe your outreach channels and strategy..."
                className={inputClass("approachFiftyStudents")}
              />
              {renderError("approachFiftyStudents")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                2. How would you convince a student who is interested but hesitant to register?{" "}
                <span className="text-[#c8348f]">*</span>
              </label>
              <textarea
                rows={3}
                value={salesAssessment.convinceHesitantStudent}
                onChange={(e) => {
                  clearFieldError("convinceHesitantStudent");
                  setSalesAssessment({
                    ...salesAssessment,
                    convinceHesitantStudent: e.target.value
                  });
                }}
                placeholder="Explain how you would address their doubts and build trust..."
                className={inputClass("convinceHesitantStudent")}
              />
              {renderError("convinceHesitantStudent")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                3. If a student says that the program fee is too expensive, how would you respond?{" "}
                <span className="text-[#c8348f]">*</span>
              </label>
              <textarea
                rows={3}
                value={salesAssessment.handleFeeObjection}
                onChange={(e) => {
                  clearFieldError("handleFeeObjection");
                  setSalesAssessment({
                    ...salesAssessment,
                    handleFeeObjection: e.target.value
                  });
                }}
                placeholder="Explain how you would communicate value..."
                className={inputClass("handleFeeObjection")}
              />
              {renderError("handleFeeObjection")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                4. How comfortable are you with making calls and following up with potential
                customers? <span className="text-[#c8348f]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CALL_COMFORT_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center justify-center py-2.5 px-4 rounded-xl border cursor-pointer text-sm font-medium text-center transition-all ${
                      salesAssessment.callComfortLevel === opt
                        ? "border-[#1f3492] bg-[#1f3492]/10 text-[#1f3492]"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="callComfortLevel"
                      value={opt}
                      checked={salesAssessment.callComfortLevel === opt}
                      onChange={(e) => {
                        clearFieldError("callComfortLevel");
                        setSalesAssessment({
                          ...salesAssessment,
                          callComfortLevel: e.target.value
                        });
                      }}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {renderError("callComfortLevel")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                5. Why do you think you would be a good fit for AT Speaks?{" "}
                <span className="text-[#c8348f]">*</span>
              </label>
              <textarea
                rows={3}
                value={salesAssessment.whyGoodFit}
                onChange={(e) => {
                  clearFieldError("whyGoodFit");
                  setSalesAssessment({ ...salesAssessment, whyGoodFit: e.target.value });
                }}
                placeholder="Tell us what motivates you and what strengths you bring..."
                className={inputClass("whyGoodFit")}
              />
              {renderError("whyGoodFit")}
            </div>
          </div>
        )}

        {/* STEP 6: Availability and Commitment */}
        {step === 6 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Hours available per day <span className="text-[#c8348f]">*</span>
              </label>
              <select
                value={availability.hoursPerDay}
                onChange={(e) => {
                  clearFieldError("hoursPerDay");
                  setAvailability({ ...availability, hoursPerDay: e.target.value });
                }}
                className={inputClass("hoursPerDay")}
              >
                <option value="">Select hours per day</option>
                {HOURS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {renderError("hoursPerDay")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Days available per week <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="text"
                value={availability.daysPerWeek}
                onChange={(e) => {
                  clearFieldError("daysPerWeek");
                  setAvailability({ ...availability, daysPerWeek: e.target.value });
                }}
                placeholder="e.g., 5 days / Monday to Saturday"
                className={inputClass("daysPerWeek")}
              />
              {renderError("daysPerWeek")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Preferred internship duration <span className="text-[#c8348f]">*</span>
              </label>
              <select
                value={availability.preferredDuration}
                onChange={(e) => {
                  clearFieldError("preferredDuration");
                  setAvailability({ ...availability, preferredDuration: e.target.value });
                }}
                className={inputClass("preferredDuration")}
              >
                <option value="">Select duration</option>
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {renderError("preferredDuration")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Earliest Joining Date <span className="text-[#c8348f]">*</span>
              </label>
              <input
                type="date"
                value={availability.earliestJoiningDate}
                onChange={(e) => {
                  clearFieldError("earliestJoiningDate");
                  setAvailability({ ...availability, earliestJoiningDate: e.target.value });
                }}
                className={inputClass("earliestJoiningDate")}
              />
              {renderError("earliestJoiningDate")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Comfortable working independently? <span className="text-[#c8348f]">*</span>
              </label>
              <div className="flex gap-3">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                      availability.comfortableIndependent === opt
                        ? "border-[#1f3492] bg-[#1f3492]/10 text-[#1f3492]"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="comfortableIndependent"
                      value={opt}
                      checked={availability.comfortableIndependent === opt}
                      onChange={(e) => {
                        clearFieldError("comfortableIndependent");
                        setAvailability({
                          ...availability,
                          comfortableIndependent: e.target.value
                        });
                      }}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {renderError("comfortableIndependent")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Comfortable with performance-based earnings?{" "}
                <span className="text-[#c8348f]">*</span>
              </label>
              <div className="flex gap-3">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                      availability.comfortablePerformanceBased === opt
                        ? "border-[#1f3492] bg-[#1f3492]/10 text-[#1f3492]"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="comfortablePerformanceBased"
                      value={opt}
                      checked={availability.comfortablePerformanceBased === opt}
                      onChange={(e) => {
                        clearFieldError("comfortablePerformanceBased");
                        setAvailability({
                          ...availability,
                          comfortablePerformanceBased: e.target.value
                        });
                      }}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {renderError("comfortablePerformanceBased")}
            </div>
          </div>
        )}

        {/* STEP 7: Resume and Declaration */}
        {step === 7 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                1. Resume Upload <span className="text-[#c8348f]">*</span>{" "}
                <span className="text-xs font-normal text-slate-500">
                  (Mandatory, PDF format, max 5 MB)
                </span>
              </label>

              {!resumeFile ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-[#1f3492] rounded-2xl p-6 cursor-pointer bg-slate-50 hover:bg-[#1f3492]/5 transition-all">
                  <Upload className="w-8 h-8 text-[#1f3492] mb-2" />
                  <span className="text-sm font-semibold text-slate-700">
                    Click to upload Resume (PDF)
                  </span>
                  <span className="text-xs text-slate-500 mt-1">Maximum file size: 5 MB</span>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleResumeChange}
                    className="sr-only"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between bg-[#1f3492]/5 border border-[#1f3492]/30 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileUp className="w-5 h-5 text-[#1f3492] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50"
                    aria-label="Remove resume"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {renderError("resume")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                2. Relevant Certificates{" "}
                <span className="text-xs font-normal text-slate-500">
                  (Optional, PDF/PNG/JPG, max 5 MB)
                </span>
              </label>

              {!certificatesFile ? (
                <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 hover:border-[#c8348f] rounded-xl p-4 cursor-pointer bg-slate-50 hover:bg-[#c8348f]/5 transition-all text-sm text-slate-700">
                  <Upload className="w-4 h-4 text-[#c8348f]" />
                  <span>Upload Certificate (Optional)</span>
                  <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg,.pdf,.png,.jpg,.jpeg"
                    onChange={handleCertificatesChange}
                    className="sr-only"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <span className="text-sm font-medium text-slate-800 truncate">
                    {certificatesFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCertificatesFile(null)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-600"
                    aria-label="Remove certificate"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {renderError("certificates")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                3. Additional Information{" "}
                <span className="text-xs font-normal text-slate-500">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Anything else you would like the recruitment team to know?"
                className={inputClass("additionalInfo")}
              />
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-3">
              <p className="text-sm font-bold text-slate-800">
                Declaration <span className="text-[#c8348f]">*</span>
              </p>

              {[
                {
                  key: "accurateInfo",
                  label: "I confirm that the information provided is accurate."
                },
                {
                  key: "understandPerformanceBased",
                  label: "I understand that this is a remote, performance-based internship."
                },
                {
                  key: "agreeToContact",
                  label:
                    "I agree to be contacted by the AT Speaks recruitment team regarding my application."
                }
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-3 cursor-pointer text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={declarations[item.key]}
                    onChange={(e) => {
                      clearFieldError("declarations");
                      setDeclarations({ ...declarations, [item.key]: e.target.checked });
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#1f3492] focus:ring-[#1f3492]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
              {renderError("declarations")}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-bold text-sm shadow-lg shadow-[#1f3492]/20 hover:-translate-y-0.5 transition-all"
            >
              {step === 3 ? "Next (or Skip)" : "Next Step"}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-bold text-sm shadow-lg shadow-[#c8348f]/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                "SUBMIT APPLICATION"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
