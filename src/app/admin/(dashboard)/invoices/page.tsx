import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function AdminInvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <Link
          href="/admin/invoices/new"
          className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm hover:bg-charcoal/90"
        >
          <Plus size={16} />
          Create Invoice
        </Link>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-6 py-3 font-medium">Invoice #</th>
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4">{invoice.clientName}</td>
                <td className="px-6 py-4">{formatPrice(invoice.total)}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded capitalize">
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(invoice.issuedAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/invoices/${invoice.id}`}
                    className="text-accent hover:text-accent-dark text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
          <p className="p-8 text-center text-gray-500">No invoices yet</p>
        )}
      </div>
    </div>
  );
}
