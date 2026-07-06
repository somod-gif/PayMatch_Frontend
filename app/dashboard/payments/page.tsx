"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { LoadingSkeleton, TableRowSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { paymentsService } from "@/services";
import { Payment } from "@/types";
import { DollarSign, RefreshCw, ExternalLink, Share2, Mail } from "lucide-react";
import { CURRENCY, PAYMENT_STATUS_LABELS } from "@/constants";
import { useToast } from "@/components/ui/Toast";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentsService.list();
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
  }, []);

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
        ) : payments.length === 0 ? (
          <EmptyState
            icon={<DollarSign size={48} className="text-slate-400" />}
            title="No payments yet"
            description="Payments will appear here once customers start paying to their virtual accounts"
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
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {payment.merchantTxRef}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-slate-900">
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="text-xs text-slate-500">{payment.currency}</p>
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