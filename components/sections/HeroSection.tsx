"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Github, Play } from "lucide-react";

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
      className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-50/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal-50/20 to-transparent rounded-full"></div>
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-teal-700">
                  Now in Public Beta
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 tracking-tight">
                Stop Guessing Who Paid.
                <br />
                <span className="gradient-text">
                  Automatically Match Every Bank Transfer.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                PayMatch helps businesses automatically match customer bank transfer
                payments to the correct invoices using Nomba Virtual Accounts.
                Save time, reduce errors, and get paid faster.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                icon={<ArrowRight size={20} />}
                className="w-full sm:w-auto shadow-lg shadow-teal-700/20"
              >
                Start Free Trial
              </Button>
              <a
                href="https://github.com/paymatch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Github size={20} />}
                  className="w-full"
                >
                  View on GitHub
                </Button>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Trusted by 500+ businesses
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-sm text-slate-600 ml-1">5.0</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem]">
              {/* Main Dashboard Card */}
              <motion.div
                variants={cardFloatVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 -top-4"
              >
                <Card
                  blur={false}
                  className="h-full shadow-2xl shadow-teal-700/20 border-2"
                >
                  <div className="space-y-6 p-6">
                    {/* Header */}
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
                      {[
                        { label: "Total Customers", value: "1,245", color: "from-teal-50 to-slate-50", border: "border-teal-100", textColor: "text-teal-700" },
                        { label: "Invoices", value: "3,892", color: "from-blue-50 to-slate-50", border: "border-blue-100", textColor: "text-blue-700" },
                        { label: "Payments Received", value: "₦2.4M", color: "from-green-50 to-slate-50", border: "border-green-100", textColor: "text-green-700" },
                        { label: "Pending Payments", value: "₦856K", color: "from-orange-50 to-slate-50", border: "border-orange-100", textColor: "text-orange-700" },
                      ].map((metric, i) => (
                        <motion.div
                          key={metric.label}
                          custom={i + 1}
                          variants={floatingVariants}
                          initial="hidden"
                          animate="visible"
                          className={`bg-gradient-to-br ${metric.color} rounded-lg p-3 border ${metric.border}`}
                        >
                          <p className="text-xs text-slate-600 mb-1">
                            {metric.label}
                          </p>
                          <p className={`text-2xl font-bold ${metric.textColor}`}>
                            {metric.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Recent Transactions */}
                    <div className="space-y-3 border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Recent Transactions
                      </p>
                      <div className="space-y-2">
                        {[
                          { name: "Acme Corp Rent", amount: "₦150,000", status: "Paid", statusColor: "bg-green-100 text-green-700" },
                          { name: "Tech Startup Invoice", amount: "₦75,500", status: "Partial", statusColor: "bg-yellow-100 text-yellow-700" },
                          { name: "School Fees", amount: "₦250,000", status: "Paid", statusColor: "bg-green-100 text-green-700" },
                        ].map((tx, i) => (
                          <motion.div
                            key={tx.name}
                            custom={i + 5}
                            variants={floatingVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-slate-600">
                              {tx.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900">
                                {tx.amount}
                              </span>
                              <span className={`px-2 py-0.5 ${tx.statusColor} text-xs font-medium rounded`}>
                                {tx.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}
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