"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  Building2,
  Users,
  Briefcase,
  Zap,
  Users2,
  Wrench,
  BookOpen,
  BarChart3,
} from "lucide-react";

export function TargetUsersSection() {
  const users = [
    {
      icon: BookOpen,
      title: "Schools",
      description: "Track student fees and tuition payments automatically",
      examples: ["Tuition fees", "Activity fees", "Exam charges"],
    },
    {
      icon: Building2,
      title: "Landlords",
      description: "Reconcile rent payments from multiple tenants",
      examples: ["Rent collection", "Maintenance fees", "Security deposits"],
    },
    {
      icon: Briefcase,
      title: "Freelancers",
      description: "Manage payments from multiple clients effortlessly",
      examples: ["Project payments", "Retainers", "Milestone deliveries"],
    },
    {
      icon: BarChart3,
      title: "SMEs",
      description: "Scale payment operations as your business grows",
      examples: ["Invoice payments", "Subscriptions", "Service charges"],
    },
    {
      icon: Users,
      title: "Cooperatives",
      description: "Coordinate member payments and contributions",
      examples: ["Member dues", "Savings contributions", "Loan repayments"],
    },
    {
      icon: Wrench,
      title: "Agencies",
      description: "Track client payments across multiple projects",
      examples: ["Project fees", "Retainer fees", "Monthly billing"],
    },
    {
      icon: Zap,
      title: "Service Businesses",
      description: "Automate service payment reconciliation",
      examples: ["Service fees", "Delivery charges", "Consultations"],
    },
    {
      icon: Users2,
      title: "NGOs & Non-Profits",
      description: "Manage donations and membership fees transparently",
      examples: ["Donations", "Membership fees", "Event registrations"],
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
    <section className="py-20 md:py-32 bg-white">
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
              Built for Everyone
            </h2>
            <p className="text-lg text-slate-600">
              PayMatch works for any business that needs payment reconciliation
            </p>
          </motion.div>

          {/* Users Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {users.map((user) => {
              const Icon = user.icon;
              return (
                <motion.div
                  key={user.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="h-full group flex flex-col"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-teal-100 to-slate-100 rounded-lg group-hover:from-teal-200 transition-colors">
                        <Icon size={24} className="text-teal-700" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 flex-grow">
                        {user.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 flex-grow">
                      {user.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      {user.examples.map((example, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-teal-600"></div>
                          <span className="text-slate-600">{example}</span>
                        </div>
                      ))}
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
