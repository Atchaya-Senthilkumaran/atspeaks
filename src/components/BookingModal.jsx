import React, { useState } from "react";

export default function BookingModal({ event, open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    institution: "",
    location: "",
    yearOrRole: "",
    heardFrom: "website",
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!open) return null;

  // Check if recording is unavailable
  const isUnavailable = event && (event.recordingAvailable === false || event.price === 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    if (!form.name || !form.email || !form.whatsapp || !form.institution || !form.location || !form.yearOrRole || !file) {
      setErrorMessage("Please fill all fields and upload your payment screenshot.");
      setSubmitting(false);
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("whatsapp", form.whatsapp);
    fd.append("institution", form.institution);
    fd.append("location", form.location);
    fd.append("yearOrRole", form.yearOrRole);
    fd.append("heardFrom", form.heardFrom);
    fd.append("eventId", event?._id || event?.id || "");
    fd.append("paymentScreenshot", file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://atspeaks-zqwc.vercel.app";
      console.log('API URL:', apiUrl); // Debug log

      const res = await fetch(
        `${apiUrl}/api/recordings`,
        {
          method: "POST",
          body: fd,
          // No need to set Content-Type header when using FormData
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: `Server error: ${res.status}` }));
        throw new Error(data.message || `Submission failed with status: ${res.status}`);
      }

      const data = await res.json();

      // Show success screen
      setSuccess(true);
      setSuccessData({
        eventTitle: data.eventTitle || "Event Recording",
        note: data.note,
        name: form.name,
        email: form.email,
      });
      setForm({ name: "", email: "", whatsapp: "", institution: "", location: "", yearOrRole: "", heardFrom: "website" });
      setFile(null);
    } catch (err) {
      console.error('Booking submission error:', err); // Debug log

      // More descriptive error messages
      let errorMsg = "Something went wrong. Please try again.";

      if (err.message.includes('Failed to fetch')) {
        errorMsg = "Cannot connect to server. Please check if the backend is running or update your API URL.";
      } else if (err.message) {
        errorMsg = err.message;
      }

      setErrorMessage(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setSuccessData(null);
    setErrorMessage(null);
    onClose();
  };

  // Unavailable Screen (for Introduction To Figma)
  if (isUnavailable) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 text-center">
            <div className="text-5xl mb-3">⚠️</div>
            <h2 className="text-2xl font-bold">Recording Not Available</h2>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="text-center">
              <p className="text-lg text-slate-700 mb-4">
                Sorry, this recording is not currently available.
              </p>
              <p className="text-sm text-slate-600">
                We appreciate your interest in <strong>{event?.title}</strong>.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span>💡</span> Check Out Our Other Figma Events
              </h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Figma For Absolute Beginners</strong> - ₹399</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Design Smarter: Master Figma in 3 Days</strong> - ₹299</span>
                </li>
              </ul>
              <p className="text-xs text-slate-600 mt-4">
                Scroll through our events page to book these recordings!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Close
              </button>
              <a
                href="#events"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-medium hover:shadow-lg transition text-center"
              >
                View Events
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success Screen
  if (success && successData) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <div className="text-5xl mb-3">✓</div>
            <h2 className="text-2xl font-bold">Booking Confirmed</h2>
          </div>

          {/* Success Content */}
          <div className="p-6 space-y-4">
            <div className="text-center">
              <p className="text-slate-600 mb-1">Recording booked for</p>
              <h3 className="text-lg font-semibold text-slate-800">
                {successData.eventTitle}
              </h3>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-slate-700">
                📧 Confirmation email sent to <strong>{successData.email}</strong>
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
              <p className="text-slate-700">
                ⏰ You'll receive the recording link within <strong>24-72 hours</strong>
              </p>
            </div>

            <div className="text-xs text-slate-500 text-center pt-2">
              Need help? Email <a href="mailto:connect.atspeaks@gmail.com" className="text-blue-600 hover:underline">connect.atspeaks@gmail.com</a>
            </div>

            <button
              onClick={handleClose}
              className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-medium hover:shadow-lg transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Booking Form
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white sticky top-0 z-10">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            Book Recording - ₹{event?.price || 200}
          </h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-slate-200 transition text-xl sm:text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[300px,1fr] xl:grid-cols-[350px,1fr] gap-4 sm:gap-6">
          {/* LEFT SIDE: QR & INFO */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div className="border rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-pink-50 shadow-inner">
              <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-2 sm:mb-3 text-center">
                Scan to Pay ₹{event?.price || 200}
              </h3>
              <img
                src="/recordings/qr.jpg"
                alt="Payment QR"
                className="w-full max-w-[250px] mx-auto rounded-xl border shadow-md mb-2 sm:mb-3"
              />
              <p className="text-xs text-slate-600 text-center">
                After paying, upload the payment screenshot in the form.
              </p>
            </div>

            {/* Payment Instructions */}
            <div className="border rounded-2xl p-3 sm:p-4 bg-blue-50">
              <h4 className="font-semibold text-slate-800 mb-2 text-xs sm:text-sm">📋 Instructions</h4>
              <ul className="text-[11px] sm:text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Scan QR code using any UPI app</li>
                <li>Pay exactly ₹{event?.price || 200}</li>
                <li>Take a screenshot of payment</li>
                <li>Upload screenshot in the form</li>
                <li>You'll receive recording link within 24-72 hours</li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="border rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 hidden lg:block">
              <h4 className="font-semibold text-slate-800 mb-3 text-xs sm:text-sm text-center">Connect with us</h4>
              <div className="flex justify-center gap-3 sm:gap-4">
                <a
                  href="https://chat.whatsapp.com/B9GxPUSs4SFA7rMJUHo84I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition shadow-md hover:shadow-lg"
                  title="WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/at.speaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:shadow-lg flex items-center justify-center text-white transition shadow-md"
                  title="Instagram"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/atspeaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition shadow-md hover:shadow-lg"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <form onSubmit={submit} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2 sm:p-2.5 mt-1 text-xs sm:text-sm focus:ring-2 focus:ring-[#1f3492] focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-700">Personal Email <span className="text-red-500">*</span></label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2 sm:p-2.5 mt-1 text-xs sm:text-sm focus:ring-2 focus:ring-[#1f3492] focus:border-transparent"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-slate-700">WhatsApp Number <span className="text-red-500">*</span></label>
              <input
                name="whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg p-2 sm:p-2.5 mt-1 text-xs sm:text-sm focus:ring-2 focus:ring-[#1f3492] focus:border-transparent"
                placeholder="+91 98765 43210"
                pattern="[\+0-9\s\-]+"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-700">School / College / Workplace <span className="text-red-500">*</span></label>
                <input
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 mt-1 text-sm focus:ring-2 focus:ring-[#1f3492] focus:border-transparent"
                  placeholder="Institution name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Location <span className="text-red-500">*</span></label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 mt-1 text-sm focus:ring-2 focus:ring-[#1f3492] focus:border-transparent"
                  placeholder="City, State"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Year of Study / Role <span className="text-red-500">*</span></label>
              <input
                name="yearOrRole"
                value={form.yearOrRole}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 mt-1 text-sm focus:ring-2 focus:ring-[#1f3492] focus:border-transparent"
                placeholder="e.g., 2nd Year or Software Engineer"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Enter your year (1, 2, 3, 4) or your role if working professional</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Where did you hear about this? <span className="text-red-500">*</span>
              </label>
              <select
                name="heardFrom"
                value={form.heardFrom}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 mt-1 text-sm focus:ring-2 focus:ring-[#1f3492] focus:border-transparent"
              >
                <option value="website">Website</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="friends">Friends / Family</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Upload Payment Screenshot <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full border border-slate-300 rounded-lg p-2.5 mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1f3492] file:text-white hover:file:bg-[#c8348f] file:cursor-pointer"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Upload screenshot of your ₹{event?.price || 200} payment</p>
            </div>

            {errorMessage && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-semibold shadow-md hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : "Submit Booking"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-lg border-2 border-slate-300 hover:bg-slate-50 font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
