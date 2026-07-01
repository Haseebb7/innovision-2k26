import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Innovision '26?",
      answer: "Innovision '26 is an International Level Symposium conducted by the Department of Artificial Intelligence and Cyber Security (AI&CC) at Ilahia College of Engineering and Technology (ICET). It features a Project Exhibition and a Paper Presentation conference."
    },
    {
      question: "Who can participate?",
      answer: "Students pursuing B.Tech, M.Tech, MCA, or other computer science/engineering degrees from any recognized college internationally, via online also, can participate."
    },
    {
      question: "How many members are allowed in a Project Exhibition team?",
      answer: "A project exhibition team can consist of a minimum of 1 member (solo) and a maximum of 4 members."
    },
    {
      question: "What format should the research paper be in?",
      answer: "Papers must be submitted in standard IEEE format. Only PDF files are accepted, with a file size limit of 10MB."
    },
    {
      question: "Are KTU Activity Points available?",
      answer: "Yes, participation and winning certificates are recognized for KTU (APJ Abdul Kalam Technological University) activity points under international-level events."
    },
    {
      question: "Can we register for both events?",
      answer: "Yes, you can register for both the Project Exhibition and the Paper Presentation. Separate registration fees apply to each event."
    },
    {
      question: "How is the registration fee verified?",
      answer: "After making the payment via UPI or Bank Transfer, you must enter the payment method and Transaction ID in the registration form. The admin panel verifies it before approving your entry."
    },
    {
      question: "Is accommodation or food provided?",
      answer: "Free lunch and refreshments will be provided to all registered participants on the day of the event. Accommodation can be arranged on request for students travelling from far distances."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 py-2 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center space-x-3 py-1">
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-cyber-neonPurple flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <HelpCircle size={22} />
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-wide">FAQ Section</h2>
          <p className="text-[10px] text-gray-400 font-mono tracking-wider">FREQUENTLY ASKED QUESTIONS</p>
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-2 pb-6">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass-panel rounded-xl overflow-hidden border border-white/5 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3.5 text-left flex justify-between items-center text-xs font-semibold hover:bg-white/5 transition-colors duration-300"
              >
                <span className={isOpen ? 'text-cyber-neonBlue font-bold' : 'text-gray-200'}>
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp size={16} className="text-cyber-neonBlue" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-300 font-light leading-relaxed border-t border-white/5 bg-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
