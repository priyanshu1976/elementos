"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import * as THREE from "three";
import { motion } from "framer-motion";
import  Link  from "next/link";


// Helper function to calculate the countdown
interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateCountdown(targetDate: Date): Countdown {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Countdown is over
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function Hero() {
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(new Date("2025-01-30T23:59:59"))
  );

  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-01-31T23:59:59");
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.95),
            rgba(0, 0, 0, 0.8)
          ),
          url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,20,147,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,20,147,0.07)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40" />

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-pink-500/20 rounded-full filter blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-500/15 rounded-full filter blur-[130px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] bg-purple-500/10 rounded-full filter blur-[150px] animate-pulse" />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center gap-12">
        {/* Logo Section */}
        <motion.img
          src="/newele.png"
          alt="Logo"
          className="w-full h-auto object-contain scale-[6] xl:scale-[9] xl:mb-20"
          style={{
            maxHeight: "120px",
          }}
        />

        {/* Timer Section */}
        <div className="w-full max-w-2xl">
          <div className="flex justify-center gap-6 md:gap-8 backdrop-blur-md bg-black/20 px-8 py-6 rounded-2xl border border-white/10 relative overflow-hidden">
            {[
              { value: countdown.days, label: "DAYS" },
              { value: countdown.hours, label: "HOURS" },
              { value: countdown.minutes, label: "MINUTES" },
              { value: countdown.seconds, label: "SECONDS" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm md:text-base text-pink-200/80 font-medium mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
  href="#events"
  scroll={false}
  onClick={(e) => {
    e.preventDefault();
    const target = document.querySelector("#events");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }}
  
>
  

 
</Link>

      </div>
    </div>
  );
}

export default Hero;
