"use client";
import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import DiscoverSection from "./components/discover-section";
import TicketSection from "./components/ticket-section";
import SpeakersSection from "./components/speakers-section";
import Footer from "./components/footer";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />
      <Hero />
      <TicketSection />
      <DiscoverSection />
      <SpeakersSection />
      <Footer />
    </div>
  );
}

