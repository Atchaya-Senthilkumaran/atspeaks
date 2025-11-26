import React, { useState } from "react";
import API_URL from "../config/api";

export default function RegistrationModal({ event, open, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    schoolCollegeWorkplace: "",
    yearOfStudy: "",
    heardAboutFrom: "",
    registrationType: "",
    transactionId: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState("");

  if (!open || !event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('📤 Submitting registration to:', `${API_URL}/api/registrations`);
      console.log('📝 Form data:', { eventId: event._id, ...formData });

      // Submit to backend
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event._id,
          ...formData
        }),
      });

      console.log('📡 Response status:', response.status);

      const data = await response.json();
      console.log('📡 Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log('✅ Registration successful:', data);

      // Show success message
      setSuccess(true);
      setWhatsappGroupUrl(data.data?.whatsappGroupUrl || event.whatsappGroupUrl);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        schoolCollegeWorkplace: "",
        yearOfStudy: "",
        heardAboutFrom: "",
        registrationType: "",
        transactionId: ""
      });

    } catch (err) {
      console.error('❌ Registration error:', err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setWhatsappGroupUrl("");
    onClose();
  };

  // Success screen
  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Registration Successful!</h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6">
            You've successfully registered for <strong>{event.title}</strong>.
            Check your email for confirmation details.
          </p>

          {whatsappGroupUrl && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 mb-6 border border-green-200">
              <h3 className="text-base font-semibold text-green-900 mb-2">Join WhatsApp Group</h3>
              <p className="text-sm text-green-700 mb-3">Stay connected and get event updates!</p>
              <a
                href={whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join Group
              </a>
            </div>
          )}

          <button
            onClick={handleClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white rounded-full font-medium hover:brightness-110 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Registration form
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-white rounded-2xl shadow-2xl my-4">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg text-slate-700 hover:text-slate-900 transition-all"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#1f3492] to-[#c8348f] p-6 sm:p-8 text-center rounded-t-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Register for Event</h2>
          <p className="text-white/90 mt-2 text-sm sm:text-base">{event.title}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* Inspirational Quote */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-[#c8348f]">
            <p className="text-sm sm:text-base text-slate-700 italic font-medium">
              "Transform your ideas into reality. Your journey to building an amazing portfolio starts here!"
            </p>
            <p className="text-xs text-slate-500 mt-1">- Team AT Speaks</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Personal Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* School/College/Workplace */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                School/College/Workplace Name (With Location) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="schoolCollegeWorkplace"
                value={formData.schoolCollegeWorkplace}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
                placeholder="e.g., ABC College, Chennai"
              />
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Year of Study
              </label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Heard About From */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Where did you hear about this event? <span className="text-red-500">*</span>
              </label>
              <select
                name="heardAboutFrom"
                value={formData.heardAboutFrom}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
              >
                <option value="">Select Option</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Friend/Colleague">Friend/Colleague</option>
                <option value="College">College</option>
                <option value="Website">Website</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Registration Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select your registration type <span className="text-red-500">*</span>
              </label>
              <select
                name="registrationType"
                value={formData.registrationType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
              >
                <option value="">Select Type</option>
                <option value="Workshop Only - Free">Workshop Only - Free</option>
                <option value="Workshop + Certificate - ₹50">Workshop + Certificate - ₹50</option>
                <option value="Workshop + Certificate + Recording - ₹150">Workshop + Certificate + Recording - ₹150</option>
              </select>
            </div>

            {/* Payment Section - Only show for paid registrations */}
            {(formData.registrationType === "Workshop + Certificate - ₹50" || formData.registrationType === "Workshop + Certificate + Recording - ₹150") && (
              <>
                {/* Payment QR Code */}
                <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg p-4 border border-indigo-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* QR Code */}
                    <div className="flex flex-col items-center">
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">
                        Scan to Pay {formData.registrationType === "Workshop + Certificate - ₹50" ? "₹50" : "₹150"}
                      </h4>
                      <img
                        src="/recordings/qr.jpg"
                        alt="Payment QR Code"
                        className="w-40 h-40 sm:w-48 sm:h-48 rounded-lg border-2 border-white shadow-lg"
                      />
                    </div>

                    {/* Payment Instructions */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">📋 Payment Instructions</h4>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                        <li>Scan QR code using any UPI app</li>
                        <li>Pay exactly {formData.registrationType === "Workshop + Certificate - ₹50" ? "₹50" : "₹150"}</li>
                        <li>Copy UPI Transaction ID (12 digits)</li>
                        <li>Enter the Transaction ID below</li>
                      </ul>
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2">
                        <p className="text-xs text-amber-800">
                          <strong>Note:</strong> You will receive the certificate/recording link within 24-72 hours after payment verification
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UPI Transaction ID */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    UPI Transaction ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1f3492] focus:border-transparent outline-none transition-all"
                    placeholder="Enter your 12-digit UPI Transaction ID (e.g., 123456789012)"
                  />
                  <p className="text-xs text-slate-500 mt-1">Enter the 12-digit UPI Transaction ID from your payment confirmation</p>
                </div>
              </>
            )}

            {/* WhatsApp Group Reminder */}
            {event.whatsappGroupUrl && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-green-900 mb-1">Don't forget to join our WhatsApp Group!</h4>
                    <p className="text-xs text-green-700 mb-2">After registration, please join the WhatsApp group to receive event updates, reminders, and important announcements.</p>
                    <a
                      href={event.whatsappGroupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all text-xs"
                    >
                      Join WhatsApp Group
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Important Note */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Important</h4>
                  <p className="text-xs text-blue-700">Please ensure all details are correct before submitting. You will receive a confirmation email shortly after registration.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-full font-medium hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white rounded-full font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
