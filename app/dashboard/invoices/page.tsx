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
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { invoicesService, customersService, virtualAccountsService } from "@/services";
import type { Invoice, CreateInvoicePayload, Customer } from "@/types";
import { FileText, Search, Plus, Calendar, User, CreditCard, ExternalLink, AlertCircle, RefreshCw } from "lucide-react";
import { CURRENCY } from "@/constants";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getErrorMessage } from "@/lib/api";

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
    } catch (err) {
      setError(getErrorMessage(err) || "Unable to connect to the backend. Please check your connection.");
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
      // Silently fail
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
          message: `Invoice ${data.invoiceNumber} has been created successfully.`,
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
    } catch (err) {
      addToast({
        type: "error",
        title: "Error",
        message: getErrorMessage(err),
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
          message: `${response.data.bankName}: ${response.data.nombaAccountNumber}`,
        });
        fetchInvoices();
      } else {
        addToast({
          type: "error",
          title: "Failed to generate virtual account",
          message: response.message || "An error occurred.",
        });
      }
    } catch (err) {
      // Show the EXACT backend error message
      addToast({
        type: "error",
        title: "Virtual account generation failed",
        message: getErrorMessage(err),
      });
    } finally {
      setGeneratingVA(false);
    }
  };

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
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Invoices</h1>
            {!loading && !error && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                {invoices.length} total
              </span>
            )}
          </div>
          <p className="text-slate-500">Track and manage all your invoices with virtual accounts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={fetchInvoices}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button icon={<Plus size={18} />} onClick={() => setShowCreateModal(true)}>
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search invoices by number, customer, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <Card padding="none">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={5} columns={6} />
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load invoices</h3>
            <p className="text-slate-500 mb-6">{error}</p>
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
                : "Create your first invoice to start accepting payments with virtual accounts"
            }
            actionLabel={search ? undefined : "Create Invoice"}
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
          <div className="overflow-x-auto">
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
                      <Link
                        href={`/dashboard/invoices/${invoice.id}`}
                        className="group flex items-center gap-2"
                      >
                        <div>
                          <p className="font-medium text-slate-900 group-hover:text-teal-700 transition-colors">
                            {invoice.description}
                          </p>
                          <p className="text-xs text-slate-500 font-mono">
                            #{invoice.invoiceNumber}
                          </p>
                        </div>
                        <ExternalLink size={14} className="text-slate-300 group-hover:text-teal-600 transition-colors shrink-0" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-teal-700">
                            {invoice.customer?.fullName?.charAt(0) || "?"}
                          </span>
                        </div>
                        <span className="text-sm">{invoice.customer?.fullName || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(invoice.expectedAmount)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {formatDate(invoice.dueDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {invoice.virtualAccount ? (
                        <div>
                          <p className="font-mono text-sm font-medium text-slate-900">
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
                          loading={generatingVA}
                        >
                          Generate VA
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
        <form onSubmit={handleSubmit(onCreateInvoice)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Customer</label>
            <select
              {...register("customerId")}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-shadow"
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
            label={`Amount (${CURRENCY.code})`}
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
            <Button type="button" variant="outline" onClick={() => { setShowCreateModal(false); reset(); }}>
              Cancel
            </Button>
            <Button type="submit" loading={creating}>
              {creating ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}