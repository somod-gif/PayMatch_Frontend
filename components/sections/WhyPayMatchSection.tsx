"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  TrendingDown,
  Zap,
  Trash2,
  Clock,
  Layers,
  CheckCircle,
} from "lucide-react";

export function WhyPayMatchSection() {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Reduce Manual Work",
      metric: "80%",
      description: "Less time on reconciliation tasks",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      metric: "0s",
      description: "Instant payment status visibility",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: Trash2,
      title: "Zero Spreadsheet Tracking",
      metric: "100%",
      description: "Eliminate error-prone sheets",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Faster Reconciliation",
      metric: "99%",
      description: "Automated payment matching accuracy",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Layers,
      title: "Scalable Payment Tracking",
      metric: "∞",
      description: "Handle unlimited customers and invoices",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "Peace of Mind",
      metric: "✓",
      description: "Audit-ready compliance and transparency",
      color: "from-teal-500 to-cyan-500",
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
    <section
      id="benefits"
      className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/10 rounded-full blur-3xl"></div>
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 relative z-10"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full mb-2">
              <span className="text-sm font-medium text-green-700">Benefits</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 text-balance">
              Why Choose PayMatch
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Transform your payment operations with measurable impact
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full group relative overflow-hidden">
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${benefit.color}`}
                    ></div>

                    <div className="relative space-y-4">
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                      >
                        <Icon size={32} className="text-white" />
                      </div>

                      {/* Metric */}
                      <div>
                        <p className="text-5xl font-bold text-slate-900">
                          {benefit.metric}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {benefit.description}
                        </p>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
                        {benefit.title}
                      </h3>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
