"use client";

import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Webhook } from "lucide-react";

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Webhooks
        </h1>
        <p className="text-slate-600 mt-1">
          Monitor incoming Nomba webhook events in real time
        </p>
      </div>

      {/* Empty State */}
      <Card>
        <EmptyState
          icon={<Webhook size={48} className="text-slate-400" />}
          title="No webhook events"
          description="Webhook events will appear here when Nomba sends payment notifications"
        />
      </Card>
    </div>
  );
}