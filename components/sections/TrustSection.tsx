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
    { icon: Webhook, label: "Nomba Virtual Accounts" },
    { icon: Radio, label: "Nomba Webhooks" },
    { icon: RefreshCw, label: "Transactions API" },
    { icon: Server, label: "NestJS" },
    { icon: Code2, label: "Next.js" },
    { icon: Database, label: "PostgreSQL" },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
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
              Seamless integration with Nomba payment infrastructure
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
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-700/10 transition-all"
                >
                  <div className="p-3 bg-white rounded-lg group-hover:bg-teal-50 transition-colors">
                    <Icon
                      size={24}
                      className="text-teal-700 group-hover:text-teal-600"
                    />
                  </div>
                  <p className="text-xs font-semibold text-slate-600 text-center leading-tight">
                    {tech.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
