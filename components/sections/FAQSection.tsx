"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is PayMatch?",
      answer:
        "PayMatch is an automated payment reconciliation platform that matches customer bank transfers to invoices using Nomba Virtual Accounts. It eliminates manual payment tracking and provides real-time visibility into payment status.",
    },
    {
      question: "How do Virtual Accounts work?",
      answer:
        "Each customer is assigned a unique Nomba virtual account. When they pay to this account, the payment is instantly linked to their profile and matched to the correct invoice. This creates a clear, automated trail of who paid what.",
    },
    {
      question: "Is money stored in PayMatch?",
      answer:
        "No. PayMatch does not hold or store customer funds. All payments go directly to your Nomba virtual accounts. We only track and reconcile the payments using Nomba's APIs.",
    },
    {
      question: "How secure is PayMatch?",
      answer:
        "PayMatch uses industry-standard encryption and security practices. All data is transmitted securely, and we comply with Nigerian financial regulations. Your payment data is protected with regular security audits.",
    },
    {
      question: "Can PayMatch handle partial payments?",
      answer:
        "Yes. PayMatch automatically detects and tracks partial payments. It updates the invoice status to 'Partial' and helps you track the outstanding balance. Smart reminders notify you of incomplete payments.",
    },
    {
      question: "How quickly does PayMatch match payments?",
      answer:
        "Payments are matched in real-time through Nomba webhooks. Once a customer pays, PayMatch receives the notification and matches it to the invoice within seconds.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <Container size="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about PayMatch
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all bg-white text-left group"
                >
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown
                      size={24}
                      className="text-slate-600 group-hover:text-teal-700 transition-colors"
                    />
                  </motion.div>
                </button>

                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{
                    height:
                      activeIndex === index ? "auto" : 0,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-white border border-t-0 border-slate-200 rounded-b-xl text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Still have questions */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 bg-gradient-to-br from-teal-50 to-slate-50 rounded-xl border border-teal-200"
          >
            <p className="text-slate-600 mb-2">Still have questions?</p>
            <a
              href="mailto:support@paymatch.app"
              className="text-teal-700 font-semibold hover:text-teal-600 transition-colors"
            >
              Contact our support team
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
