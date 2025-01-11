import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1B35] mt-8 md:mt-16 py-8 md:py-12 h-auto relative overflow-hidden">
      {/* Geometric Shapes */}

      <div className="container mx-auto px-4 flex flex-col justify-center relative z-10">
        <div className="flex flex-col md:flex-row mb-8 md:mb-12">
          <Link
            href="/"
            className="text-[#CCFF00] text-2xl font-bold mb-4 md:mb-0"
          >
            ELEMENTOS<span className="text-white">9.0</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-gray-400">
          {/* Day 0 Card with Circle */}
          <div
            id="day-0"
            className="p-4 border border-gray-800 rounded-lg relative group"
          >
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-[#CCFF00] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[#CCFF00] font-semibold mb-2">
              Day 0 - January 30
            </h3>
            <h4 className="font-medium mb-1">Pre-Event Activities</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-[#CCFF00]">Flashmob and Logo Reveal</span>
                <p>Venue: K Lawns</p>
                <p>Time: TBD</p>
              </li>
            </ul>
          </div>

          {/* Day 1 Card with Triangle */}
          <div
            id="day-1"
            className="p-4 border border-gray-800 rounded-lg relative group"
          >
            <div className="absolute top-4 right-4 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-[#CCFF00] border-r-[12px] border-r-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[#CCFF00] font-semibold mb-2">
              Day 1 - January 31
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-[#CCFF00]">Opening Ceremony</span>
                <p>Time: 5:00 PM</p>
                <p>Activities: Lighting ceremony, Welcome speech</p>
              </li>
              <li>
                <span className="text-[#CCFF00]">UI/UX Competition</span>
                <p>Format: Online</p>
              </li>
            </ul>
          </div>

          {/* Day 2 Card with Square */}
          <div
            id="day-2"
            className="p-4 border border-gray-800 rounded-lg relative group"
          >
            <div className="absolute top-4 right-4 w-6 h-6 border-2 border-[#CCFF00] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[#CCFF00] font-semibold mb-2">
              Day 2 - February 1
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-[#CCFF00]">Prompt vs Prompt</span>
                <p>Creative problem solving competition</p>
              </li>
              <li>
                <span className="text-[#CCFF00]">Electronics Competition</span>
              </li>
              <li>
                <span className="text-[#CCFF00]">Hackathon</span>
                <p>Time: 7:00 PM - 8:00 AM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row pt-8 justify-between">
          <div className="flex gap-6 mb-4 md:mb-0">
            <Link href="#" className="text-gray-400 hover:text-[#CCFF00]">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#CCFF00]">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#CCFF00]">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#CCFF00]">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex gap-4 md:gap-8 text-sm text-gray-400">
            <Link href="/terms">Terms of Agreement</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>

        <div className="flex gap-4 md:gap-8 text-xl text-gray-400 justify-center items-center mt-8">
          Made with ❤️ teamelementos
        </div>
      </div>
    </footer>
  );
}

export default Footer;
