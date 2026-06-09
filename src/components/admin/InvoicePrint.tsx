"use client";

import { formatPrice } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { Download, Printer } from "lucide-react";

interface InvoicePrintProps {
  invoice: {
    invoiceNumber: string;
    clientName: string;
    clientEmail: string | null;
    clientPhone: string | null;
    clientAddress: string | null;
    description: string | null;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    total: number;
    notes: string | null;
    issuedAt: string;
    dueDate: string | null;
    items: {
      description: string;
      quantity: number;
      unitPrice: number;
      amount: number;
    }[];
  };
}

export function InvoicePrint({ invoice }: InvoicePrintProps) {
  const handlePrint = () => window.print();

  const handlePdf = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(COMPANY.name, 20, 25);
    doc.setFontSize(10);
    doc.text(`Invoice: ${invoice.invoiceNumber}`, 20, 35);
    doc.text(`Date: ${new Date(invoice.issuedAt).toLocaleDateString("en-IN")}`, 20, 42);
    doc.text(`Client: ${invoice.clientName}`, 20, 52);

    autoTable(doc, {
      startY: 65,
      head: [["Description", "Qty", "Unit Price", "Amount"]],
      body: invoice.items.map((item) => [
        item.description,
        item.quantity.toString(),
        formatPrice(item.unitPrice),
        formatPrice(item.amount),
      ]),
    });

    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ${formatPrice(invoice.subtotal)}`, 140, finalY);
    doc.text(`Tax (${invoice.taxRate}%): ${formatPrice(invoice.taxAmount)}`, 140, finalY + 7);
    doc.setFontSize(12);
    doc.text(`Total: ${formatPrice(invoice.total)}`, 140, finalY + 16);

    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div>
      <div className="flex gap-3 mb-6 print:hidden">
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm hover:bg-gray-50">
          <Printer size={16} /> Print
        </button>
        <button onClick={handlePdf} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm hover:bg-charcoal/90">
          <Download size={16} /> Download PDF
        </button>
      </div>

      <div className="bg-white border border-gray-200 p-8 md:p-12 max-w-3xl" id="invoice">
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold">{COMPANY.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{COMPANY.address.full}</p>
            <p className="text-sm text-gray-500">{COMPANY.phoneDisplay}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">INVOICE</p>
            <p className="text-sm text-gray-500 mt-1">{invoice.invoiceNumber}</p>
            <p className="text-sm text-gray-500">
              {new Date(invoice.issuedAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Bill To</p>
          <p className="font-medium">{invoice.clientName}</p>
          {invoice.clientEmail && <p className="text-sm text-gray-500">{invoice.clientEmail}</p>}
          {invoice.clientPhone && <p className="text-sm text-gray-500">{invoice.clientPhone}</p>}
          {invoice.clientAddress && <p className="text-sm text-gray-500">{invoice.clientAddress}</p>}
        </div>

        <table className="w-full text-sm mb-8">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 font-medium">Description</th>
              <th className="text-right py-3 font-medium">Qty</th>
              <th className="text-right py-3 font-medium">Unit Price</th>
              <th className="text-right py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-3">{item.description}</td>
                <td className="text-right py-3">{item.quantity}</td>
                <td className="text-right py-3">{formatPrice(item.unitPrice)}</td>
                <td className="text-right py-3">{formatPrice(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatPrice(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
              <span>{formatPrice(invoice.taxAmount)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>{formatPrice(invoice.total)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Notes</p>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
