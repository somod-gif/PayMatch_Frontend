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
    },
    {
      icon: DollarSign,
      title: "Virtual Accounts",
      description:
        "Unique virtual accounts per customer for perfect payment traceability",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Real-Time Webhooks",
      description:
        "Instant notifications when payments are received and matched",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Invoice Tracking",
      description:
        "Complete visibility into invoice status and payment progress",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: CheckCircle2,
      title: "Partial Payment Detection",
      description: "Automatically identify and track partial payments with reminders",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Business Dashboard",
      description:
        "Professional SaaS dashboard for monitoring all payment activities",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: FileText,
      title: "Transaction History",
      description: "Complete audit trail of all transactions and reconciliations",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: AlertCircle,
      title: "Smart Alerts",
      description: "Notifications for overdue payments and discrepancies",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: ScrollText,
      title: "Audit Logs",
      description: "Compliance-ready audit logs for all system activities",
      color: "from-violet-500 to-purple-500",
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
          className="space-y-12"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need for seamless payment reconciliation
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
                    className="h-full flex flex-col gap-4 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">{feature.description}</p>
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
