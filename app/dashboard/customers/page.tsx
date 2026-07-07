"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { customersService } from "@/services";
import type { Customer, CreateCustomerPayload, UpdateCustomerPayload } from "@/types";
import { Users, Search, Plus, Mail, Edit2, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getInitials } from "@/lib/utils";
import { getErrorMessage } from "@/lib/api";

const createCustomerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  customerReference: z.string().optional(),
});

type CreateCustomerFormValues = z.infer<typeof createCustomerSchema>;

const updateCustomerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  customerReference: z.string().optional(),
});

type UpdateCustomerFormValues = z.infer<typeof updateCustomerSchema>;

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { addToast } = useToast();

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate },
  } = useForm<CreateCustomerFormValues>({
    resolver: zodResolver(createCustomerSchema),
  });

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: errorsUpdate },
  } = useForm<UpdateCustomerFormValues>({
    resolver: zodResolver(updateCustomerSchema),
  });

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customersService.list();
      if (response.success) {
        setCustomers(response.data);
      } else {
        setError(response.message || "Failed to load customers");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.customerReference && c.customerReference.toLowerCase().includes(search.toLowerCase()))
  );

  const onCreateCustomer = async (data: CreateCustomerFormValues) => {
    setCreating(true);
    try {
      const payload: CreateCustomerPayload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        customerReference: data.customerReference || undefined,
      };
      const response = await customersService.create(payload);
      if (response.success) {
        addToast({
          type: "success",
          title: "Customer created",
          message: `${data.fullName} has been added successfully.`,
        });
        setShowCreateModal(false);
        resetCreate();
        fetchCustomers();
      } else {
        addToast({
          type: "error",
          title: "Failed to create customer",
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

  const onUpdateCustomer = async (data: UpdateCustomerFormValues) => {
    if (!selectedCustomer) return;
    setUpdating(true);
    try {
      const payload: UpdateCustomerPayload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        customerReference: data.customerReference || undefined,
      };
      const response = await customersService.update(selectedCustomer.id, payload);
      if (response.success) {
        addToast({
          type: "success",
          title: "Customer updated",
          message: `${data.fullName} has been updated successfully.`,
        });
        setShowEditModal(false);
        setSelectedCustomer(null);
        resetUpdate();
        fetchCustomers();
      } else {
        addToast({
          type: "error",
          title: "Failed to update customer",
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
      setUpdating(false);
    }
  };

  const onDeleteCustomer = async () => {
    if (!selectedCustomer) return;
    setDeleting(true);
    try {
      const response = await customersService.delete(selectedCustomer.id);
      if (response.success) {
        addToast({
          type: "success",
          title: "Customer deleted",
          message: `${selectedCustomer.fullName} has been deleted.`,
        });
        setShowDeleteModal(false);
        setSelectedCustomer(null);
        fetchCustomers();
      } else {
        addToast({
          type: "error",
          title: "Failed to delete customer",
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
      setDeleting(false);
    }
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    resetUpdate({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone || "",
      customerReference: customer.customerReference || "",
    });
    setShowEditModal(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
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
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Customers</h1>
            {!loading && !error && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                {customers.length} total
              </span>
            )}
          </div>
          <p className="text-slate-500">Manage your customer profiles and virtual accounts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={fetchCustomers}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button icon={<Plus size={18} />} onClick={() => setShowCreateModal(true)}>
            Add Customer
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search customers by name, email, or reference..."
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
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load customers</h3>
            <p className="text-slate-500 mb-6">{error}</p>
            <Button variant="outline" onClick={fetchCustomers}>
              Try Again
            </Button>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <EmptyState
            icon={<Users size={48} className="text-slate-400" />}
            title={search ? "No customers found" : "No customers yet"}
            description={
              search
                ? "Try adjusting your search query"
                : "Add your first customer to start creating invoices"
            }
            actionLabel={search ? undefined : "Add Customer"}
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableCell header>Name</TableCell>
                <TableCell header>Email</TableCell>
                <TableCell header>Reference</TableCell>
                <TableCell header>Phone</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header className="text-right">Actions</TableCell>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-emerald-50 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-teal-700">
                            {getInitials(customer.fullName)}
                          </span>
                        </div>
                        <span className="font-medium text-slate-900">{customer.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-slate-400 shrink-0" />
                        <span className="text-slate-600">{customer.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-slate-600">
                        {customer.customerReference || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">
                        {customer.phone || <span className="text-slate-300">-</span>}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={customer.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit2 size={16} />}
                          onClick={() => handleEdit(customer)}
                          title="Edit customer"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 size={16} />}
                          onClick={() => handleDelete(customer)}
                          title="Delete customer"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Create Customer Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); resetCreate(); }}
        title="Add New Customer"
      >
        <form onSubmit={handleSubmitCreate(onCreateCustomer)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errorsCreate.fullName?.message}
            {...registerCreate("fullName")}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errorsCreate.email?.message}
            {...registerCreate("email")}
          />
          <Input
            label="Phone (optional)"
            placeholder="+2348012345678"
            error={errorsCreate.phone?.message}
            {...registerCreate("phone")}
          />
          <Input
            label="Customer Reference (optional)"
            placeholder="CUST-001"
            error={errorsCreate.customerReference?.message}
            {...registerCreate("customerReference")}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => { setShowCreateModal(false); resetCreate(); }}>
              Cancel
            </Button>
            <Button type="submit" loading={creating}>
              {creating ? "Creating..." : "Create Customer"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setSelectedCustomer(null); resetUpdate(); }}
        title="Edit Customer"
      >
        <form onSubmit={handleSubmitUpdate(onUpdateCustomer)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errorsUpdate.fullName?.message}
            {...registerUpdate("fullName")}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errorsUpdate.email?.message}
            {...registerUpdate("email")}
          />
          <Input
            label="Phone (optional)"
            placeholder="+2348012345678"
            error={errorsUpdate.phone?.message}
            {...registerUpdate("phone")}
          />
          <Input
            label="Customer Reference (optional)"
            placeholder="CUST-001"
            error={errorsUpdate.customerReference?.message}
            {...registerUpdate("customerReference")}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => { setShowEditModal(false); setSelectedCustomer(null); resetUpdate(); }}>
              Cancel
            </Button>
            <Button type="submit" loading={updating}>
              {updating ? "Updating..." : "Update Customer"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setSelectedCustomer(null); }}
        title="Delete Customer"
      >
        <div className="space-y-5">
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">
                Are you sure you want to delete <strong>{selectedCustomer?.fullName}</strong>? This action cannot be undone and will remove all associated data.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => { setShowDeleteModal(false); setSelectedCustomer(null); }}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={onDeleteCustomer}
              loading={deleting}
            >
              {deleting ? "Deleting..." : "Delete Customer"}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}