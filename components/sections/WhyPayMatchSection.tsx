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
      className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50"
    >
      <Container>
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
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Why Choose PayMatch
            </h2>
            <p className="text-lg text-slate-600">
              Transform your payment operations with measurable impact
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full group relative overflow-hidden">
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${benefit.color}`}
                    ></div>

                    <div className="relative space-y-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon size={28} className="text-white" />
                      </div>

                      {/* Metric */}
                      <div>
                        <p className="text-4xl font-bold text-slate-900">
                          {benefit.metric}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {benefit.description}
                        </p>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg text-slate-900">
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
