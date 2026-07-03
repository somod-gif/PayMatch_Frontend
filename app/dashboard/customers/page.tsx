"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { LoadingSkeleton, TableRowSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { customersService } from "@/services";
import { Customer } from "@/types";
import { Users, Search, Plus, Mail, Building2 } from "lucide-react";
import { CUSTOMER_STATUS_LABELS } from "@/constants";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customersService.list();
      if (response.success) {
        setCustomers(response.data);
      } else {
        setError(response.error || "Failed to load customers");
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
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
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
        <Button icon={<Plus size={18} />}>
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
          />
        ) : (
          <Table>
            <TableHeader>
              <TableCell header>Name</TableCell>
              <TableCell header>Email</TableCell>
              <TableCell header>Company</TableCell>
              <TableCell header>Virtual Account</TableCell>
              <TableCell header>Total Invoices</TableCell>
              <TableCell header>Status</TableCell>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-teal-700">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.company ? (
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-slate-400" />
                        {customer.company}
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {customer.virtualAccountNumber ? (
                      <div>
                        <p className="font-mono text-sm">
                          {customer.virtualAccountNumber}
                        </p>
                        <p className="text-xs text-slate-500">
                          {customer.virtualAccountBank}
                        </p>
                      </div>
                    ) : (
                      <span className="text-slate-400">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{customer.totalInvoices}</span>
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
    </div>
  );
}