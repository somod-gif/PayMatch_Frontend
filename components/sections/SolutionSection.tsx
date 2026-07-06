"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function SolutionSection() {
  const steps = [
    {
      number: 1,
      title: "Create Customer",
      description: "Set up customer profile in PayMatch",
      details: ["Add customer details", "Set up preferences", "Ready to invoice"],
    },
    {
      number: 2,
      title: "Generate Invoice",
      description: "Create invoice with payment details",
      details: ["Set amount and due date", "Add description", "Generate invoice"],
    },
    {
      number: 3,
      title: "Assign Virtual Account",
      description: "Link unique Nomba virtual account",
      details: ["Auto-generate VA", "Share with customer", "Track payments"],
    },
    {
      number: 4,
      title: "Customer Pays",
      description: "Customer transfers to virtual account",
      details: ["Customer makes payment", "Funds received", "Instant notification"],
    },
    {
      number: 5,
      title: "Auto-Match Payment",
      description: "PayMatch matches to correct invoice",
      details: ["AI-powered matching", "Verify transaction", "Update status"],
    },
    {
      number: 6,
      title: "Dashboard Updates",
      description: "Instant visibility into payment status",
      details: ["Real-time updates", "Send reminders", "Generate reports"],
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
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-2">
              <CheckCircle2 size={16} className="text-teal-700" />
              <span className="text-sm font-medium text-teal-700">
                The Solution
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Automated payment reconciliation in 6 simple steps
            </h2>
            <p className="text-lg text-slate-600">
              From customer creation to payment reconciliation, everything is automated
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
                  <div className={`md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <Card className="h-full group hover:border-teal-300 hover:shadow-xl hover:shadow-teal-700/10 transition-all">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                          {step.number}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">
                            {step.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={14} className="text-teal-600 flex-shrink-0" />
                            <span className="text-slate-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-2/12">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                      className="w-4 h-4 rounded-full bg-white border-4 border-teal-700 shadow-lg shadow-teal-700/30"
                    ></motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-5/12"></div>

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
            <p className="text-slate-600 mb-4 text-lg">
              All automated. All real-time. No manual intervention needed.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border border-green-200 rounded-full">
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