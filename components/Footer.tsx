"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Github, Mail, ExternalLink } from "lucide-react";
import { FOOTER_LINKS, TECH_STACK, APP_EMAIL, APP_GITHUB_URL, COMPANY } from "@/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 space-y-16"
        >
          {/* Top Section */}
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <motion.div variants={itemVariants} className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src="/images/logo.png"
                    alt="PayMatch Logo"
                    fill
                    className="object-contain invert"
                  />
                </div>
                <span className="font-bold text-lg text-white">PayMatch</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                The reconciliation layer for Nigerian SMEs. Automatically match
                payments to invoices using Nomba Virtual Accounts.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/paymatch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="mailto:hello@paymatch.app"
                  className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>

            {/* Links */}
            {FOOTER_LINKS.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="space-y-4"
              >
                <h4 className="font-semibold text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                      >
                        {item.label}
                        {item.href.startsWith("http") && (
                          <ExternalLink
                            size={14}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Built with */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-300">
                Built with heart using
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 hover:text-teal-400 transition-colors cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <p className="text-sm text-slate-400">
                Built with ❤️ for{" "}
                <a
                  href="https://nomba.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300"
                >
                  Nomba
                </a>{" "}
                ×{" "}
                <a
                  href="https://devcareer.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300"
                >
                  DevCareer
                </a>{" "}
                Hackathon 2026
              </p>
              <p className="text-sm text-slate-400">
                © {currentYear} PayMatch. All rights reserved.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
