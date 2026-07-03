"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Settings, Download, Zap } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Settings,
      title: "Assign Payment Account",
      description:
        "Link a unique Nomba virtual account to each customer for payment tracking",
      details: [
        "Create customer profile",
        "Generate unique virtual account",
        "Share payment details",
      ],
    },
    {
      number: 2,
      icon: Download,
      title: "Receive Payment",
      description:
        "Customers transfer funds to their assigned virtual account",
      details: [
        "Customer sends payment",
        "Funds reach virtual account",
        "Real-time notification sent",
      ],
    },
    {
      number: 3,
      icon: Zap,
      title: "Automatic Reconciliation",
      description:
        "PayMatch instantly matches the payment to the correct invoice",
      details: [
        "Payment is matched to invoice",
        "Status updated automatically",
        "Dashboard reflects changes",
      ],
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
    <section
      id="how-it-works"
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-40 left-0 w-80 h-80 bg-teal-50 rounded-full blur-3xl"></div>
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 relative z-10"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to complete payment reconciliation
            </p>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 relative"
          >
            {/* Connecting arrows - Desktop only */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent pointer-events-none -z-10"></div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative"
                >
                  <Card className="h-full flex flex-col group">
                    {/* Step Number */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-bold text-xl">
                        {step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:flex absolute -right-8 top-5 text-teal-400">
                          <ArrowRight size={32} />
                        </div>
                      )}
                    </div>

                    {/* Icon */}
                    <div className="mb-4 p-4 bg-gradient-to-br from-teal-50 to-slate-50 rounded-lg w-fit group-hover:from-teal-100 transition-colors">
                      <Icon size={28} className="text-teal-700" />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-xl text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 mb-6 flex-grow">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-600"></div>
                          <span className="text-slate-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Mobile Connector */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center py-4">
                      <ArrowRight size={24} className="text-teal-600 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
