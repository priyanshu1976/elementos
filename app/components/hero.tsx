"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Client-side only component for floating particles
function FloatingParticles() {
  // Use a fixed seed for random values to ensure consistency between server and client
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: `${(i * 3.33) % 100}%`,
    y: `${(i * 7.77) % 100}%`,
    color: i % 2 === 0 ? '#FF1493' : '#00FFD1'
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: particle.x,
            y: particle.y,
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            y: [particle.y, `-${(particle.id * 17) % 500}px`],
            scale: [0, 1, 0],
            rotate: 360
          }}
          transition={{ 
            duration: 3 + (particle.id % 5),
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: particle.color,
            boxShadow: `0 0 10px ${particle.color}`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [countdown, setCountdown] = useState({
    days: 14,
    hours: 10,
    minutes: 32,
    seconds: 1,
  });

  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Create a plane for the logo
  

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // Add countdown timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
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
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,20,147,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,20,147,0.07)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-40"
        style={{ transform: 'scale(1.1)' }}
      />

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-pink-500/20 rounded-full filter blur-[130px] animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-500/15 rounded-full filter blur-[130px] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] bg-purple-500/10 rounded-full filter blur-[150px] animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center gap-12">
        {/* Logo Section */}
        <motion.div
          className="w-full max-w-md xl:mt-40"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1" />
            <div className="relative p-4">
              <motion.img
                src="/newele.png"
                alt="Logo"
                className="w-full h-auto object-contain scale-[6] xl:scale-[9] xl:mb-20"
                style={{
                  maxHeight: '120px',
                  transformOrigin: 'center',
                }}
               
              />
            </div>
          </div>
        </motion.div>

        {/* Timer Section */}
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex justify-center gap-6 md:gap-8 backdrop-blur-md bg-black/20 px-8 py-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10" />
            {[
              { value: countdown.days, label: "DAYS" },
              { value: countdown.hours, label: "HOURS" },
              { value: countdown.minutes, label: "MINUTES" },
              { value: countdown.seconds, label: "SECONDS" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono tracking-wider text-white group-hover:text-pink-500 transition-colors">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-pink-200/80 font-medium mt-2 text-center">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button 
          className="relative group"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
          <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center gap-3">
            <Play className="h-5 w-5 text-pink-500 group-hover:text-pink-400 transition-colors" />
            <span className="text-gray-100 group-hover:text-white transition-colors text-lg font-bold">
              JOIN THE GAME
            </span>
            <ArrowRight className="h-5 w-5 text-pink-500 group-hover:text-pink-400 transition-colors group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      </div>

      {/* Side Decorative Elements */}
      <div className="absolute inset-y-0 left-0 w-32 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-transparent" />
        {[...Array(5)].map((_, i) => (
          <div
            key={`left-${i}`}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-pink-500/30 to-transparent animate-pulse"
            style={{ 
              left: `${i * 8}px`,
              animationDelay: `${i * 200}ms`,
              opacity: 1 - (i * 0.15)
            }}
          />
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 w-32 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-pink-500/20 to-transparent" />
        {[...Array(5)].map((_, i) => (
          <div
            key={`right-${i}`}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-pink-500/30 to-transparent animate-pulse"
            style={{ 
              right: `${i * 8}px`,
              animationDelay: `${i * 200}ms`,
              opacity: 1 - (i * 0.15)
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
