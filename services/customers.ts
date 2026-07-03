// ============================================================
// PayMatch - Customers Service
// ============================================================

import { get, post, put, del } from "@/lib/api";
import type { Customer, CreateCustomerPayload, ApiResponse, PaginatedResponse } from "@/types";

const BASE = "/customers";

export const customersService = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    get<PaginatedResponse<Customer>>(BASE, { params }),

  getById: (id: string) =>
    get<ApiResponse<Customer>>(`${BASE}/${id}`),

  create: (data: CreateCustomerPayload) =>
    post<ApiResponse<Customer>>(BASE, data),

  update: (id: string, data: Partial<CreateCustomerPayload>) =>
    put<ApiResponse<Customer>>(`${BASE}/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse<void>>(`${BASE}/${id}`),
};