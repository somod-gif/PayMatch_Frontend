"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  Server,
  Webhook,
  Database,
  Code2,
  Radio,
  RefreshCw,
  Lock,
  Shield,
} from "lucide-react";

export function TrustSection() {
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

  const techStack = [
    { icon: Webhook, label: "Nomba Virtual Accounts", description: "Secure payment processing" },
    { icon: Radio, label: "Nomba Webhooks", description: "Real-time notifications" },
    { icon: RefreshCw, label: "Transactions API", description: "Instant reconciliation" },
    { icon: Server, label: "NestJS Backend", description: "Scalable architecture" },
    { icon: Code2, label: "Next.js Frontend", description: "Modern user experience" },
    { icon: Database, label: "PostgreSQL", description: "Reliable data storage" },
  ];

  const securityFeatures = [
    { icon: Lock, label: "End-to-End Encryption", description: "All data encrypted" },
    { icon: Shield, label: "CBN Compliant", description: "Regulatory approved" },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-teal-700">
                Built for the DevCareer &times; Nomba Hackathon 2026
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Powered by Nomba APIs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Seamless integration with Nomba payment infrastructure for reliable, real-time payment processing
            </p>
          </motion.div>

          {/* Tech Stack Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.label}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-700/10 transition-all"
                >
                  <div className="p-3 bg-white rounded-lg group-hover:bg-teal-50 transition-colors shadow-sm">
                    <Icon
                      size={24}
                      className="text-teal-700 group-hover:text-teal-600"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-900 mb-1">
                      {tech.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {tech.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Security Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 border border-green-200"
                >
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Icon size={24} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{feature.label}</p>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}