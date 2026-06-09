import { NextRequest, NextResponse } from "next/server";
import { auth, logActivity } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateInvoiceNumber } from "@/lib/utils";
import { z } from "zod";

const invoiceSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().optional(),
  clientPhone: z.string().optional(),
  clientAddress: z.string().optional(),
  description: z.string().optional(),
  taxRate: z.number().default(18),
  notes: z.string().optional(),
  dueDate: z.string().optional(),
  items: z.array(
    z.object({
      description: z.string(),
      quantity: z.number().default(1),
      unitPrice: z.number(),
      propertyId: z.string().optional(),
    })
  ).min(1),
});

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    include: { items: { include: { property: { select: { title: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const data = invoiceSchema.parse(body);

    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxAmount = (subtotal * data.taxRate) / 100;
    const total = subtotal + taxAmount;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: generateInvoiceNumber(),
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone,
        clientAddress: data.clientAddress,
        description: data.description,
        subtotal,
        taxRate: data.taxRate,
        taxAmount,
        total,
        notes: data.notes,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount: item.quantity * item.unitPrice,
            propertyId: item.propertyId || null,
          })),
        },
      },
      include: { items: true },
    });

    await logActivity("created", "invoice", invoice.id, invoice.invoiceNumber);
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
