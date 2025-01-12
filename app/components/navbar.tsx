"use client";
import Link from "next/link";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center px-4 fixed top-4 z-50">
      <nav className="bg-[#1A1A1A]/90 backdrop-blur-md text-white py-4 px-8 w-[95%] max-w-6xl rounded-2xl"
        style={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,11,123,0.2)",
          border: "2px dashed rgba(255,11,123,0.3)",
        }}>
        <div className="flex items-center justify-between">
          {/* Left Side Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="relative group font-bold text-white"
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase">
                HOME
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
            <Link
              href="#event"
              className="relative group font-bold text-white"
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("event")?.offsetTop,
                  behavior: "smooth",
                })
              }
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase">
                EVENTS
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
          </div>

          {/* Centered Logo */}
          <Link 
            href="/" 
            className="text-2xl font-black relative group mx-auto md:mx-0"
          >
            <span className="text-[#FF0B7B] group-hover:text-white transition-colors duration-300">
              ELEMENTOS
            </span>
            <span className="text-[#00F0FF]">9.O</span>
          </Link>

          {/* Right Side Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              className="relative group font-bold text-white"
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase">
                SPEAKER
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="relative group bg-[#FF0B7B]/10 p-2 rounded-xl hover:bg-[#FF0B7B]/20 transition-colors duration-300"
            >
              <Instagram className="h-5 w-5 text-[#FF0B7B] group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-[#FF0B7B]/10 p-2 rounded-xl hover:bg-[#FF0B7B]/20 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="h-5 w-5 text-[#FF0B7B]" /> : 
              <Menu className="h-5 w-5 text-[#FF0B7B]" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 flex flex-col gap-4 pt-4 border-t-2 border-dashed border-[#FF0B7B]/20">
            {[
              { href: "/", label: "HOME" },
              { href: "#event", label: "EVENTS" },
              { href: "/events", label: "SPEAKER" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative group flex items-center gap-2 font-bold text-white"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (link.href === "#event") {
                    window.scrollTo({
                      top: document.getElementById("event")?.offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <span className="group-hover:text-[#FF0B7B] transition-colors duration-300 uppercase">
                  {link.label}
                </span>
              </Link>
            ))}
            <Link
              href="https://instagram.com"
              target="_blank"
              className="flex items-center gap-2 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <Instagram className="h-6 w-6 text-[#FF0B7B] group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
