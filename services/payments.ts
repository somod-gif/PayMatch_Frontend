// ============================================================
// PayMatch - Payments Service
// ============================================================

import { get, post } from "@/lib/api";
import type { Payment, CreatePaymentPayload, ApiResponse, PaginatedResponse, PaymentLinkResponse, PaymentShareResponse } from "@/types";

const BASE = "/api/v1/payments";

export const paymentsService = {
  list: (params?: { page?: number; limit?: number; status?: string; customerId?: string }) =>
    get<ApiResponse<Payment[]>>(BASE, { params }),

  getById: (id: string) =>
    get<ApiResponse<Payment>>(`${BASE}/${id}`),

  create: (data: CreatePaymentPayload) =>
    post<ApiResponse<Payment>>(BASE, data),

  getPaymentLink: (invoiceNumber: string) =>
    get<PaymentLinkResponse>(`${BASE}/link/${invoiceNumber}`),

  getPaymentShare: (invoiceNumber: string) =>
    get<PaymentShareResponse>(`${BASE}/share/${invoiceNumber}`),

  sendPaymentEmail: (invoiceNumber: string, email: string) =>
    post<{ success: boolean; message: string }>(`${BASE}/send-email/${invoiceNumber}`, { email }),
};