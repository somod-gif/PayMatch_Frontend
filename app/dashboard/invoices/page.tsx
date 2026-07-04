"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { LoadingSkeleton, TableRowSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { invoicesService, customersService, virtualAccountsService } from "@/services";
import { Invoice, CreateInvoicePayload, Customer } from "@/types";
import { FileText, Search, Plus, Calendar, User, CreditCard } from "lucide-react";
import { CURRENCY, INVOICE_STATUS_LABELS } from "@/constants";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createInvoiceSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  expectedAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be greater than 0",
  }),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [generatingVA, setGeneratingVA] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createInvoiceSchema),
  });

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoicesService.list();
      if (response.success) {
        setInvoices(response.data);
      } else {
        setError(response.message || "Failed to load invoices");
      }
    } catch {
      setError("Unable to connect to the backend. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await customersService.list();
      if (response.success) {
        setCustomers(response.data);
      }
    } catch {
      // Silently fail - customers may not be loaded yet
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
  }, []);

  const filteredInvoices = invoices.filter(
    (i) =>
      i.description.toLowerCase().includes(search.toLowerCase()) ||
      i.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      (i.customer?.fullName && i.customer.fullName.toLowerCase().includes(search.toLowerCase()))
  );

  const getBadgeVariant = (status: string): "success" | "warning" | "error" | "info" | "default" => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "info";
      case "partial":
        return "warning";
      case "overdue":
        return "error";
      case "cancelled":
        return "error";
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

  const onCreateInvoice = async (data: CreateInvoiceFormValues) => {
    setCreating(true);
    try {
      const payload: CreateInvoicePayload = {
        customerId: data.customerId,
        invoiceNumber: data.invoiceNumber,
        expectedAmount: Number(data.expectedAmount),
        description: data.description,
        dueDate: new Date(data.dueDate).toISOString(),
      };
      const response = await invoicesService.create(payload);
      if (response.success) {
        addToast({
          type: "success",
          title: "Invoice created",
          message: `Invoice ${data.invoiceNumber} has been created.`,
        });
        setShowCreateModal(false);
        reset();
        fetchInvoices();
      } else {
        addToast({
          type: "error",
          title: "Failed to create invoice",
          message: response.message || "An error occurred.",
        });
      }
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to create invoice. Please try again.",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleGenerateVirtualAccount = async (invoice: Invoice) => {
    setGeneratingVA(true);
    try {
      const response = await virtualAccountsService.create({ invoiceId: invoice.id });
      if (response.success) {
        addToast({
          type: "success",
          title: "Virtual account generated",
          message: `Account: ${response.data.nombaAccountNumber} (${response.data.bankName})`,
        });
        fetchInvoices();
      } else {
        addToast({
          type: "error",
          title: "Failed to generate virtual account",
          message: response.message || "An error occurred.",
        });
      }
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to generate virtual account. Please try again.",
      });
    } finally {
      setGeneratingVA(false);
    }
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
        <Button icon={<Plus size={18} />} onClick={() => setShowCreateModal(true)}>
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
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableCell header>Invoice</TableCell>
              <TableCell header>Customer</TableCell>
              <TableCell header>Amount</TableCell>
              <TableCell header>Due Date</TableCell>
              <TableCell header>Virtual Account</TableCell>
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
                        #{invoice.invoiceNumber}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      {invoice.customer?.fullName || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(invoice.expectedAmount)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(invoice.dueDate).toLocaleDateString("en-NG")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {invoice.virtualAccount ? (
                      <div>
                        <p className="font-mono text-sm">
                          {invoice.virtualAccount.nombaAccountNumber}
                        </p>
                        <p className="text-xs text-slate-500">
                          {invoice.virtualAccount.bankName}
                        </p>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        icon={<CreditCard size={14} />}
                        onClick={() => handleGenerateVirtualAccount(invoice)}
                        disabled={generatingVA}
                      >
                        Generate VA
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(invoice.status)}>
                      {INVOICE_STATUS_LABELS[invoice.status] || invoice.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          reset();
        }}
        title="Create New Invoice"
      >
        <form onSubmit={handleSubmit(onCreateInvoice)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Customer
            </label>
            <select
              {...register("customerId")}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            >
              <option value="">Select a customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.fullName} ({c.email})
                </option>
              ))}
            </select>
            {errors.customerId && (
              <p className="text-sm text-red-600 mt-1">{errors.customerId.message}</p>
            )}
          </div>

          <Input
            label="Invoice Number"
            placeholder="INV-001"
            error={errors.invoiceNumber?.message}
            {...register("invoiceNumber")}
          />

          <Input
            label="Amount (NGN)"
            type="number"
            placeholder="50000"
            error={errors.expectedAmount?.message}
            {...register("expectedAmount")}
          />

          <Input
            label="Description"
            placeholder="Payment for services"
            error={errors.description?.message}
            {...register("description")}
          />

          <Input
            label="Due Date"
            type="date"
            error={errors.dueDate?.message}
            {...register("dueDate")}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}