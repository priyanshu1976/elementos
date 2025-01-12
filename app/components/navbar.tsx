"use client";
import Link from "next/link";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black bg-opacity-50 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-[#c42d2d] text-2xl font-bold">
          ELEMENTOS<span className="text-white">9.O</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-[#c42d2d] transition-colors duration-300"
          >
            HOME
          </Link>
          <Link
            href="#event"
            className="hover:text-[#c42d2d] transition-colors duration-300"
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("event").offsetTop,
                behavior: "smooth",
              })
            }
          >
            EVENTS
          </Link>
          <Link
            href="/events"
            className="hover:text-[#c42d2d] transition-colors duration-300"
          >
            SPEAKER
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-[#c42d2d] hover:scale-110 transition-transform duration-300"
          >
            <Instagram className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#c42d2d]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Links */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-4 text-center bg-black bg-opacity-90 rounded-md shadow-lg">
          <Link
            href="/"
            className="hover:text-[#CCFF00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            href="#event"
            className="hover:text-[#CCFF00] transition-colors duration-300"
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({
                top: document.getElementById("event").offsetTop,
                behavior: "smooth",
              });
            }}
          >
            EVENTS
          </Link>
          <Link
            href="/events"
            className="hover:text-[#CCFF00]transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            SPEAKER
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-[#CCFF00] hover:scale-110 transition-transform duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <Instagram className="h-6 w-6 mx-auto" />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
