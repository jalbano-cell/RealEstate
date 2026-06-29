"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-neutral-200"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm tracking-tight">PR</span>
            </div>
            <span
              className={cn(
                "font-bold text-lg tracking-tight transition-colors duration-300",
                scrolled ? "text-neutral-900" : "text-white"
              )}
            >
              PrimeRealty
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                    scrolled
                      ? active
                        ? "text-amber-600 bg-amber-50"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                      : active
                        ? "text-amber-400 bg-white/10"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+14165550100"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md",
                scrolled ? "text-neutral-600 hover:text-neutral-900" : "text-white/80 hover:text-white"
              )}
            >
              <Phone className="h-4 w-4" />
              (416) 555-0100
            </a>
            <Button asChild variant="primary" size="sm">
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
              scrolled
                ? "text-neutral-900 hover:bg-neutral-100"
                : "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 shadow-lg">
          <nav className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                    active
                      ? "text-amber-600 bg-amber-50"
                      : "text-neutral-700 hover:text-amber-600 hover:bg-neutral-50"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 pb-4 pt-1 flex flex-col gap-2 border-t border-neutral-100 mt-1">
            <a
              href="tel:+14165550100"
              className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600"
            >
              <Phone className="h-4 w-4 text-neutral-400" />
              (416) 555-0100
            </a>
            <Button asChild variant="primary" className="w-full">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Book Consultation
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
