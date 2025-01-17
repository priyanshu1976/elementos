"use client";
import Link from "next/link";
import { InstagramIcon, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center px-4 fixed top-4 z-50">
      <nav className="bg-[#1A1A1A]/90 backdrop-blur-md text-white py-2 px-6 w-[85%] max-w-5xl rounded-2xl"
        style={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,11,123,0.2)",
          border: "2px dashed rgba(255,11,123,0.3)",
        }}>
        <div className="flex items-center justify-between">
          {/* Left Side Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="relative group font-bold text-white text-sm"
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase tracking-wider">
                HOME
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
            <Link
              href="#events"
              className="relative group font-bold text-white text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('events')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase tracking-wider">
                EVENTS
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
            <Link
              href="#about"
              className="relative group font-bold text-white text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase tracking-wider">
                ABOUT
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
          </div>

          {/* Centered Text Logo */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#FF0B7B]/0 via-[#FF0B7B]/10 to-[#FF0B7B]/0 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur"></div>
            <Link href="/" className="relative flex items-center">
              <h1 className="text-2xl font-black tracking-wider">
                <span className="text-white group-hover:text-[#FF0B7B] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  ELEMENTOS
                </span>
                <span className="text-white ml-1 group-hover:text-[#89f7ff] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  9.O
                </span>
              </h1>
            </Link>
          </div>

          {/* Right Side Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#speakers"
              className="relative group font-bold text-white text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('speakers')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase tracking-wider">
                SPEAKER
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
            <Link
              href="#faq"
              className="relative group font-bold text-white text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase tracking-wider">
                FAQ
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
            <Link
              href="#contact"
              className="relative group font-bold text-white text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-[#FF0B7B] uppercase tracking-wider">
                CONTACT
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200 group-hover:bg-[#FF0B7B]/30"></span>
              </span>
            </Link>
            <Link
              href="https://www.instagram.com/iete_thapar?igsh=cWJ3NDN5cjg5cXZt"
              target="_blank"
              className="relative group bg-[#FF0B7B]/10 p-2 rounded-xl hover:bg-[#FF0B7B]/20 transition-colors duration-300"
            >
              <InstagramIcon className="h-5 w-5 text-[#FF0B7B] group-hover:scale-110 transition-transform duration-300" />
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
          <div className="md:hidden mt-4 flex flex-col gap-4 pt-4 border-t-2 border-dashed border-[#FF0B7B]/20">
            {[
              { href: "/", label: "HOME" },
              { href: "#events", label: "EVENTS" },
              { href: "#about", label: "ABOUT" },
              { href: "#speakers", label: "SPEAKER" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "CONTACT" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative group flex items-center gap-2 font-bold text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  if (link.href.startsWith('#')) {
                    document.getElementById(link.href.slice(1))?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <span className="group-hover:text-[#FF0B7B] transition-colors duration-300 uppercase text-sm tracking-wider">
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
              <InstagramIcon className="h-6 w-6 text-[#FF0B7B] group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
