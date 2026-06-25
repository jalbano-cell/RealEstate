"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Home, Users, UserCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/properties", icon: Home, label: "Properties" },
  { href: "/admin/leads", icon: Users, label: "Leads" },
  { href: "/admin/agents", icon: UserCheck, label: "Agents" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-neutral-950 min-h-screen flex flex-col">
      <div className="px-5 py-6 border-b border-neutral-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">RE</span>
          </div>
          <span className="text-white font-semibold text-sm">PrimeRealty</span>
        </Link>
        <p className="text-neutral-500 text-xs mt-1 ml-9">Admin Portal</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-amber-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-neutral-800">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors w-full"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
