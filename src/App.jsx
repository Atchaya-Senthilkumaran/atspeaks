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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 overflow-x-hidden max-w-full w-full">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 w-full overflow-x-hidden">
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
