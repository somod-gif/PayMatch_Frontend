"use client";

import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { DollarSign } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Payments
        </h1>
        <p className="text-slate-600 mt-1">
          View and manage all payment transactions
        </p>
      </div>

      {/* Empty State */}
      <Card>
        <EmptyState
          icon={<DollarSign size={48} className="text-slate-400" />}
          title="No payments yet"
          description="Payments will appear here once customers start paying to their virtual accounts"
        />
      </Card>
    </div>
  );
}