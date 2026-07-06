"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Users, FileText, DollarSign, TrendingUp, ArrowRight, RefreshCw, Activity, Zap } from "lucide-react";
import { dashboardService } from "@/services";
import { DashboardStats } from "@/types";
import { CURRENCY } from "@/constants";
import Link from "next/link";

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
      textColor: "text-teal-700",
      href: "/dashboard/customers",
    },
    {
      label: "Active Invoices",
      value: stats?.metrics?.totalInvoices ?? 0,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      href: "/dashboard/invoices",
    },
    {
      label: "Total Revenue",
      value: stats?.metrics?.totalRevenue ? formatCurrency(stats.metrics.totalRevenue) : "₦0",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      href: "/dashboard/payments",
    },
    {
      label: "Paid Invoices",
      value: stats?.metrics?.paidInvoices ?? 0,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      href: "/dashboard/invoices",
    },
  ];

  const quickActions = [
    {
      title: "Add Customer",
      description: "Create a new customer profile",
      icon: Users,
      href: "/dashboard/customers",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Create Invoice",
      description: "Generate a new invoice",
      icon: FileText,
      href: "/dashboard/invoices",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "View Payments",
      description: "Check recent transactions",
      icon: DollarSign,
      href: "/dashboard/payments",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Welcome to PayMatch
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Your payment reconciliation dashboard powered by Nomba Virtual Accounts.
          </p>
        </div>
        <Button
          variant="outline"
          icon={<RefreshCw size={18} />}
          onClick={fetchStats}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-5 md:p-6">
              <LoadingSkeleton height="1.5rem" width="2rem" className="mb-3" />
              <LoadingSkeleton height="2.5rem" width="3rem" className="mb-2" />
              <LoadingSkeleton height="1rem" width="4rem" />
            </Card>
          ))
        ) : error ? (
          <div className="col-span-4 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-amber-700">{error}</p>
            <Button variant="outline" onClick={fetchStats} className="mt-3">
              Try Again
            </Button>
          </div>
        ) : (
          statItems.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} href={stat.href}>
                <Card hover className="p-5 md:p-6 group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className={stat.textColor} />
                    </div>
                    <ArrowRight size={18} className="text-slate-400 group-hover:text-teal-700 transition-colors" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                </Card>
              </Link>
            );
          })
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Payments */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Payments</h2>
              <Link href="/dashboard/payments">
                <Button variant="ghost" size="sm" icon={<ArrowRight size={16} />}>
                  View All
                </Button>
              </Link>
            </div>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <LoadingSkeleton key={i} height="3rem" width="100%" />
                ))}
              </div>
            ) : stats && stats.recentPayments && stats.recentPayments.length > 0 ? (
              <div className="space-y-3">
                {stats.recentPayments.slice(0, 5).map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-slate-100 flex items-center justify-center">
                        <Activity size={20} className="text-teal-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{payment.customerName}</p>
                        <p className="text-sm text-slate-600">Invoice #{payment.invoiceNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        {formatCurrency(payment.amount)}
                      </p>
                      <Badge variant={payment.status === "completed" ? "success" : "default"}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Activity size={48} className="text-slate-400" />}
                title="No payments yet"
                description="Payments will appear here once customers start paying"
              />
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} href={action.href}>
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-all group cursor-pointer">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                          {action.title}
                        </p>
                        <p className="text-sm text-slate-600">{action.description}</p>
                      </div>
                      <ArrowRight size={18} className="text-slate-400 group-hover:text-teal-700 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* AI Insights Card */}
          <Card className="mt-6 bg-gradient-to-br from-teal-50 to-slate-50 border-2 border-teal-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">AI Insights</h3>
                <p className="text-sm text-slate-600">Smart recommendations</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {stats && stats.recentPayments && stats.recentPayments.length > 0
                ? "You have recent payment activity. Consider following up on pending invoices to improve cash flow."
                : "Start by adding customers and creating invoices to see AI-powered insights here."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}