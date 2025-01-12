"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import * as THREE from "three";

export function Hero() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 23,
    minutes: 4,
    seconds: 47,
  });

  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    camera.position.z = 10;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="container mx-auto px-4 py-8 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Three.js Mount Point */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0"></div>

      {/* Logo Image */}
      <div className="mb-16 mt-[-100px] animate-fade-in relative group z-10">
        <div className="absolute inset-0 animate-pulse bg-pink-500/20 blur-3xl -z-10"></div>
        <img
          src="/newele.png"
          alt="Event Logo"
          className="w-[500px] md:w-[700px] lg:w-[1000px] mx-auto hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
        />
      </div>

      {/* Timer */}
      <div className="flex gap-6 md:gap-12 mb-8 text-white z-10">
        {[
          { value: countdown.days, label: "DAYS" },
          { value: countdown.hours, label: "HOURS" },
          { value: countdown.minutes, label: "MINUTES" },
          { value: countdown.seconds, label: "SECONDS" },
        ].map((item, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-pink-500/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
            <div className="text-4xl md:text-6xl font-bold font-mono tracking-wider group-hover:text-pink-500 transition-colors animate-[pulse_1s_ease-in-out_infinite]">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-base md:text-lg text-pink-200">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button 
        className="relative bg-pink-500 text-white px-8 md:px-10 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-600 transition-all hover:scale-105 shadow-[0_0_15px_rgba(236,72,153,0.5)] group overflow-hidden z-10"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
        <Play className="h-5 w-5" />
        JOIN THE GAME
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

export default Hero;
