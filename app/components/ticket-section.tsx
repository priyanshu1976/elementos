import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 md:py-24">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          ABOUT
          <span className="text-[#FF0B7B]"> ELEMENTOS</span>
          <span className="text-[#00F0FF]"> 9.0</span>
        </h2>

        <motion.div 
          className="relative p-8 rounded-2xl backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0B7B]/10 via-black/50 to-[#00F0FF]/10 rounded-2xl" />
          <div className="relative">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              ELEMENTOS is IETE Students' Forum's flagship technical event, bringing together 
              the brightest minds in technology. In its 9th edition, we continue to push 
              boundaries and create an immersive experience for all tech enthusiasts.
            </p>
            <Link 
              href="#events"
              className="inline-flex items-center gap-2 bg-[#FF0B7B] px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all hover:scale-105 text-lg"
            >
              Explore Events
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutSection;