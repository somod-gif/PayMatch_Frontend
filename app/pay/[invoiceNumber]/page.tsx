"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { paymentsService } from "@/services";
import type { PaymentShareResponse } from "@/types";
import { CURRENCY, APP_NAME } from "@/constants";
import { CheckCircle, Copy, Phone, Mail, AlertCircle, Share2, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export default function PayInvoicePage() {
  const params = useParams();
  const invoiceNumber = params.invoiceNumber as string;
  const [data, setData] = useState<PaymentShareResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const { addToast } = useToast();

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
      addToast({
        type: "success",
        title: "Copied!",
        message: "Payment details copied to clipboard",
      });
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsApp = () => {
    if (data?.whatsappUrl) {
      window.open(data.whatsappUrl, "_blank");
    }
  };

  const handleEmail = async () => {
    if (!data?.email) return;
    
    setSendingEmail(true);
    try {
      // Use mailto as fallback since we don't have a dedicated email API
      const subject = encodeURIComponent(`Payment for Invoice ${invoiceNumber}`);
      const body = encodeURIComponent(data.copyText || `Please pay ${CURRENCY.symbol}${Number(data.amount).toLocaleString()} to ${data.bank}, Account: ${data.accountNumber}, Account Name: ${data.accountName}`);
      window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
      addToast({
        type: "success",
        title: "Email client opened",
        message: "Please send the payment details to your customer",
      });
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to open email client",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="p-8 max-w-lg w-full">
          <div className="text-center space-y-4">
            <LoadingSkeleton height="2rem" width="12rem" className="mx-auto" />
            <LoadingSkeleton height="1rem" width="8rem" className="mx-auto" />
            <LoadingSkeleton height="3rem" width="100%" />
            <LoadingSkeleton height="3rem" width="100%" />
            <LoadingSkeleton height="3rem" width="100%" />
          </div>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Payment for Invoice #{invoiceNumber}
          </h1>
          <p className="text-slate-600 text-lg">
            Make a bank transfer to the account below
          </p>
        </div>

        {/* Customer Info */}
        <Card className="p-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-100 to-slate-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-teal-700">
                {data.customer.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">{data.customer}</p>
              <p className="text-sm text-slate-600">{data.email}</p>
            </div>
          </div>
        </Card>

        {/* Amount */}
        <Card className="p-6 mb-4 bg-gradient-to-br from-teal-50 to-slate-50 border-2 border-teal-200">
          <p className="text-sm text-slate-600 mb-1">Amount Due</p>
          <p className="text-4xl font-bold text-slate-900">
            {data.currency === "NGN" ? "₦" : data.currency}{" "}
            {Number(data.amount).toLocaleString()}
          </p>
        </Card>

        {/* Bank Transfer Details */}
        <Card className="p-6 mb-4">
          <h2 className="font-semibold text-slate-900 mb-4 text-lg">
            Bank Transfer Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm text-slate-600">Bank</span>
              <span className="font-medium text-slate-900">{data.bank}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="text-sm text-slate-600">Account Number</span>
              <span className="font-mono font-bold text-lg text-slate-900">
                {data.accountNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
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

        {/* Share Actions */}
        <Card className="p-6 mb-8">
          <h2 className="font-semibold text-slate-900 mb-4 text-lg">
            Share Payment Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              icon={<Share2 size={18} />}
              onClick={handleCopy}
              className="w-full"
            >
              Copy Link
            </Button>
            <Button
              variant="outline"
              icon={<Phone size={18} />}
              onClick={handleWhatsApp}
              className="w-full"
            >
              WhatsApp
            </Button>
            <Button
              variant="outline"
              icon={<Send size={18} />}
              onClick={handleEmail}
              disabled={sendingEmail}
              className="w-full"
            >
              {sendingEmail ? "Sending..." : "Send Email"}
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500">
          Powered by {APP_NAME} &bull; Automatic Payment Reconciliation
        </p>
      </div>
    </div>
  );
}