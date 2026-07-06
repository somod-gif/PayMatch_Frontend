"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { LoadingSkeleton, TableRowSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { paymentsService } from "@/services";
import { Payment } from "@/types";
import { DollarSign, RefreshCw, ExternalLink, Share2, Mail, TrendingUp, Filter } from "lucide-react";
import { CURRENCY, PAYMENT_STATUS_LABELS } from "@/constants";
import { useToast } from "@/components/ui/Toast";

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
    } catch {
      setError("Unable to connect to the backend. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [statusFilter]);

  const filteredPayments = statusFilter === "all" ? payments : payments.filter(p => p.status === statusFilter);

  const getBadgeVariant = (status: string): "success" | "warning" | "error" | "info" | "default" => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      case "refunded":
        return "info";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === "string" ? Number(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: CURRENCY.code,
      minimumFractionDigits: 0,
    }).format(numAmount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Payments
          </h1>
          <p className="text-slate-600 mt-1">
            View and manage all payment transactions
          </p>
        </div>
        <Button
          variant="outline"
          icon={<RefreshCw size={18} />}
          onClick={fetchPayments}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      {!loading && !error && payments.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Total Payments</p>
            <p className="text-2xl font-bold text-slate-900">{payments.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-700">
              {payments.filter(p => p.status === "completed").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-700">
              {payments.filter(p => p.status === "pending").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-teal-700">
              {formatCurrency(payments.reduce((sum, p) => sum + Number(p.amount), 0))}
            </p>
          </Card>
        </div>
      )}

      {/* Filters */}
      {!loading && !error && payments.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Filter by status:</span>
            <div className="flex gap-2 flex-wrap">
              {["all", "completed", "pending", "failed", "refunded"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Content */}
      <Card>
        {loading ? (
          <div className="space-y-4">
            <LoadingSkeleton height="2rem" width="100%" />
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
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
                : "Try adjusting your filter"
            }
            actionLabel={statusFilter === "all" ? undefined : "Clear Filter"}
            onAction={() => setStatusFilter("all")}
          />
        ) : (
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
                    <span className="font-mono text-sm">
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
                    <span className="capitalize">{payment.paymentMethod}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(payment.status)}>
                      {PAYMENT_STATUS_LABELS[payment.status] || payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {new Date(payment.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
