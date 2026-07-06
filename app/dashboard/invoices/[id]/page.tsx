"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { invoicesService, virtualAccountsService, paymentsService } from "@/services";
import { Invoice, VirtualAccount } from "@/types";
import { CURRENCY, INVOICE_STATUS_LABELS } from "@/constants";
import { 
  FileText, 
  Calendar, 
  User, 
  DollarSign, 
  CreditCard,
  Share2,
  Copy,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Mail,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingVA, setGeneratingVA] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState<any>(null);
  const [loadingShare, setLoadingShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const fetchInvoice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoicesService.getById(invoiceId);
      if (response.success) {
        setInvoice(response.data);
      } else {
        setError(response.message || "Failed to load invoice");
      }
    } catch {
      setError("Unable to connect to the backend. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  const handleGenerateVirtualAccount = async () => {
    if (!invoice) return;
    setGeneratingVA(true);
    try {
      const response = await virtualAccountsService.create({ invoiceId: invoice.id });
      if (response.success) {
        addToast({
          type: "success",
          title: "Virtual account generated",
          message: `Account: ${response.data.nombaAccountNumber} (${response.data.bankName})`,
        });
        fetchInvoice();
      } else {
        addToast({
          type: "error",
          title: "Failed to generate virtual account",
          message: response.message || "An error occurred.",
        });
      }
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to generate virtual account. Please try again.",
      });
    } finally {
      setGeneratingVA(false);
    }
  };

  const handleShare = async () => {
    if (!invoice) return;
    setLoadingShare(true);
    try {
      const response = await paymentsService.getPaymentShare(invoice.invoiceNumber);
      if (response && response.success) {
        setShareData(response);
        setShowShareModal(true);
      } else {
        addToast({
          type: "error",
          title: "Failed to load share data",
          message: "An error occurred.",
        });
      }
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to load sharing options. Please try again.",
      });
    } finally {
      setLoadingShare(false);
    }
  };

  const handleCopy = () => {
    if (shareData?.copyText) {
      navigator.clipboard.writeText(shareData.copyText);
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
    if (shareData?.whatsappUrl) {
      window.open(shareData.whatsappUrl, "_blank");
    }
  };

  const handleEmail = async () => {
    if (!invoice) return;
    try {
      const response = await paymentsService.sendPaymentEmail(invoice.invoiceNumber, invoice.customer.email);
      if (response.success) {
        addToast({
          type: "success",
          title: "Email sent!",
          message: "Payment details have been sent to the customer.",
        });
      } else {
        throw new Error(response.message || "Failed to send email");
      }
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Unable to send email. Please try again.",
      });
    }
  };

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === "string" ? Number(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: CURRENCY.code,
      minimumFractionDigits: 0,
    }).format(numAmount);
  };

  const getStatusBadge = (status: string) => {
    const variant = {
      pending: "info",
      paid: "success",
      partial: "warning",
      overdue: "error",
      cancelled: "error",
    }[status] || "default";

    return <Badge variant={variant as any}>{INVOICE_STATUS_LABELS[status] || status}</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton height="2.5rem" width="12rem" />
        <Card>
          <div className="space-y-4">
            <LoadingSkeleton height="1.5rem" width="100%" />
            <LoadingSkeleton height="1.5rem" width="80%" />
            <LoadingSkeleton height="1.5rem" width="60%" />
          </div>
        </Card>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Invoice Details</h1>
        </div>
        <Card>
          <div className="p-8 text-center">
            <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error || "Invoice not found"}</p>
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              icon={<ExternalLink size={16} className="rotate-180" />}
            >
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Invoice #{invoice.invoiceNumber}
            </h1>
          </div>
          <p className="text-slate-600">Created on {new Date(invoice.createdAt).toLocaleDateString("en-NG")}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            icon={<Share2 size={18} />}
            onClick={handleShare}
            disabled={loadingShare}
          >
            Share
          </Button>
          <Button
            icon={<CreditCard size={18} />}
            onClick={handleGenerateVirtualAccount}
            disabled={generatingVA || !!invoice.virtualAccount}
          >
            {invoice.virtualAccount ? "Virtual Account Generated" : generatingVA ? "Generating..." : "Generate Virtual Account"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <Card>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Invoice Details</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Description</p>
                  <p className="font-semibold text-slate-900">{invoice.description}</p>
                </div>
                {getStatusBadge(invoice.status)}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={18} className="text-slate-600" />
                    <p className="text-sm text-slate-600">Amount</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{formatCurrency(invoice.expectedAmount)}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={18} className="text-slate-600" />
                    <p className="text-sm text-slate-600">Due Date</p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {new Date(invoice.dueDate).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Customer Information */}
          <Card>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Customer Information</h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-teal-700">
                  {invoice.customer.fullName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-lg">{invoice.customer.fullName}</p>
                <p className="text-sm text-slate-600">{invoice.customer.email}</p>
                {invoice.customer.phone && (
                  <p className="text-sm text-slate-600">{invoice.customer.phone}</p>
                )}
                <p className="text-xs text-slate-500 mt-1">Ref: {invoice.customer.customerReference}</p>
              </div>
            </div>
          </Card>

          {/* Virtual Account Details */}
          {invoice.virtualAccount && (
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={24} className="text-green-700" />
                <h2 className="text-xl font-bold text-slate-900">Virtual Account</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm text-slate-600">Bank</span>
                  <span className="font-medium text-slate-900">{invoice.virtualAccount.bankName}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm text-slate-600">Account Number</span>
                  <span className="font-mono font-bold text-lg text-slate-900">
                    {invoice.virtualAccount.nombaAccountNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm text-slate-600">Account Name</span>
                  <span className="font-medium text-slate-900">{invoice.virtualAccount.accountName}</span>
                </div>
                <Button
                  className="w-full"
                  variant="outline"
                  icon={<Copy size={18} />}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Bank: ${invoice.virtualAccount?.bankName}\nAccount Number: ${invoice.virtualAccount?.nombaAccountNumber}\nAccount Name: ${invoice.virtualAccount?.accountName}\nAmount: ${formatCurrency(invoice.expectedAmount)}`
                    );
                    addToast({
                      type: "success",
                      title: "Copied!",
                      message: "Account details copied to clipboard",
                    });
                  }}
                >
                  Copy Account Details
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Amount Card */}
          <Card className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-100">
            <p className="text-sm text-slate-600 mb-2">Amount Due</p>
            <p className="text-4xl font-bold text-slate-900 mb-4">{formatCurrency(invoice.expectedAmount)}</p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock size={16} />
              <span>Due {new Date(invoice.dueDate).toLocaleDateString("en-NG")}</span>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                className="w-full justify-start"
                variant="outline"
                icon={<Share2 size={18} />}
                onClick={handleShare}
              >
                Share Invoice
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                icon={<Mail size={18} />}
                onClick={() => {
                  const paymentLink = `${window.location.origin}/pay/${invoice.invoiceNumber}`;
                  window.location.href = `mailto:${invoice.customer.email}?subject=Invoice%20${invoice.invoiceNumber}&body=Please%20make%20payment%20to:%20${paymentLink}`;
                }}
              >
                Send via Email
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                icon={<ExternalLink size={18} />}
                onClick={() => window.open(`/pay/${invoice.invoiceNumber}`, "_blank")}
              >
                View Payment Page
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          setShareData(null);
        }}
        title="Share Invoice"
      >
        {shareData && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">Payment Link</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareData.paymentLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Copy size={16} />}
                  onClick={() => {
                    navigator.clipboard.writeText(shareData.paymentLink);
                    addToast({
                      type: "success",
                      title: "Copied!",
                      message: "Payment link copied to clipboard",
                    });
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                icon={<Copy size={18} />}
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy Details"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
                onClick={handleWhatsApp}
              >
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-full"
                icon={<Mail size={18} />}
                onClick={handleEmail}
              >
                Email
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}