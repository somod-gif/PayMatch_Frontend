"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { APP_NAME, APP_TAGLINE } from "@/constants";
import { ArrowRight, CheckCircle, BarChart3, Users, Wallet } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">
              Now in Public Beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Automatic Payment Reconciliation for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
              Nigerian Organizations
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {APP_TAGLINE}. PayMatch automatically matches bank transfers to invoices
            using Nomba Virtual Accounts. Built for SMEs, schools, startups, and enterprises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/auth/register">
              <Button size="lg" className="bg-slate-100 shadow-xl shadow-white/10 w-full sm:w-auto text-base px-8">
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto text-base px-8">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-400" />
              <span className="text-sm">500+ Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-teal-400" />
              <span className="text-sm">₦2.4B+ Reconciled</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet size={18} className="text-emerald-400" />
              <span className="text-sm">99.9% Accuracy</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}