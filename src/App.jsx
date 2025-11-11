import React from "react";
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

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <Hero />
        <About />
        <Events />
        <Services />
        <Community />
        <Testimonials />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
