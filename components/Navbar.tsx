"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks";
import { NAV_LINKS, APP_NAME, APP_GITHUB_URL } from "@/constants";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(50);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg shadow-slate-200/20"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 relative">
              <Image
                src="/images/logo.png"
                alt="PayMatch Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-teal-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={APP_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors px-4 py-2"
            >
              GitHub
            </a>
            <Link href="/dashboard">
              <Button size="md">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-teal-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-slate-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-slate-600 hover:text-teal-700 font-medium rounded-lg hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 px-4 pt-4">
              <a
                href={APP_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="ghost" size="md" className="w-full">
                  GitHub
                </Button>
              </a>
              <Link href="/dashboard" className="flex-1">
                <Button size="md" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
