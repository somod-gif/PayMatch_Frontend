"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
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
      stat: "3+ hours/week",
    },
    {
      icon: BarChart3,
      title: "Matching transfers manually",
      description: "Time-consuming reconciliation process",
      stat: "15+ hours/month",
    },
    {
      icon: Users,
      title: "Spreadsheet reconciliation",
      description: "Error-prone tracking across multiple sheets",
      stat: "40% error rate",
    },
    {
      icon: AlertCircle,
      title: "Unknown payers",
      description: "No clear link between payment and invoice",
      stat: "30% unclear",
    },
    {
      icon: Split,
      title: "Partial payments",
      description: "Difficult to track incomplete transactions",
      stat: "25% of payments",
    },
    {
      icon: Copy,
      title: "Duplicate records",
      description: "Risk of double-processing payments",
      stat: "5% duplicates",
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                <AlertCircle size={16} className="text-red-700" />
                <span className="text-sm font-medium text-red-700">
                  The Problem
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Manual payment reconciliation is killing your productivity
              </h2>
              <p className="text-lg text-slate-600">
                Businesses waste countless hours on payment tracking that should be automated
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <motion.div
                    key={problem.title}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full group hover:border-red-200 hover:shadow-lg hover:shadow-red-700/5 transition-all">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                            <Icon size={24} className="text-red-700" />
                          </div>
                          <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-1 rounded">
                            {problem.stat}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {problem.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {problem.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px]">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-slate-100/50 rounded-3xl blur-3xl"></div>
              
              {/* Floating cards */}
              <div className="relative grid grid-cols-2 gap-4 h-full">
                {[
                  { icon: "😫", label: "Stress", color: "from-red-50 to-slate-50" },
                  { icon: "⏰", label: "Time Waste", color: "from-orange-50 to-slate-50" },
                  { icon: "😤", label: "Frustration", color: "from-yellow-50 to-slate-50" },
                  { icon: "❌", label: "Errors", color: "from-red-50 to-slate-50" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 flex flex-col items-center justify-center gap-3"
                  >
                    <span className="text-5xl">{item.icon}</span>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}