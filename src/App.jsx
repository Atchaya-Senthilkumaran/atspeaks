import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import Community from "./components/Community";
import Founder from "./components/Founder";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SalesInternPage from "./pages/SalesInternPage";
import AdminInternshipsPage from "./pages/AdminInternshipsPage";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Services />
      <Community />
      <Testimonials />
      <Founder />
      <Contact />
    </>
  );
}

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 overflow-x-hidden max-w-full w-full">
        <Navbar />
        <main className="mx-auto max-w-6xl px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 pt-3 pb-8 w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/careers" element={<Navigate to="/careers/sales-intern" replace />} />
            <Route path="/careers/sales-intern" element={<SalesInternPage />} />
            <Route path="/admin/internships" element={<AdminInternshipsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}
