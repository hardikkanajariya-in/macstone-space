import { DM_Sans } from "next/font/google";
import { Providers } from "@/components/admin/Providers";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Admin | Makstone Space",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased font-[family-name:var(--font-dm-sans)]">
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
