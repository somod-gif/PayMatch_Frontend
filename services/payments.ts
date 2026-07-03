// ============================================================
// PayMatch - Payments Service
// ============================================================

import { get } from "@/lib/api";
import type { Payment, ApiResponse, PaginatedResponse } from "@/types";

const BASE = "/payments";

export const paymentsService = {
  list: (params?: { page?: number; limit?: number; status?: string; customerId?: string }) =>
    get<PaginatedResponse<Payment>>(BASE, { params }),

  getById: (id: string) =>
    get<ApiResponse<Payment>>(`${BASE}/${id}`),
};