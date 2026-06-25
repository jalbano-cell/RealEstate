"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Our Agents" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-200"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RE</span>
            </div>
            <span
              className={cn(
                "font-bold text-lg tracking-tight transition-colors",
                scrolled ? "text-neutral-900" : "text-white"
              )}
            >
              PrimeRealty
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-500",
                  scrolled ? "text-neutral-700" : "text-white/90"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+14165550100"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                scrolled ? "text-neutral-700" : "text-white/90"
              )}
            >
              <Phone className="h-4 w-4" />
              (416) 555-0100
            </a>
            <Button asChild variant="primary" size="sm">
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>

          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-neutral-900 hover:bg-neutral-100" : "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-amber-600 hover:bg-neutral-50 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 flex flex-col gap-2">
              <a
                href="tel:+14165550100"
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600"
              >
                <Phone className="h-4 w-4" />
                (416) 555-0100
              </a>
              <Button asChild variant="primary" className="w-full">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
