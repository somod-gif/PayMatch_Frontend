// ============================================================
// PayMatch - Application Constants
// ============================================================

export const APP_NAME = "PayMatch";
export const APP_TAGLINE = "Automatic Payment Reconciliation for Nigerian SMEs";
export const APP_DESCRIPTION =
  "PayMatch helps businesses automatically track and reconcile customer bank transfer payments using Nomba Virtual Accounts.";

export const APP_URL = "https://paymatch.app";
export const APP_EMAIL = "hello@paymatch.app";
export const APP_SUPPORT_EMAIL = "support@paymatch.app";
export const APP_GITHUB_URL = "https://github.com/paymatch";

export const COMPANY = {
  name: "PayMatch",
  legalName: "PayMatch Technologies Ltd.",
  location: "Lagos, Nigeria",
  year: 2026,
};

// --- Navigation ---
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Customers", href: "/dashboard/customers", icon: "Users" },
  { label: "Invoices", href: "/dashboard/invoices", icon: "FileText" },
  { label: "Payments", href: "/dashboard/payments", icon: "DollarSign" },
  { label: "Webhooks", href: "/dashboard/webhooks", icon: "Webhook" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

// --- Footer ---
export const FOOTER_LINKS = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "GitHub", href: APP_GITHUB_URL },
      { label: "Contact", href: `mailto:${APP_EMAIL}` },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
] as const;

export const TECH_STACK = [
  "Next.js",
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "Nomba APIs",
] as const;

// --- API ---
export const API_TIMEOUT = 30_000; // 30 seconds
export const API_RETRY_COUNT = 3;
export const PAGINATION_DEFAULT_LIMIT = 20;

// --- Status Labels ---
export const INVOICE_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  partial: "Partial",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  matched: "Matched",
  unmatched: "Unmatched",
  failed: "Failed",
  refunded: "Refunded",
};

export const CUSTOMER_STATUS_LABELS: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  archived: "Archived",
};

// --- Currencies ---
export const CURRENCY = {
  code: "NGN",
  symbol: "₦",
  locale: "en-NG",
} as const;

// --- Routes ---
export const ROUTES = {
  home: "/",
  about: "/about",
  dashboard: "/dashboard",
  dashboardCustomers: "/dashboard/customers",
  dashboardInvoices: "/dashboard/invoices",
  dashboardPayments: "/dashboard/payments",
  dashboardWebhooks: "/dashboard/webhooks",
  dashboardSettings: "/dashboard/settings",
} as const;