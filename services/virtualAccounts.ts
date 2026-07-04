// ============================================================
// PayMatch - Virtual Accounts Service
// ============================================================

import { post } from "@/lib/api";
import type { VirtualAccount, CreateVirtualAccountPayload, ApiResponse } from "@/types";

const BASE = "/api/v1/virtual-accounts";

export const virtualAccountsService = {
  create: (data: CreateVirtualAccountPayload) =>
    post<ApiResponse<VirtualAccount>>(BASE, data),
};