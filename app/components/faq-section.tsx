"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Elementos 9.0?",
    answer: "Elementos 9.0 is IETE Students' Forum's flagship technical event that brings together technology enthusiasts, developers, and innovators for a series of competitions, workshops, and networking opportunities."
  },
  {
    question: "When and where will Elementos 9.0 take place?",
    answer: "Elementos 9.0 will be held at Thapar Institute of Engineering & Technology, Patiala. The exact dates and venue details will be announced soon."
  },
  {
    question: "How can I register for Elementos 9.0?",
    answer: "You can register for individual events through our registration portal. Complete details about the registration process will be shared on our website."
  },
  {
    question: "Can I participate in more than one event?",
    answer: "Yes, you can participate in multiple events. Just ensure that the event timings don't overlap and register separately for each event you wish to participate in."
  },
  {
    question: "Is there a registration fee for participating?",
    answer: "Registration fees vary by event. Some events are free, while others may have a nominal fee. Early bird discounts may be available for certain events."
  },
  {
    question: "Who can participate in Elementos 9.0?",
    answer: "Elementos 9.0 is open to all college students. Some events may have specific eligibility criteria, which will be mentioned in the event details."
  },
  {
    question: "Will there be certificates for participation or winners?",
    answer: "Yes, all participants will receive digital certificates of participation. Winners and runners-up will receive special recognition certificates and prizes."
  },
  {
    question: "How will I know the schedule for the events?",
    answer: "A detailed schedule of all events will be shared on our website and social media channels. Registered participants will also receive updates via email."
  },
  {
    question: "What should I bring to the event?",
    answer: "Required materials vary by event. Basic requirements include your college ID, registration confirmation, and any specific tools mentioned in the event guidelines."
  },
  {
    question: "How do I contact the organizers in case of queries?",
    answer: "You can reach out to us through our email at iete_sc@thapar.edu or through our social media channels. Our team will respond to your queries promptly."
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium pr-8 text-white/90">{question}</span>
        {isOpen ? 
          <Minus className="w-5 h-5 text-[#FF0B7B]" /> : 
          <Plus className="w-5 h-5 text-[#FF0B7B]" />
        }
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0, 
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-400">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function FAQSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="faq" className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 relative inline-block"
          >
            Frequently Asked{" "}
            <span className="text-[#FF0B7B] relative">
              Questions
              <div className="absolute -bottom-2 left-0 h-1 w-full bg-[#FF0B7B]/30"></div>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about Elementos 9.0
          </motion.p>
        </div>

        <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-50 rounded-2xl"></div>
          <div className="relative z-10">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default FAQSection; 