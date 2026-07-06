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
import { customersService } from "@/services";
import { Customer, CreateCustomerPayload, UpdateCustomerPayload } from "@/types";
import { Users, Search, Plus, Mail, Building2, X, Edit2, Trash2, MoreVertical } from "lucide-react";
import { CUSTOMER_STATUS_LABELS } from "@/constants";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
    } catch {
      setError("Unable to connect to the backend. Please check your connection.");
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

  const getBadgeVariant = (status: string): "success" | "warning" | "error" | "default" => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "archived":
        return "error";
      default:
        return "default";
    }
  };

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
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to create customer. Please try again.",
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
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to update customer. Please try again.",
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
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to delete customer. Please try again.",
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Customers
          </h1>
          <p className="text-slate-600 mt-1">
            Manage your customer profiles and virtual accounts
          </p>
        </div>
        <Button icon={<Plus size={18} />} onClick={() => setShowCreateModal(true)}>
          Add Customer
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
            placeholder="Search customers..."
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
                : "Add your first customer to get started"
            }
            actionLabel={search ? undefined : "Add Customer"}
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
          <>
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
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center">
                          <span className="text-sm font-bold text-teal-700">
                            {customer.fullName.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{customer.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        {customer.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-slate-600">
                        {customer.customerReference}
                      </span>
                    </TableCell>
                    <TableCell>
                      {customer.phone || <span className="text-slate-400">-</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(customer.status)}>
                        {CUSTOMER_STATUS_LABELS[customer.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
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
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                <p className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Create Customer Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetCreate();
        }}
        title="Add New Customer"
      >
        <form onSubmit={handleSubmitCreate(onCreateCustomer)} className="space-y-4">
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
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                resetCreate();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create Customer"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCustomer(null);
          resetUpdate();
        }}
        title="Edit Customer"
      >
        <form onSubmit={handleSubmitUpdate(onUpdateCustomer)} className="space-y-4">
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
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedCustomer(null);
                resetUpdate();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updating}>
              {updating ? "Updating..." : "Update Customer"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCustomer(null);
        }}
        title="Delete Customer"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              Are you sure you want to delete <strong>{selectedCustomer?.fullName}</strong>? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedCustomer(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={onDeleteCustomer}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete Customer"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
