"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Settings
        </h1>
        <p className="text-slate-600 mt-1">
          Configure your account and preferences
        </p>
      </div>

      {/* Settings Form */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Profile Settings
          </h2>
          <div className="space-y-4">
            <Input label="Business Name" placeholder="Your Business Name" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="Phone" type="tel" placeholder="+234 123 456 7890" />
            <Button className="w-full" icon={<Save size={16} />}>
              Save Changes
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Nomba Integration
          </h2>
          <div className="space-y-4">
            <Input label="API Key" type="password" placeholder="••••••••••••••••" />
            <Input label="Webhook URL" placeholder="https://yourapp.com/webhook" />
            <Button variant="outline" className="w-full">
              Test Connection
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}