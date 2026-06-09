import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { InvoicePrint } from "@/components/admin/InvoicePrint";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvoiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!invoice) notFound();

  return (
    <div>
      <Link href="/admin/invoices" className="flex items-center gap-2 text-sm text-gray-500 hover:text-charcoal mb-6">
        <ArrowLeft size={16} /> Back to Invoices
      </Link>
      <InvoicePrint invoice={JSON.parse(JSON.stringify(invoice))} />
    </div>
  );
}
