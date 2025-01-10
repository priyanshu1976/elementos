"use client";
import React from "react";
import { useState, useEffect } from "react";

function Landing() {
  return (
    <div className="p-3 mx-auto w-screen flex flex-col justify-center items-center">
      <h1 className="font-lex text-[100px] text-white ">elemetos</h1>
      <div className="flex w-[80%] justify-around">
        <SponsorSection />
        <Timer />
      </div>
    </div>
  );
}

export default Landing;

const Timer = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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
    <div className="bg-[#23283d] p-8 rounded-3xl max-w-xl h-[320px]">
      <h1 className=" text-white text-xl mb-8 opacity-50 font-ter">
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
              className="w-6  text-white"
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
    { name: "indeed", className: "font-light text-3xl" },
    { name: "SKY|one", className: "tracking-wider text-2xl" },
    { name: "OPTIMUS", className: "italic text-2xl" },
    { name: "LASERLITE", className: "tracking-widest text-xl" },
  ];

  return (
    <div className="bg-[#23283d] p-8 rounded-2xl w-[35%]">
      <h2 className="text-[#c5f82a] text-xl mb-12 font-mono tracking-wider">
        SPONSOR
      </h2>

      <div className="flex flex-col space-y-8">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className={`text-gray-600 ${sponsor.className}`}
          >
            {sponsor.name}
          </div>
        ))}
      </div>
    </div>
  );
};
