"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/content", label: "Content", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-charcoal text-white min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo-icon-transparet.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="font-display text-lg font-semibold tracking-wider text-white">Makstone <span className="text-accent">Admin</span></span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white transition-colors w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
