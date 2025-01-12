import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Elementos 9.0?",
    answer: "Elementos 9.0 is IETE Students' Forum's flagship technical event that brings together technology enthusiasts, developers, and innovators for a series of competitions, workshops, and networking opportunities."
  },
  {
    question: "How can I register for the events?",
    answer: "You can register for individual events through our registration portal. Click on the 'Register' button for the specific event you're interested in, and follow the registration process."
  },
  {
    question: "Are there any prerequisites for participating?",
    answer: "Prerequisites vary by event. While some events are open to all, others might require specific technical knowledge or skills. Check individual event details for specific requirements."
  },
  {
    question: "Is there a registration fee?",
    answer: "Registration fees vary by event. Some events are free, while others may have a nominal fee. Early bird discounts are available for certain events."
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes, all participants will receive digital certificates. Winners and runners-up will receive special recognition certificates and prizes."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="w-full py-6 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium pr-8">{question}</span>
        {isOpen ? 
          <Minus className="w-5 h-5 text-[#FF0B7B]" /> : 
          <Plus className="w-5 h-5 text-[#FF0B7B]" />
        }
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-400">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked
            <span className="text-[#FF0B7B]"> Questions</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Find answers to common questions about Elementos 9.0
          </p>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/5">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default FAQSection; 