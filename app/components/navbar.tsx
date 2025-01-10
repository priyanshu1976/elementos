import Link from "next/link";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[#CCFF00] text-2xl font-bold">
          ELEMENTOS<span className="text-white">9.O</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-[#CCFF00]">
            HOME
          </Link>
          <Link href="/events" className="hover:text-[#CCFF00]">
            EVENTS
          </Link>
          <Link href="/schedule" className="hover:text-[#CCFF00]">
            SCHEDULE
          </Link>
          <Link href="/venue" className="hover:text-[#CCFF00]">
            VENUE
          </Link>
          <Link href="/contact" className="hover:text-[#CCFF00]">
            CONTACT US
          </Link>
          <Link href="https://instagram.com" className="text-[#CCFF00]">
            <Instagram className="h-6 w-6" />
          </Link>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link href="/" className="hover:text-[#CCFF00]">
            HOME
          </Link>
          <Link href="/events" className="hover:text-[#CCFF00]">
            EVENTS
          </Link>
          <Link href="/schedule" className="hover:text-[#CCFF00]">
            SCHEDULE
          </Link>
          <Link href="/venue" className="hover:text-[#CCFF00]">
            VENUE
          </Link>
          <Link href="/contact" className="hover:text-[#CCFF00]">
            CONTACT US
          </Link>
          <Link href="https://instagram.com" className="text-[#CCFF00]">
            <Instagram className="h-6 w-6" />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
