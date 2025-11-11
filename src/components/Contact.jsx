import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

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
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mt-0 py-0 relative">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f3492]/20 via-[#c8348f]/15 to-[#1f3492]/20 blur-3xl -z-10"></div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Get in touch</h2>
      <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2"></div>
      <p className="mt-3 text-gray-600 max-w-2xl text-base sm:text-lg">
        Have a collaboration idea, need a workshop at your college, or want recordings/access?
        Send us a message — we're always happy to connect.
      </p>

      {/* Status Message */}
      {status.message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="mt-6 bg-white shadow-lg rounded-xl p-5 md:p-6 border border-gray-200">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Your Name</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="px-3 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-[#1f3492] focus:ring-1 focus:ring-[#1f3492]/20 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="px-3 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-[#1f3492] focus:ring-1 focus:ring-[#1f3492]/20 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <input
              required
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="px-3 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-[#1f3492] focus:ring-1 focus:ring-[#1f3492]/20 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={3}
              className="px-3 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-[#1f3492] focus:ring-1 focus:ring-[#1f3492]/20 focus:outline-none transition resize-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg px-6 py-2.5 bg-gradient-to-r from-[#1f3492] to-[#c8348f] hover:brightness-95 transition text-white font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
