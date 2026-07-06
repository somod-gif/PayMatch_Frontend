"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Save, User, Settings, Webhook, Bell, Shield } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    // Placeholder for API call
    setTimeout(() => {
      setSaving(false);
      addToast({
        type: "success",
        title: "Settings saved",
        message: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Settings
        </h1>
        <p className="text-slate-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-teal-50 text-teal-700 font-medium">
                <User size={18} />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Webhook size={18} />
                <span>Webhooks</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Shield size={18} />
                <span>Security</span>
              </button>
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-100 rounded-lg">
                <User size={24} className="text-teal-700" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Profile Settings</h2>
                <p className="text-sm text-slate-600">Update your business information</p>
              </div>
            </div>
            <div className="space-y-4">
              <Input label="Business Name" placeholder="Your Business Name" />
              <Input label="Email" type="email" placeholder="you@example.com" />
              <Input label="Phone" type="tel" placeholder="+234 123 456 7890" />
              <div className="flex justify-end">
                <Button icon={<Save size={16} />} onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Nomba Integration */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Webhook size={24} className="text-blue-700" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Nomba Integration</h2>
                <p className="text-sm text-slate-600">Configure your Nomba API credentials</p>
              </div>
              <Badge variant="success" className="ml-auto">Connected</Badge>
            </div>
            <div className="space-y-4">
              <Input label="API Key" type="password" placeholder="••••••••••••••••" />
              <Input label="Webhook URL" placeholder="https://yourapp.com/webhook" />
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleSave}>
                  Test Connection
                </Button>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Bell size={24} className="text-amber-700" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
                <p className="text-sm text-slate-600">Manage your notification preferences</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Email Notifications</p>
                  <p className="text-sm text-slate-600">Receive payment alerts via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Payment Reminders</p>
                  <p className="text-sm text-slate-600">Send automatic payment reminders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
