"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export function SolutionSection() {
  const steps = [
    {
      number: 1,
      title: "Create Customer",
      description: "Set up customer profile in PayMatch",
    },
    {
      number: 2,
      title: "Generate Invoice",
      description: "Create invoice with payment details",
    },
    {
      number: 3,
      title: "Assign Virtual Account",
      description: "Link unique Nomba virtual account",
    },
    {
      number: 4,
      title: "Customer Pays",
      description: "Customer transfers to virtual account",
    },
    {
      number: 5,
      title: "Nomba sends Webhook",
      description: "Real-time payment notification",
    },
    {
      number: 6,
      title: "Auto Match Payment",
      description: "PayMatch matches to correct invoice",
    },
    {
      number: 7,
      title: "Dashboard Updates",
      description: "Instant visibility into payment status",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-80 h-80 bg-teal-50 rounded-full blur-3xl"></div>
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16 relative z-10"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              The Solution
            </h2>
            <p className="text-lg text-slate-600">
              Automated payment reconciliation in 7 simple steps
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-teal-600 to-teal-400 transform -translate-x-1/2"></div>

            {/* Timeline Steps */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8 md:space-y-0"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className={`md:flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-700/10 transition-all">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 text-white font-bold text-sm">
                          {step.number}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                      className="w-8 h-8 rounded-full bg-white border-4 border-teal-700 shadow-lg shadow-teal-700/30"
                    ></motion.div>
                  </div>

                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center py-4">
                      <ArrowRight size={24} className="text-teal-600 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8"
          >
            <p className="text-slate-600 mb-4">
              All automated. All real-time. No manual intervention needed.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-full">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">
                Live reconciliation status
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
