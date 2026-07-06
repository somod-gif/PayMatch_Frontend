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
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full mb-2">
              <span className="text-sm font-medium text-purple-700">Use Cases</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 text-balance">
              Built for Everyone
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              PayMatch works for any business that needs payment reconciliation
            </p>
          </motion.div>

          {/* Users Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {users.map((user) => {
              const Icon = user.icon;
              return (
                <motion.div
                  key={user.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card
                    className="h-full group flex flex-col relative overflow-hidden"
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-start gap-3 mb-4 relative z-10">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-teal-100 rounded-xl group-hover:from-purple-200 group-hover:scale-110 transition-all">
                        <Icon size={24} className="text-purple-700" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 flex-grow group-hover:text-purple-700 transition-colors">
                        {user.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 flex-grow relative z-10">
                      {user.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-100 relative z-10">
                      {user.examples.map((example, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0"></div>
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
