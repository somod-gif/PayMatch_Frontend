"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-gradient-to-b from-teal-50 to-transparent opacity-50"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 text-center space-y-8 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Ready to Stop Manually Tracking Payments?
          </h2>

          <p className="text-xl text-slate-600 leading-relaxed">
            Join businesses across Nigeria that are automating their payment reconciliation with PayMatch
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button size="lg" icon={<ArrowRight size={20} />}>
              Get Started Free
            </Button>
            <a
              href="https://github.com/paymatch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View on GitHub
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <p className="text-sm text-slate-600 mb-4">
              Trusted by businesses in Nigeria
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="px-4 py-2 bg-gradient-to-r from-teal-50 to-slate-50 rounded-lg border border-teal-200">
                <p className="text-sm font-medium text-teal-700">
                  ✓ No Credit Card Required
                </p>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-teal-50 to-slate-50 rounded-lg border border-teal-200">
                <p className="text-sm font-medium text-teal-700">
                  ✓ 7-Day Free Trial
                </p>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-teal-50 to-slate-50 rounded-lg border border-teal-200">
                <p className="text-sm font-medium text-teal-700">
                  ✓ Instant Setup
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
