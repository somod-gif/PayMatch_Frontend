// ============================================================
// PayMatch - Invoices Service
// ============================================================

import { get, post, put, del } from "@/lib/api";
import type { Invoice, CreateInvoicePayload, ApiResponse, PaginatedResponse } from "@/types";

const BASE = "/invoices";

export const invoicesService = {
  list: (params?: { page?: number; limit?: number; customerId?: string; status?: string }) =>
    get<PaginatedResponse<Invoice>>(BASE, { params }),

  getById: (id: string) =>
    get<ApiResponse<Invoice>>(`${BASE}/${id}`),

  create: (data: CreateInvoicePayload) =>
    post<ApiResponse<Invoice>>(BASE, data),

  update: (id: string, data: Partial<CreateInvoicePayload>) =>
    put<ApiResponse<Invoice>>(`${BASE}/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse<void>>(`${BASE}/${id}`),
};