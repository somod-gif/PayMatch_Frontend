"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { LoadingSkeleton, TableRowSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { invoicesService } from "@/services";
import { Invoice } from "@/types";
import { FileText, Search, Plus, Calendar, User } from "lucide-react";
import { CURRENCY, INVOICE_STATUS_LABELS } from "@/constants";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoicesService.list();
      if (response.success) {
        setInvoices(response.data);
      } else {
        setError(response.error || "Failed to load invoices");
      }
    } catch {
      setError("Unable to connect to the backend. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter(
    (i) =>
      i.description.toLowerCase().includes(search.toLowerCase()) ||
      i.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeVariant = (status: string): "success" | "warning" | "error" | "info" | "default" => {
    switch (status) {
      case "paid":
        return "success";
      case "sent":
        return "info";
      case "partial":
        return "warning";
      case "overdue":
        return "error";
      case "draft":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: CURRENCY.code,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Invoices
          </h1>
          <p className="text-slate-600 mt-1">
            Track and manage all your invoices
          </p>
        </div>
        <Button icon={<Plus size={18} />}>
          Create Invoice
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            type="search"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
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
            <Button variant="outline" onClick={fetchInvoices}>
              Try Again
            </Button>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <EmptyState
            icon={<FileText size={48} className="text-slate-400" />}
            title={search ? "No invoices found" : "No invoices yet"}
            description={
              search
                ? "Try adjusting your search query"
                : "Create your first invoice to get started"
            }
            actionLabel={search ? undefined : "Create Invoice"}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableCell header>Invoice</TableCell>
              <TableCell header>Customer</TableCell>
              <TableCell header>Amount</TableCell>
              <TableCell header>Due Date</TableCell>
              <TableCell header>Status</TableCell>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900">
                        {invoice.description}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        #{invoice.id.slice(0, 8)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      {invoice.customerName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                      {invoice.amountOutstanding > 0 && (
                        <p className="text-xs text-slate-500">
                          {formatCurrency(invoice.amountOutstanding)} outstanding
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(invoice.dueDate).toLocaleDateString("en-NG")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(invoice.status)}>
                      {INVOICE_STATUS_LABELS[invoice.status]}
                    </Badge>
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