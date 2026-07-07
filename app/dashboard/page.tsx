"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { StatsCardSkeleton, CardSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Activity,
  Zap,
  UserPlus,
  Receipt,
  CreditCard,
  AlertCircle,
  BarChart3,
  Clock,
  CheckCircle2,
  Wallet,
  TrendingDown,
} from "lucide-react";
import { dashboardService } from "@/services";
import type { DashboardStats } from "@/types";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
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
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(
        axiosError?.response?.data?.message ||
          "Unable to connect to the backend. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const totalRevenue = stats?.metrics?.totalRevenue ?? "0";
  const totalCustomers = stats?.metrics?.totalCustomers ?? 0;
  const totalInvoices = stats?.metrics?.totalInvoices ?? 0;
  const paidInvoices = stats?.metrics?.paidInvoices ?? 0;
  const pendingInvoices = stats?.metrics?.pendingInvoices ?? 0;
  const outstandingBalance = Number(totalRevenue) - (paidInvoices * Number(totalRevenue) / (totalInvoices || 1));

  const statItems = [
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-700",
      href: "/dashboard/payments",
      prefix: "₦",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      label: "Active Invoices",
      value: totalInvoices,
      icon: FileText,
      gradient: "from-blue-500 to-cyan-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-700",
      href: "/dashboard/invoices",
      subtitle: `${paidInvoices} paid, ${pendingInvoices} pending`,
    },
    {
      label: "Total Customers",
      value: totalCustomers,
      icon: Users,
      gradient: "from-purple-500 to-pink-600",
      bgLight: "bg-purple-50",
      textColor: "text-purple-700",
      href: "/dashboard/customers",
      subtitle: "Active accounts",
    },
    {
      label: "Paid Invoices",
      value: paidInvoices,
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-700",
      href: "/dashboard/invoices",
      subtitle: `${totalInvoices > 0 ? Math.round((paidInvoices / totalInvoices) * 100) : 0}% collection rate`,
    },
  ];

  const quickActions = [
    {
      title: "Add Customer",
      description: "Create a new customer profile",
      icon: UserPlus,
      href: "/dashboard/customers",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      title: "Create Invoice",
      description: "Generate a new invoice with VA",
      icon: Receipt,
      href: "/dashboard/invoices",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "View Payments",
      description: "Check recent transactions",
      icon: CreditCard,
      href: "/dashboard/payments",
      gradient: "from-emerald-500 to-green-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Dashboard
            </h1>
            {!loading && !error && (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                Live
              </span>
            )}
          </div>
          <p className="text-slate-500">
            Your payment reconciliation overview
          </p>
        </div>
        <Button
          variant="outline"
          icon={<RefreshCw size={16} />}
          onClick={fetchStats}
          disabled={loading}
          className="shrink-0"
        >
          Refresh
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="col-span-4 p-6 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertCircle size={24} className="text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Failed to load dashboard</h3>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                <Button variant="outline" onClick={fetchStats}>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statItems.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.label} href={stat.href}>
                  <Card hover padding="sm" className="group h-full">
                    <div className="p-3 md:p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-2.5 rounded-xl ${stat.bgLight} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={20} className={stat.textColor} />
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-slate-300 group-hover:text-teal-600 transition-colors"
                        />
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-sm font-medium text-slate-500 mb-0.5">
                        {stat.label}
                      </p>
                      {"subtitle" in stat && stat.subtitle && (
                        <p className="text-xs text-slate-400">{stat.subtitle}</p>
                      )}
                      {"trend" in stat && stat.trend && (
                        <div className="flex items-center gap-1 mt-1">
                          {stat.trendUp ? (
                            <TrendingUp size={12} className="text-emerald-500" />
                          ) : (
                            <TrendingDown size={12} className="text-red-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              stat.trendUp ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {stat.trend}
                          </span>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity & Payments */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <Activity size={18} className="text-teal-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Recent Payments</h2>
                  <p className="text-sm text-slate-500">Latest payment transactions</p>
                </div>
              </div>
              <Link href="/dashboard/payments">
                <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
                  View All
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100">
                    <div className="skeleton-shimmer w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton-shimmer h-4 w-32 rounded" />
                      <div className="skeleton-shimmer h-3 w-24 rounded" />
                    </div>
                    <div className="text-right space-y-2">
                      <div className="skeleton-shimmer h-4 w-20 rounded ml-auto" />
                      <div className="skeleton-shimmer h-5 w-16 rounded ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            ) : stats && stats.recentPayments && stats.recentPayments.length > 0 ? (
              <div className="space-y-2">
                {stats.recentPayments.slice(0, 5).map((payment, idx) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shrink-0">
                        {payment.status === "completed" ? (
                          <CheckCircle2 size={20} className="text-emerald-600" />
                        ) : (
                          <Clock size={20} className="text-amber-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {payment.customerName}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          Invoice #{payment.invoiceNumber} &middot;{" "}
                          {formatRelativeTime(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="font-bold text-slate-900">
                        {formatCurrency(payment.amount)}
                      </p>
                      <StatusBadge status={payment.status} />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Activity size={40} className="text-slate-400" />}
                title="No payments yet"
                description="Payments will appear here once customers start paying to their virtual accounts"
                actionLabel="View Invoices"
                onAction={() => window.location.href = "/dashboard/invoices"}
              />
            )}
          </Card>

          {/* Payment Timeline / Stats Mini Chart */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 size={18} className="text-blue-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Payment Overview</h2>
                  <p className="text-sm text-slate-500">Collection metrics at a glance</p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="skeleton-shimmer h-20 rounded-xl" />
                ))}
              </div>
            ) : stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs text-emerald-700 font-medium mb-1">Paid</p>
                  <p className="text-2xl font-bold text-emerald-700">{paidInvoices}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-4 border border-amber-100">
                  <p className="text-xs text-amber-700 font-medium mb-1">Pending</p>
                  <p className="text-2xl font-bold text-amber-700">{pendingInvoices}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium mb-1">Partial</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {stats?.metrics?.partialPayments ?? 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-100">
                  <p className="text-xs text-purple-700 font-medium mb-1">Outstanding</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {formatCurrency(outstandingBalance)}
                  </p>
                </div>
              </div>
            ) : null}
          </Card>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-50 rounded-lg">
                <Zap size={18} className="text-teal-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
                <p className="text-sm text-slate-500">Get started fast</p>
              </div>
            </div>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} href={action.href}>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition-all group cursor-pointer">
                      <div
                        className={`p-2.5 rounded-lg bg-gradient-to-br ${action.gradient} group-hover:scale-110 transition-transform shrink-0`}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors text-sm">
                          {action.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{action.description}</p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-slate-300 group-hover:text-teal-600 transition-colors shrink-0"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* AI Insights Card */}
          <Card glow className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 border-2 border-teal-200/50">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl shadow-lg shadow-teal-700/20">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">AI Insights</h3>
                <p className="text-sm text-slate-500">Smart recommendations</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/80 rounded-xl border border-teal-100">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {stats && stats.recentPayments && stats.recentPayments.length > 0
                      ? "You have recent payment activity. Consider following up on pending invoices to improve cash flow."
                      : "Start by adding customers and creating invoices to see AI-powered insights here."}
                  </p>
                </div>
              </div>
              {stats && stats.metrics && (
                <div className="p-3 bg-white/80 rounded-xl border border-teal-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Collection Rate</span>
                    <span className="text-sm font-bold text-teal-700">
                      {totalInvoices > 0 ? Math.round((paidInvoices / totalInvoices) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Recent Invoices Summary */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Receipt size={18} className="text-slate-700" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Quick Stats</h2>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <span className="text-sm text-slate-600">Total Revenue</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(totalRevenue)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <span className="text-sm text-slate-600">Customers</span>
                <span className="font-bold text-slate-900">{totalCustomers}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <span className="text-sm text-slate-600">Invoices</span>
                <span className="font-bold text-slate-900">{totalInvoices}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <span className="text-sm text-slate-600">Payment Rate</span>
                <span className="font-bold text-emerald-700">
                  {totalInvoices > 0
                    ? Math.round((paidInvoices / totalInvoices) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}