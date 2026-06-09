import type { Metadata } from "next";
import "./globals.css";
import { createMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: `${COMPANY.name} – Premium Real Estate Consultancy`,
  description: COMPANY.description,
  keywords: [
    "premium real estate Ahmedabad",
    "luxury properties Gujarat",
    "property consultant Ahmedabad",
    "real estate investment advisory",
    "Makstone Space",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
