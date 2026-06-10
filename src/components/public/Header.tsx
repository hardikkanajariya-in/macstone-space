"use client";

import Link from "next/link";
import Image from "next/image";
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
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-20 md:h-24 px-5 md:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-with-text.png"
              alt="Macstone Space"
              width={160}
              height={40}
              className="h-9 w-auto object-contain brightness-110"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            <a
              href={`tel:+91${COMPANY.phone}`}
              className="flex items-center gap-2.5 text-xs tracking-wider uppercase text-muted hover:text-accent transition-colors duration-300"
            >
              <Phone size={12} className="text-accent" />
              {COMPANY.phoneDisplay}
            </a>
            <Link href="/contact" className="btn-primary text-xs py-2.5 px-6 shadow-[0_4px_15px_rgba(229, 178, 62, 0.15)] hover:shadow-[0_4px_25px_rgba(229, 178, 62, 0.3)]">
              Book Consultation
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 text-foreground hover:text-accent transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-8 flex flex-col gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-4 text-sm tracking-widest uppercase font-medium border-b border-border/50 text-foreground hover:text-accent transition-colors last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 flex flex-col gap-4">
              <a
                href={`tel:+91${COMPANY.phone}`}
                className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors"
              >
                <Phone size={14} className="text-accent" />
                {COMPANY.phoneDisplay}
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center py-3"
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
