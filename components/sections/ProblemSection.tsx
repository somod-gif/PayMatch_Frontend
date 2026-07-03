"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  MessageCircle,
  BarChart3,
  AlertCircle,
  Users,
  Split,
  Copy,
} from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: MessageCircle,
      title: "Checking WhatsApp for confirmations",
      description: "Manual verification of payments through messages",
    },
    {
      icon: BarChart3,
      title: "Matching transfers manually",
      description: "Time-consuming reconciliation process",
    },
    {
      icon: Users,
      title: "Spreadsheet reconciliation",
      description: "Error-prone tracking across multiple sheets",
    },
    {
      icon: AlertCircle,
      title: "Unknown payers",
      description: "No clear link between payment and invoice",
    },
    {
      icon: Split,
      title: "Partial payments",
      description: "Difficult to track incomplete transactions",
    },
    {
      icon: Copy,
      title: "Duplicate records",
      description: "Risk of double-processing payments",
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
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="relative h-80 md:h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-slate-100/50 rounded-3xl blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4 w-full px-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="bg-white rounded-xl p-4 shadow-lg border border-slate-200"
                  >
                    <div className="h-3 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                The Problem
              </h2>
              <p className="text-lg text-slate-600">
                Businesses today struggle with payment reconciliation
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <motion.div
                    key={problem.title}
                    variants={itemVariants}
                    className="flex gap-4 p-4 rounded-lg hover:bg-teal-50 transition-colors group cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                        <Icon size={20} className="text-teal-700" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-slate-900">
                        {problem.title}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {problem.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
