"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Github } from "lucide-react";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const cardFloatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="pt-40 pb-20 md:pb-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-50/30 rounded-full blur-3xl"></div>
      </div>

      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                Stop Guessing Who Paid.
                <br />
                <span className="gradient-text">
                  Automatically Match Every Bank Transfer.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                PayMatch helps businesses automatically match customer bank transfer
                payments to the correct invoices using Nomba Virtual Accounts.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                icon={<ArrowRight size={20} />}
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
              <a href="https://github.com/paymatch" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Github size={20} />}
                  className="w-full"
                >
                  View GitHub
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative min-h-[24rem] md:min-h-[28rem]">
              {/* Main Dashboard Card */}
              <motion.div
                variants={cardFloatVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 -top-4"
              >
                <Card
                  blur={false}
                  className="h-full shadow-2xl shadow-teal-700/20"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">
                        Dashboard
                      </h3>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-teal-700 rounded-full"></div>
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        custom={1}
                        variants={floatingVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-lg p-3 border border-teal-100"
                      >
                        <p className="text-xs text-slate-600 mb-1">
                          Total Customers
                        </p>
                        <p className="text-2xl font-bold text-teal-700">1,245</p>
                      </motion.div>

                      <motion.div
                        custom={2}
                        variants={floatingVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-lg p-3 border border-teal-100"
                      >
                        <p className="text-xs text-slate-600 mb-1">
                          Invoices
                        </p>
                        <p className="text-2xl font-bold text-teal-700">3,892</p>
                      </motion.div>

                      <motion.div
                        custom={3}
                        variants={floatingVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-gradient-to-br from-green-50 to-slate-50 rounded-lg p-3 border border-green-100"
                      >
                        <p className="text-xs text-slate-600 mb-1">
                          Payments Received
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          ₦2.4M
                        </p>
                      </motion.div>

                      <motion.div
                        custom={4}
                        variants={floatingVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-lg p-3 border border-orange-100"
                      >
                        <p className="text-xs text-slate-600 mb-1">
                          Pending Payments
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          ₦856K
                        </p>
                      </motion.div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="space-y-2 border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Recent Transactions
                      </p>
                      <div className="space-y-2">
                        <motion.div
                          custom={5}
                          variants={floatingVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-600">
                            Acme Corp Rent
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">
                              ₦150,000
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Paid
                            </span>
                          </div>
                        </motion.div>
                        <motion.div
                          custom={6}
                          variants={floatingVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-600">
                            Tech Startup Invoice
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">
                              ₦75,500
                            </span>
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                              Partial
                            </span>
                          </div>
                        </motion.div>
                        <motion.div
                          custom={7}
                          variants={floatingVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-600">School Fees</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">
                              ₦250,000
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Paid
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
