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
        setError(response.message || "Failed to load dashboard stats");
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

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === "string" ? Number(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: CURRENCY.code,
      minimumFractionDigits: 0,
    }).format(numAmount);
  };

  const statItems = [
    {
      label: "Total Customers",
      value: stats?.metrics?.totalCustomers ?? 0,
      icon: Users,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      label: "Active Invoices",
      value: stats?.metrics?.totalInvoices ?? 0,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total Revenue",
      value: stats?.metrics?.totalRevenue ? formatCurrency(stats.metrics.totalRevenue) : "₦0",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Paid Invoices",
      value: stats?.metrics?.paidInvoices ?? 0,
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
          Your payment reconciliation dashboard powered by Nomba Virtual Accounts.
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
      {stats && stats.recentPayments && stats.recentPayments.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Payments</h2>
          <Card>
            <div className="space-y-4">
              {stats.recentPayments.slice(0, 5).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">{payment.customerName}</p>
                    <p className="text-sm text-slate-600">Invoice #{payment.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {formatCurrency(payment.amount)}
                    </p>
                    <Badge variant={payment.status === "completed" ? "success" : "default"}>
                      {payment.status}
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
    </div>
  );
}