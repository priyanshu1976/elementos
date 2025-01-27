"use client";
import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import DiscoverSection from "./components/discover-section";
import AboutSection from "./components/ticket-section";
import SpeakersSection from "./components/speakers-section";
import FAQSection from "./components/faq-section";
import Footer from "./components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <Hero />
      <AboutSection />
      <DiscoverSection />

      <FAQSection />
      <Footer />
    </div>
  );
}
