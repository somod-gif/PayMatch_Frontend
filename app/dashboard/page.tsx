"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { Users, FileText, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { dashboardService } from "@/services";
import { DashboardStats } from "@/types";
import { CURRENCY } from "@/constants";

const comingSoonModules = [
  {
    title: "Customer Management",
    description: "Create, manage, and track customers with assigned virtual accounts.",
    href: "/dashboard/customers",
  },
  {
    title: "Invoice Tracking",
    description: "Generate and monitor invoices with real-time payment status.",
    href: "/dashboard/invoices",
  },
  {
    title: "Payment Reconciliation",
    description: "View matched payments and handle exceptions.",
    href: "/dashboard/payments",
  },
  {
    title: "Webhook Logs",
    description: "Monitor incoming Nomba webhook events in real time.",
    href: "/dashboard/webhooks",
  },
  {
    title: "Analytics & Reports",
    description: "Comprehensive reporting and insights (Coming Soon).",
    href: "#",
  },
  {
    title: "Settings",
    description: "Configure your account, API keys, and notification preferences.",
    href: "/dashboard/settings",
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getStats();
      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.error || "Failed to load dashboard stats");
      }
    } catch {
      setError("Unable to connect to the backend. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: CURRENCY.code,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statItems = [
    {
      label: "Total Customers",
      value: stats?.totalCustomers ?? 0,
      icon: Users,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      label: "Active Invoices",
      value: stats?.activeInvoices ?? 0,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Payments Received",
      value: stats ? formatCurrency(stats.paymentsReceived) : "₦0",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Match Rate",
      value: stats ? `${stats.matchRate}%` : "0%",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Welcome to PayMatch
        </h1>
        <p className="text-slate-500 mt-1">
          Your payment reconciliation dashboard. Connect your backend to start receiving live data.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-5">
              <LoadingSkeleton height="1.5rem" width="2rem" className="mb-2" />
              <LoadingSkeleton height="2rem" width="3rem" className="mb-1" />
              <LoadingSkeleton height="1rem" width="4rem" />
            </Card>
          ))
        ) : error ? (
          <div className="col-span-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700 text-sm">{error}</p>
          </div>
        ) : (
          statItems.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} hover={false} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                    <Icon size={20} className="text-slate-700" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </Card>
            );
          })
        )}
      </div>

      {/* Recent Activity */}
      {stats && stats.recentTransactions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <Card>
            <div className="space-y-4">
              {stats.recentTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">{transaction.customerName}</p>
                    <p className="text-sm text-slate-600">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <Badge variant={transaction.status === "matched" ? "success" : "warning"}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Modules */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comingSoonModules.map((module) => (
            <a
              key={module.title}
              href={module.href}
              className="block group"
            >
              <Card className="p-5 h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {module.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-slate-300 group-hover:text-teal-600 transition-colors flex-shrink-0 mt-1"
                  />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Backend Notice */}
      <div className="bg-gradient-to-br from-teal-50 to-slate-50 border border-teal-200 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 mb-2">
          🚀 Ready to go live?
        </h3>
        <p className="text-sm text-slate-600">
          This dashboard displays placeholder data. Once your NestJS backend is deployed and
          connected via the <code className="text-teal-700 bg-teal-100 px-1 rounded">NEXT_PUBLIC_API_URL</code> environment variable,
          real customer, invoice, and payment data will populate automatically.
        </p>
      </div>
    </div>
  );
}