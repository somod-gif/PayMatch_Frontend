// ============================================================
// PayMatch - Webhooks Service
// ============================================================

import { get } from "@/lib/api";
import type { WebhookPayload, ApiResponse, PaginatedResponse } from "@/types";

const BASE = "/webhooks";

export const webhooksService = {
  list: (params?: { page?: number; limit?: number }) =>
    get<PaginatedResponse<WebhookPayload>>(BASE, { params }),

  getById: (id: string) =>
    get<ApiResponse<WebhookPayload>>(`${BASE}/${id}`),
};