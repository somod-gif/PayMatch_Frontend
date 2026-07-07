"use client";

import Link from "next/link";
import { APP_NAME, FOOTER_LINKS, COMPANY } from "@/constants";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-lg text-white">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Automatic payment reconciliation for Nigerian organizations.
              Built on Nomba Virtual Accounts.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["N", "T", "S", "E"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-medium"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-500">Built in Nigeria</span>
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {COMPANY.year} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Powered by{" "}
            <a
              href="https://nomba.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300"
            >
              Nomba
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}