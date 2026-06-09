"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-16 md:h-20 px-5 md:px-8">
          <Link href="/" className="group">
            <span className="font-display text-xl md:text-2xl tracking-wide text-foreground">
              Makstone
            </span>
            <span className="font-display text-xl md:text-2xl tracking-wide text-accent ml-1">
              Space
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-muted hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:+91${COMPANY.phone}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <Phone size={14} />
              {COMPANY.phoneDisplay}
            </a>
            <Link href="/contact" className="btn-primary text-xs py-3 px-6">
              Book Consultation
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 text-foreground"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-4 text-lg font-display border-b border-border-light last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 flex flex-col gap-4">
              <a
                href={`tel:+91${COMPANY.phone}`}
                className="flex items-center gap-2 text-muted"
              >
                <Phone size={16} />
                {COMPANY.phoneDisplay}
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center"
              >
                Book Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
