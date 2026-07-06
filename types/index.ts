// ============================================================
// PayMatch - Shared Type Definitions (Backend API v1)
// ============================================================

// --- Auth Types ---
export interface User {
  id: string;
  email: string;
  businessName: string;
  phone?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  businessName: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface AuthContextValue {
  user: User | null;
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// --- Customer Types ---
export interface Customer {
  id: string;
  businessOwnerId: string;
  fullName: string;
  email: string;
  phone?: string;
  customerReference: string;
  status: "active" | "inactive" | "archived";
  invoices?: Invoice[];
  payments?: Payment[];
  createdAt: string;
  updatedAt: string;
}

export type CustomerStatus = "active" | "inactive" | "archived";

export interface CreateCustomerPayload {
  fullName: string;
  email: string;
  phone?: string;
  customerReference?: string;
}

export interface UpdateCustomerPayload {
  fullName: string;
  email: string;
  phone?: string;
  customerReference?: string;
}

// --- Invoice Types ---
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customer: Customer;
  businessOwnerId: string;
  expectedAmount: string;
  currency: string;
  status: "pending" | "paid" | "partial" | "overdue" | "cancelled";
  description: string;
  dueDate: string;
  payments?: Payment[];
  virtualAccount?: VirtualAccount;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = "pending" | "paid" | "partial" | "overdue" | "cancelled";

export interface CreateInvoicePayload {
  customerId: string;
  invoiceNumber: string;
  expectedAmount: number;
  description: string;
  dueDate: string;
}

// --- Virtual Account Types ---
export interface VirtualAccount {
  id: string;
  invoiceId: string;
  nombaAccountNumber: string;
  accountName: string;
  bankName: string;
  accountReference: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVirtualAccountPayload {
  invoiceId: string;
}

// --- Payment Types ---
export interface Payment {
  id: string;
  invoiceId: string;
  customerId: string;
  merchantTxRef: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface CreatePaymentPayload {
  invoiceId: string;
  customerId: string;
  merchantTxRef: string;
  amount: number;
  currency: string;
  paymentMethod: string;
}

export interface PaymentLinkResponse {
  success: boolean;
  invoiceNumber: string;
  paymentUrl: string;
}

export interface PaymentShareResponse {
  success: boolean;
  customer: string;
  email: string;
  phone?: string;
  amount: string;
  currency: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  paymentLink: string;
  whatsappMessage: string;
  whatsappUrl: string;
  emailSubject: string;
  emailBody: string;
  copyText: string;
}

// --- Dashboard Types ---
export interface DashboardMetrics {
  totalCustomers: number;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  partialPayments: number;
  totalRevenue: string;
}

export interface RecentPayment {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  metrics: DashboardMetrics;
  recentPayments: RecentPayment[];
  timestamp: string;
}

// --- Webhook Types ---
export interface WebhookEvent {
  event: string;
  requestId: string;
  data: {
    reference: string;
    amount: string;
    invoiceNumber: string;
  };
}

export interface WebhookLog {
  id: string;
  event: string;
  requestId: string;
  payload: WebhookEvent;
  processed: boolean;
  createdAt: string;
}

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
  message: string;
  error: string;
  timestamp: string;
  path: string;
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