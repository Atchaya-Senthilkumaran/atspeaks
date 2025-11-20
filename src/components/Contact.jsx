import React, { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import API_URL from "../config/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      console.log('🔗 Sending contact form to:', API_URL);
      const res = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log('✅ Response:', data);

      if (res.ok) {
        setStatus({
          type: "success",
          message: "✅ Message sent successfully! Your message has been saved and confirmation email sent. Redirecting..."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Auto-reload page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      console.error("❌ Contact form error:", error);
      console.error("API URL was:", API_URL);
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 py-0 relative w-full overflow-x-hidden scroll-reveal-3d ${isRevealed ? 'revealed' : ''}`}
    >
      {/* Enhanced Background Glow with 3D */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f3492]/20 via-[#c8348f]/15 to-[#1f3492]/20 blur-3xl -z-10 animate-glow-pulse"></div>
      
      {/* Floating gradient orbs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#1f3492]/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#c8348f]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold animate-3d-pop break-words section-title">
        Get in touch
      </h2>
      <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 animate-glow-pulse"></div>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl animate-zoom-in-blur animate-delay-100 break-words">
        Have a collaboration idea, need a workshop at your college, or want recordings/access?
        Send us a message — we're always happy to connect.
      </p>

      {/* Status Message with 3D effect */}
      {status.message && (
        <div
          className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg text-xs sm:text-sm animate-bounce-in ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border-2 border-green-200 shadow-lg"
              : "bg-red-50 text-red-700 border-2 border-red-200 shadow-lg"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Form Container with 3D effects */}
      <div className="mt-4 sm:mt-6 bg-white shadow-xl rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border-2 border-gray-200 w-full overflow-x-hidden hover-3d-tilt transition-all duration-500 perspective-3d animate-slide-up-rotate">
        {/* Shimmer effect on form */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: 'translateX(-100%)', animation: 'shimmer 3s infinite' }}></div>
        
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full relative z-10"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5 animate-fade-in animate-delay-200">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Your Name</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-300 bg-white focus:border-[#1f3492] focus:ring-2 focus:ring-[#1f3492]/20 focus:outline-none transition-all duration-300 text-sm sm:text-base hover:border-[#1f3492]/50 hover:scale-105 hover:shadow-md"
            />
          </div>

          <div className="flex flex-col gap-1.5 animate-fade-in animate-delay-300">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Email Address</label>
            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-300 bg-white focus:border-[#1f3492] focus:ring-2 focus:ring-[#1f3492]/20 focus:outline-none transition-all duration-300 text-sm sm:text-base hover:border-[#1f3492]/50 hover:scale-105 hover:shadow-md"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2 animate-fade-in animate-delay-400">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Subject</label>
            <input
              required
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-300 bg-white focus:border-[#1f3492] focus:ring-2 focus:ring-[#1f3492]/20 focus:outline-none transition-all duration-300 text-sm sm:text-base hover:border-[#1f3492]/50 hover:scale-105 hover:shadow-md"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2 animate-fade-in animate-delay-500">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Message</label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={3}
              className="px-3 py-2 sm:py-2.5 rounded-lg border-2 border-gray-300 bg-white focus:border-[#1f3492] focus:ring-2 focus:ring-[#1f3492]/20 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base hover:border-[#1f3492]/50 hover:scale-105 hover:shadow-md"
            />
          </div>

          <div className="md:col-span-2 flex justify-end animate-fade-in animate-delay-600">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#1f3492] to-[#c8348f] hover:brightness-110 hover:scale-110 hover:shadow-2xl transition-all duration-300 text-white text-xs sm:text-sm md:text-base font-medium shadow-lg hover-3d-tilt disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg animate-glow-pulse"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
