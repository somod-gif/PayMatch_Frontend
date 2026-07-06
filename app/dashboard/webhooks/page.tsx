"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { LoadingSkeleton, TableRowSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { webhooksService } from "@/services";
import { WebhookLog } from "@/types";
import { Webhook, RefreshCw, Activity, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await webhooksService.list();
      if (response.success) {
        setWebhooks(response.data);
      } else {
        setError(response.message || "Failed to load webhook events");
      }
    } catch {
      setError("Unable to connect to the backend. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const processedCount = webhooks.filter(w => w.processed).length;
  const pendingCount = webhooks.length - processedCount;

  const getBadgeVariant = (processed: boolean): "success" | "warning" | "default" => {
    return processed ? "success" : "warning";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Webhooks
          </h1>
          <p className="text-slate-600 mt-1">
            Monitor incoming Nomba webhook events in real time
          </p>
        </div>
        <Button
          variant="outline"
          icon={<RefreshCw size={18} />}
          onClick={fetchWebhooks}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      {!loading && !error && webhooks.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={18} className="text-slate-600" />
              <p className="text-sm text-slate-600">Total Events</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{webhooks.length}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-green-600" />
              <p className="text-sm text-slate-600">Processed</p>
            </div>
            <p className="text-2xl font-bold text-green-700">{processedCount}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-amber-600" />
              <p className="text-sm text-slate-600">Pending</p>
            </div>
            <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-red-600" />
              <p className="text-sm text-slate-600">Failed</p>
            </div>
            <p className="text-2xl font-bold text-red-700">
              {webhooks.filter(w => !w.processed).length}
            </p>
          </Card>
        </div>
      )}

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
            <Button variant="outline" onClick={fetchWebhooks}>
              Try Again
            </Button>
          </div>
        ) : webhooks.length === 0 ? (
          <EmptyState
            icon={<Webhook size={48} className="text-slate-400" />}
            title="No webhook events"
            description="Webhook events will appear here when Nomba sends payment notifications"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableCell header>Event</TableCell>
              <TableCell header>Reference</TableCell>
              <TableCell header>Amount</TableCell>
              <TableCell header>Invoice</TableCell>
              <TableCell header>Processed</TableCell>
              <TableCell header>Date</TableCell>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>
                    <span className="font-medium">{webhook.event}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {webhook.payload?.data?.reference || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">
                      ₦{webhook.payload?.data?.amount || "0"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {webhook.payload?.data?.invoiceNumber || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(webhook.processed)}>
                      {webhook.processed ? "Processed" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {new Date(webhook.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
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
