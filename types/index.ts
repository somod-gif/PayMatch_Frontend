// ============================================================
// PayMatch - Shared Type Definitions
// ============================================================

// --- Customer Types ---
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  virtualAccountNumber?: string;
  virtualAccountBank?: string;
  totalInvoices: number;
  totalPaid: number;
  totalOutstanding: number;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export type CustomerStatus = "active" | "inactive" | "archived";

export interface CreateCustomerPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

// --- Invoice Types ---
export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  amountPaid: number;
  amountOutstanding: number;
  description: string;
  dueDate: string;
  status: InvoiceStatus;
  virtualAccountNumber?: string;
  virtualAccountBank?: string;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "partial"
  | "paid"
  | "overdue"
  | "cancelled";

export interface CreateInvoicePayload {
  customerId: string;
  amount: number;
  description: string;
  dueDate: string;
}

// --- Payment Types ---
export interface Payment {
  id: string;
  invoiceId: string;
  customerId: string;
  customerName: string;
  amount: number;
  reference: string;
  source: PaymentSource;
  status: PaymentStatus;
  matchedAt?: string;
  createdAt: string;
}

export type PaymentSource = "bank_transfer" | "webhook" | "manual";
export type PaymentStatus =
  | "pending"
  | "matched"
  | "unmatched"
  | "failed"
  | "refunded";

// --- Dashboard Types ---
export interface DashboardStats {
  totalCustomers: number;
  activeInvoices: number;
  paymentsReceived: number;
  totalRevenue: number;
  pendingAmount: number;
  matchRate: number;
  recentTransactions: RecentTransaction[];
}

export interface RecentTransaction {
  id: string;
  customerName: string;
  description: string;
  amount: number;
  status: PaymentStatus;
  date: string;
}

// --- Webhook Types ---
export interface WebhookPayload {
  event: WebhookEvent;
  data: Record<string, unknown>;
  timestamp: string;
}

export type WebhookEvent =
  | "payment.received"
  | "payment.matched"
  | "payment.failed"
  | "customer.created"
  | "invoice.created"
  | "invoice.updated";

// --- API Types ---
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
}

// --- UI Types ---
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";