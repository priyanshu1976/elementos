import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1A1B35] mt-8 md:mt-16 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
          <Link href="/" className="text-[#CCFF00] text-2xl font-bold mb-4 md:mb-0">
            EVENT<span className="text-white">X</span>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h3 className="text-xl font-bold mb-2 md:mb-0 md:mr-4">SUBSCRIBE TO OUR NEWSLETTER</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#0D0E23] px-4 md:px-6 py-2 md:py-3 rounded-l-full focus:outline-none w-full md:w-auto"
              />
              <button className="bg-[#CCFF00] text-black px-4 md:px-6 py-2 md:py-3 rounded-r-full flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
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
      </div>
    </footer>
  )
}

export default Footer;