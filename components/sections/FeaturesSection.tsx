"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  Zap,
  DollarSign,
  Clock,
  BarChart3,
  CheckCircle2,
  Shield,
  FileText,
  AlertCircle,
  ScrollText,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Automatic Payment Matching",
      description:
        "AI-powered matching connects payments to invoices instantly without manual intervention",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      icon: DollarSign,
      title: "Virtual Accounts",
      description:
        "Unique virtual accounts per customer for perfect payment traceability",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      title: "Real-Time Webhooks",
      description:
        "Instant notifications when payments are received and matched",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: BarChart3,
      title: "Invoice Tracking",
      description:
        "Complete visibility into invoice status and payment progress",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: CheckCircle2,
      title: "Partial Payment Detection",
      description: "Automatically identify and track partial payments with reminders",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      title: "Business Dashboard",
      description:
        "Professional SaaS dashboard for monitoring all payment activities",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
    },
    {
      icon: FileText,
      title: "Transaction History",
      description: "Complete audit trail of all transactions and reconciliations",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
    },
    {
      icon: AlertCircle,
      title: "Smart Alerts",
      description: "Notifications for overdue payments and discrepancies",
      color: "from-cyan-500 to-teal-500",
      bgColor: "bg-cyan-50",
    },
    {
      icon: ScrollText,
      title: "Audit Logs",
      description: "Compliance-ready audit logs for all system activities",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
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
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-2">
              <Zap size={16} className="text-teal-700" />
              <span className="text-sm font-medium text-teal-700">
                Powerful Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Everything you need for seamless payment reconciliation
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to automate your payment workflow and save you hours of manual work every week.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    hover={true}
                    className="h-full flex flex-col gap-4 group relative overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${feature.color}`}></div>
                    
                    <div className="relative space-y-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <Icon size={28} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                      </div>
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