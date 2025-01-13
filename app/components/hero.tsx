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
      className="container mx-auto px-4 py-4 md:py-8 relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)), url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,20,147,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,20,147,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-30"></div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Client-side floating particles */}
      <FloatingParticles />

      {/* Left Side Decorative Elements */}
      <div className="absolute left-0 inset-y-0 w-32 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-transparent"></div>
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

      {/* Right Side Decorative Elements */}
      <div className="absolute right-0 inset-y-0 w-32 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-pink-500/20 to-transparent"></div>
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

      {/* Logo and Timer Container */}
      <div className="scale-110 flex flex-col items-center z-10 mt-6 md:mt-12">
        {/* Three.js Container for 3D Logo */}
        <div ref={mountRef} className="w-full h-[400px] relative">
          <motion.img
          src="./newele.png"
          style={{
            marginTop:"-26rem",
            marginLeft:"-1rem"
          }}
          >

          </motion.img>
        </div>

        {/* Timer with Enhanced Design */}
        <motion.div 
          className="relative mt-8 md:mt-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex gap-6 md:gap-8 text-white backdrop-blur-md bg-black/20 px-8 py-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10"></div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono tracking-wider group-hover:text-pink-500 transition-colors relative">
                  {String(item.value).padStart(2, '0')}
                  <div className="absolute -inset-2 bg-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
                <div className="text-sm md:text-base lg:text-lg text-pink-200/80 font-medium mt-2 text-center group-hover:text-pink-200 transition-colors">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Button */}
      <motion.button 
        className="relative mt-10 md:mt-12 group z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
        <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center">
          <div className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-pink-500 group-hover:text-pink-400 transition-colors" />
            <span className="text-gray-100 group-hover:text-white transition-colors text-lg font-bold">JOIN THE GAME</span>
            <ArrowRight className="h-5 w-5 text-pink-500 group-hover:text-pink-400 transition-colors group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </motion.button>
    </div>
  );
}

export default Hero;
