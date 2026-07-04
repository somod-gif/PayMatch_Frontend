// ============================================================
// PayMatch - Webhooks Service
// ============================================================

import { get } from "@/lib/api";
import type { WebhookLog, ApiResponse } from "@/types";

const BASE = "/api/v1/webhooks";

export const webhooksService = {
  list: (params?: { page?: number; limit?: number }) =>
    get<ApiResponse<WebhookLog[]>>(BASE, { params }),

  getById: (id: string) =>
    get<ApiResponse<WebhookLog>>(`${BASE}/${id}`),
};