import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PayMatch - Automatic Payment Reconciliation for Nigerian SMEs",
  description:
    "PayMatch helps businesses automatically track and reconcile customer bank transfer payments using Nomba Virtual Accounts. Stop chasing payments. Know exactly who paid.",
  keywords:
    "payment reconciliation, invoice tracking, virtual accounts, payment matching, Nigerian SMEs, fintech",
  authors: [
    {
      name: "PayMatch",
      url: "https://paymatch.app",
    },
  ],
  openGraph: {
    title: "PayMatch - Automatic Payment Reconciliation",
    description:
      "The reconciliation layer for Nigerian SMEs. Automatically match payments to invoices using Nomba Virtual Accounts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
      </head>
      <body className="bg-slate-50 text-slate-900 font-inter">
        {children}
      </body>
    </html>
  );
}
