"use client";

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
  Bell,
  ScrollText,
  Building2,
  GraduationCap,
  Store,
  Briefcase,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Automatic Payment Matching",
    description: "AI-powered matching connects payments to invoices instantly without manual intervention",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: DollarSign,
    title: "Virtual Accounts",
    description: "Unique virtual accounts per customer for perfect payment traceability",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Real-Time Webhooks",
    description: "Instant notifications when payments are received and matched",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Invoice Tracking",
    description: "Complete visibility into invoice status and payment progress",
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
    description: "Professional SaaS dashboard for monitoring all payment activities",
    color: "from-red-500 to-rose-500",
  },
];

const sectors = [
  { icon: Building2, name: "SMEs", description: "Small and medium businesses" },
  { icon: GraduationCap, name: "Schools", description: "Educational institutions" },
  { icon: Store, name: "E-commerce", description: "Online retail businesses" },
  { icon: Briefcase, name: "Enterprises", description: "Large organizations" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <Container>
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full">
            <Zap size={14} className="text-teal-600" />
            <span className="text-sm font-medium text-teal-700">
              Built for Organizations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Who We Build For
          </h2>
          <p className="text-lg text-slate-600">
            PayMatch serves organizations across various sectors
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div key={sector.name} className="p-6 rounded-2xl border border-slate-200 hover:border-teal-200 hover:bg-teal-50/50 transition-all">
                  <Icon size={28} className="text-teal-600 mb-3 mx-auto" />
                  <h3 className="font-bold text-slate-900">{sector.name}</h3>
                  <p className="text-sm text-slate-500">{sector.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Everything you need
          </h2>
          <p className="text-lg text-slate-600">
            Powerful features designed to automate your payment workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                hover
                className="h-full flex flex-col gap-4 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${feature.color}`} />
                <div className="relative space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}