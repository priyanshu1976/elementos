"use client";
import Link from "next/link";
import { Instagram, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  const quickLinks = [
    { title: "Events", href: "#events" },
    { title: "Speakers", href: "#speakers" },
    { title: "Register", href: "#register" },
    { title: "Schedule", href: "#schedule" },
  ];

  const contactInfo = [
    { title: "IETE Students' Forum", value: "TIET, Patiala" },
    { title: "Email", value: "iete_sc@thapar.edu" },
    { title: "Contact", value: "+91 93065 15524 , +91 88475 53417" },
    {
      title: "Location",
      value: "Thapar Institute of Engineering & Technology, Patiala",
    },
  ];

  return (
    <footer className="bg-[#1A1B35]/80 backdrop-blur-md mt-8 py-12 relative overflow-hidden">
      {/* Simple Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#FF0B7B]/10 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#00F0FF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-[#FF0B7B] font-bold text-xl mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#FF0B7B] rounded-full group-hover:w-2 transition-all"></span>
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Center Column - Logo and Social */}
          <motion.div className="flex flex-col items-center gap-8">
            <Link href="/" className="relative group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-[400px] h-[160px]"
              >
                <Image
                  src="/newele.png"
                  alt="ELEMENTOS Logo"
                  fill
                  className="object-contain group-hover:scale-200 transition-transform duration-300 scale-150"
                  priority
                />
              </motion.div>
            </Link>

            {/* Social Links */}
            <motion.div className="flex gap-6">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="bg-white/5 p-3 rounded-lg hover:bg-[#FF0B7B]/20 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-[#FF0B7B] group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="bg-white/5 p-3 rounded-lg hover:bg-[#00F0FF]/20 transition-colors group"
              >
                <Github className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="bg-white/5 p-3 rounded-lg hover:bg-white/20 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-[#00F0FF] font-bold text-xl mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="text-gray-400">
                  <h4 className="text-white text-sm">{info.title}</h4>
                  <p className="hover:text-[#00F0FF] transition-colors">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FF0B7B]">Made with</span>
            <span className="animate-pulse">❤️</span>
            <span className="text-[#00F0FF]">by Team IETE</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
