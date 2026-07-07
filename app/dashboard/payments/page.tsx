"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { paymentsService } from "@/services";
import type { Payment } from "@/types";
import { DollarSign, RefreshCw, Filter, ArrowRight, AlertCircle, CheckCircle2, Clock, XCircle, RotateCcw } from "lucide-react";
import { CURRENCY } from "@/constants";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getErrorMessage } from "@/lib/api";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { addToast } = useToast();

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentsService.list({ status: statusFilter === "all" ? undefined : statusFilter });
      if (response.success) {
        setPayments(response.data);
      } else {
        setError(response.message || "Failed to load payments");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const filteredPayments = statusFilter === "all" ? payments : payments.filter(p => p.status === statusFilter);

  const statusCounts = {
    all: payments.length,
    completed: payments.filter(p => p.status === "completed").length,
    pending: payments.filter(p => p.status === "pending").length,
    failed: payments.filter(p => p.status === "failed").length,
    refunded: payments.filter(p => p.status === "refunded").length,
  };

  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  const filterTabs = [
    { key: "all", label: "All", count: statusCounts.all },
    { key: "completed", label: "Completed", count: statusCounts.completed, icon: CheckCircle2, color: "text-emerald-600" },
    { key: "pending", label: "Pending", count: statusCounts.pending, icon: Clock, color: "text-amber-600" },
    { key: "failed", label: "Failed", count: statusCounts.failed, icon: XCircle, color: "text-red-600" },
    { key: "refunded", label: "Refunded", count: statusCounts.refunded, icon: RotateCcw, color: "text-blue-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Payments</h1>
            {!loading && !error && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                {payments.length} total
              </span>
            )}
          </div>
          <p className="text-slate-500">View and manage all payment transactions</p>
        </div>
        <Button
          variant="outline"
          icon={<RefreshCw size={16} />}
          onClick={fetchPayments}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      {!loading && !error && payments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-slate-500 font-medium mb-1">Total Payments</p>
              <p className="text-2xl font-bold text-slate-900">{payments.length}</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-emerald-600 font-medium mb-1">Completed</p>
              <p className="text-2xl font-bold text-emerald-700">{statusCounts.completed}</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-amber-600 font-medium mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-700">{statusCounts.pending}</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="p-3">
              <p className="text-xs text-teal-600 font-medium mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-teal-700">{formatCurrency(totalRevenue)}</p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Filter Tabs */}
      {!loading && !error && payments.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === tab.key
                    ? "bg-teal-700 text-white shadow-lg shadow-teal-700/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {Icon && <Icon size={16} className={statusFilter === tab.key ? "text-white" : tab.color} />}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-xs ${
                  statusFilter === tab.key ? "bg-teal-600" : "bg-slate-100"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      <Card padding="none">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={5} columns={5} />
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load payments</h3>
            <p className="text-slate-500 mb-6">{error}</p>
            <Button variant="outline" onClick={fetchPayments}>
              Try Again
            </Button>
          </div>
        ) : filteredPayments.length === 0 ? (
          <EmptyState
            icon={<DollarSign size={48} className="text-slate-400" />}
            title={statusFilter === "all" ? "No payments yet" : `No ${statusFilter} payments`}
            description={
              statusFilter === "all"
                ? "Payments will appear here once customers start paying to their virtual accounts"
                : "Try adjusting your filter to see more payments"
            }
            actionLabel={statusFilter !== "all" ? "Clear Filter" : undefined}
            onAction={() => setStatusFilter("all")}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableCell header>Reference</TableCell>
                <TableCell header>Amount</TableCell>
                <TableCell header>Method</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Date</TableCell>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <span className="font-mono text-sm font-medium text-slate-900">
                        {payment.merchantTxRef}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-xs text-slate-500">{payment.currency}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-sm">{payment.paymentMethod}</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">
                        {formatDate(payment.createdAt)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </motion.div>
  );
}