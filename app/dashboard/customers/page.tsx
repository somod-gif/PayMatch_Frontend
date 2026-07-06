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
import { Customer, CreateCustomerPayload } from "@/types";
import { Users, Search, Plus, Mail, Building2, X } from "lucide-react";
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerFormValues>({
    resolver: zodResolver(createCustomerSchema),
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
        reset();
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
          <Table>
            <TableHeader>
              <TableCell header>Name</TableCell>
              <TableCell header>Email</TableCell>
              <TableCell header>Reference</TableCell>
              <TableCell header>Phone</TableCell>
              <TableCell header>Status</TableCell>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-teal-700">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create Customer Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          reset();
        }}
        title="Add New Customer"
      >
        <form onSubmit={handleSubmit(onCreateCustomer)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Phone (optional)"
            placeholder="+2348012345678"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Customer Reference (optional)"
            placeholder="CUST-001"
            error={errors.customerReference?.message}
            {...register("customerReference")}
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
              {creating ? "Creating..." : "Create Customer"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}