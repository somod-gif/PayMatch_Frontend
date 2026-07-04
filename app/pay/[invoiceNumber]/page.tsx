"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { paymentsService } from "@/services";
import type { PaymentShareResponse } from "@/types";
import { CURRENCY, APP_NAME } from "@/constants";
import { CheckCircle, Copy, Phone, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PayInvoicePage() {
  const params = useParams();
  const invoiceNumber = params.invoiceNumber as string;
  const [data, setData] = useState<PaymentShareResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await paymentsService.getPaymentShare(invoiceNumber);
        if (response.success) {
          setData(response);
        } else {
          setError("Failed to load payment information");
        }
      } catch {
        setError("Unable to load payment information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (invoiceNumber) {
      fetchPaymentInfo();
    }
  }, [invoiceNumber]);

  const handleCopy = () => {
    if (data?.copyText) {
      navigator.clipboard.writeText(data.copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsApp = () => {
    if (data?.whatsappUrl) {
      window.open(data.whatsappUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-lg w-full">
          <div className="text-center space-y-4">
            <LoadingSkeleton height="2rem" width="12rem" className="mx-auto" />
            <LoadingSkeleton height="1rem" width="8rem" className="mx-auto" />
            <LoadingSkeleton height="3rem" width="100%" />
            <LoadingSkeleton height="3rem" width="100%" />
          </div>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-lg w-full text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Payment Information Unavailable
          </h1>
          <p className="text-slate-600 mb-6">{error || "Invoice not found"}</p>
          <Link href="/">
            <Button variant="outline">Go to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 relative">
              <Image
                src="/images/logo.png"
                alt={APP_NAME}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-2xl text-teal-700">{APP_NAME}</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">
            Payment for Invoice #{invoiceNumber}
          </h1>
          <p className="text-slate-600 mt-1">
            Make a bank transfer to the account below
          </p>
        </div>

        {/* Customer Info */}
        <Card className="p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-xl font-bold text-teal-700">
                {data.customer.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">{data.customer}</p>
              <p className="text-sm text-slate-600">{data.email}</p>
            </div>
          </div>
        </Card>

        {/* Amount */}
        <Card className="p-6 mb-4">
          <p className="text-sm text-slate-500 mb-1">Amount Due</p>
          <p className="text-3xl font-bold text-slate-900">
            {data.currency === "NGN" ? "₦" : data.currency}{" "}
            {Number(data.amount).toLocaleString()}
          </p>
        </Card>

        {/* Bank Transfer Details */}
        <Card className="p-6 mb-4">
          <h2 className="font-semibold text-slate-900 mb-4">
            Bank Transfer Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Bank</span>
              <span className="font-medium text-slate-900">{data.bank}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Account Number</span>
              <span className="font-mono font-bold text-lg text-slate-900">
                {data.accountNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Account Name</span>
              <span className="font-medium text-slate-900">{data.accountName}</span>
            </div>
          </div>

          <Button
            className="w-full mt-4"
            variant="primary"
            icon={copied ? <CheckCircle size={18} /> : <Copy size={18} />}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy Account Details"}
          </Button>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button
            variant="outline"
            icon={<Phone size={18} />}
            onClick={handleWhatsApp}
          >
            Share via WhatsApp
          </Button>
          <Button
            variant="outline"
            icon={<Mail size={18} />}
            onClick={() => {
              if (data?.email) {
                window.location.href = `mailto:${data.email}?subject=Payment%20for%20Invoice%20${invoiceNumber}`;
              }
            }}
          >
            Send via Email
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400">
          Powered by {APP_NAME} &bull; Automatic Payment Reconciliation
        </p>
      </div>
    </div>
  );
}