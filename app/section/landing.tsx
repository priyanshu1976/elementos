"use client";
import React from "react";
import { useState, useEffect } from "react";

function Landing() {
  return (
    <div className="p-3">
      <h1 className="font-lex text-[100px] text-white ">elemetos</h1>
      <div className="flex">
        <Timer />
        {/* <SponsorSection /> */}
      </div>
    </div>
  );
}

export default Landing;

const Timer = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 23,
    minutes: 4,
    seconds: 47,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date("2025-01-31");
      const difference = end.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 p-8 rounded-lg max-w-xl ">
      <h1 className="font-lex text-white text-xl mb-8 opacity-50 font-">
        Welcome to EventX, the ultimate destination for discovering and booking
        upcoming events.
      </h1>

      <div className="flex gap-8 mb-8">
        <div className="text-center">
          <div className="text-white text-4xl font-bold">{time.days}</div>
          <div className="text-gray-400 text-sm">DAYS</div>
        </div>
        <div className="text-center">
          <div className="text-white text-4xl font-bold">{time.hours}</div>
          <div className="text-gray-400 text-sm">HOURS</div>
        </div>
        <div className="text-center">
          <div className="text-white text-4xl font-bold">{time.minutes}</div>
          <div className="text-gray-400 text-sm">MINUTES</div>
        </div>
        <div className="text-center">
          <div className="text-white text-4xl font-bold">{time.seconds}</div>
          <div className="text-gray-400 text-sm">SECONDS</div>
        </div>
      </div>

      <div className="relative">
        <button className="w-full bg-secondary text-gray-900 py-3 px-6 rounded-full font-semibold text-lg flex justify-between items-center">
          <span>Book Your Seat for EVENTX</span>
          <span className="bg-tertiary p-2 rounded-full">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

const SponsorSection = () => {
  const sponsors = [
    { name: "Indeed", className: "text-2xl font-light" },
    { name: "Sky One", className: "tracking-wider" },
    { name: "OPTIMUS", className: "italic" },
    { name: "LASERLITE", className: "tracking-widest" },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-xl relative">
      <h2 className="text-yellow-300 mb-6">SPONSOR</h2>

      <div className="flex flex-col gap-4">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className={`text-gray-500 ${sponsor.className}`}
          >
            {sponsor.name}
          </div>
        ))}
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <div className="relative">
          <div
            className="w-24 h-24 bg-yellow-300 rounded-full absolute animate-spin-slow"
            style={{
              clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 50% 100%, 60% 50%)",
            }}
          ></div>
          <button className="w-16 h-16 bg-gray-900 rounded-full absolute top-4 left-4 flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
          </button>
        </div>
      </div>
    </div>
  );
};
