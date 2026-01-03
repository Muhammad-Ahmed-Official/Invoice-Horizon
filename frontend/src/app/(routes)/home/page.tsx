'use client'

import { DollarSign, FileText, Clock, AlertCircle, TrendingUp, FileX, Download } from 'lucide-react';
import StatCard from '../../components/StatusCard';
import StatusBadge from '../../components/StatsBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import DashboardSkeleton from '../../components/skelton/homeSkelton';
import { useQuery } from '@apollo/client/react';
import { getInvoiceData } from '@/features/auth/types/invoiceType';
import { ALL_INVOICES, INVOICE_STATS } from '@/graphql/invoice';
import { invoiceStatsData } from '@/features/auth/types/invoiceStatsType';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function Dashboard() {
  const { data, loading } = useQuery<getInvoiceData>(ALL_INVOICES);
  const { data:statsData } = useQuery<invoiceStatsData>(INVOICE_STATS);
  
  if(loading) return <DashboardSkeleton />

  const invoices = data?.invoices ?? [];

  const { totalRevenue = 0, paidAmount = 0, pendingAmount = 0, overdueAmount = 0 } = statsData?.stats ?? {};

 const generateInvoicePDF = (invoice: any) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  /* ================= HEADER ================= */
  doc.setFillColor(30, 30, 30);
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("INVOICE", 14, 22);

  doc.setFontSize(10);
  doc.text(`INV-${invoice.id.split("-")[0]}`, pageWidth - 14, 18, {
    align: "right",
  });
  doc.text(
    new Date(invoice.issueDate).toLocaleDateString(),
    pageWidth - 14,
    26,
    { align: "right" }
  );

  /* ================= BODY ================= */
  doc.setTextColor(0, 0, 0);

  // Client Info
  doc.setFontSize(11);
  doc.text("Bill To", 14, 50);
  doc.setFontSize(10);
  doc.text(invoice.client.name, 14, 56);

  // Invoice Meta
  doc.setFontSize(10);
  doc.text(`Issue Date:`, pageWidth - 70, 50);
  doc.text(
    new Date(invoice.issueDate).toLocaleDateString(),
    pageWidth - 14,
    50,
    { align: "right" }
  );

  doc.text(`Due Date:`, pageWidth - 70, 56);
  doc.text(
    new Date(invoice.dueDate).toLocaleDateString(),
    pageWidth - 14,
    56,
    { align: "right" }
  );

  // Divider
  doc.setDrawColor(200);
  doc.line(14, 62, pageWidth - 14, 62);

  /* ================= ITEMS TABLE ================= */
  autoTable(doc, {
    startY: 68,
    theme: "plain",
    head: [["Description", "Qty", "Rate", "Amount"]],
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [245, 245, 245],
      textColor: 0,
      fontStyle: "bold",
    },
    columnStyles: {
      1: { halign: "center", cellWidth: 20 },
      2: { halign: "right", cellWidth: 30 },
      3: { halign: "right", cellWidth: 35 },
    },
    body: invoice.items.map((item: any) => [
      item.description,
      item.quantity,
      `Rs ${item.rate.toLocaleString()}`,
      `Rs ${(item.quantity * item.rate).toLocaleString()}`,
    ]),
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  /* ================= TOTALS ================= */
  doc.setFontSize(11);
  doc.text("Total", pageWidth - 60, finalY);
  doc.setFontSize(13);
  doc.text(
    `Rs ${invoice.total.toLocaleString()}`,
    pageWidth - 14,
    finalY,
    { align: "right" }
  );

  // Status badge
  doc.setFontSize(10);
  doc.setTextColor(
    invoice.status === "PAID" ? 0 : 200,
    invoice.status === "PAID" ? 150 : 0,
    0
  );
  doc.text(invoice.status.toUpperCase(), pageWidth - 14, finalY + 8, {
    align: "right",
  });

  /* ================= FOOTER ================= */
  doc.setTextColor(120);
  doc.setFontSize(9);
  doc.text(
    "Thank you for your business",
    pageWidth / 2,
    285,
    { align: "center" }
  );

  doc.save(`INV-${invoice.id.split("-")[0]}.pdf`);
 };

return (
  <div className="min-h-screen bg-gradient-dark p-4 pb-14 lg:pb-0">
  <div className="max-w-6xl mx-auto animate-fade-in">

    {/* Header */}
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-xl lg:text-4xl font-bold text-gradient-gold">Dashboard</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground flex items-center gap-2">
          <TrendingUp className="h-3 w-3 text-gold" />
          Welcome back! Here's your invoice overview.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 ">
      <StatCard
        title="Total Revenue"
        value={`$${totalRevenue?.toLocaleString()}`}
        icon={DollarSign}
        // trend="+12.5% from last month"
        // trendUp
        gradient="bg-black"
      />
      <StatCard
        title="Paid Invoices"
        value={`$${paidAmount?.toLocaleString()}`}
        icon={FileText}
        gradient="from-success to-emerald-500"
      />
      <StatCard
        title="Pending"
        value={`$${pendingAmount?.toLocaleString()}`}
        icon={Clock}
        gradient="from-gold-dark to-gold"
      />
      <StatCard
        title="Overdue"
        value={`$${overdueAmount?.toLocaleString()}`}
        icon={AlertCircle}
        gradient="from-wine to-red-600"
      />
    </div>

    {/* Recent Invoices */}
 <Card className="glass shadow-lg overflow-hidden animate-slide-up">
          <CardHeader className="bg-gradient-card border-b border-border p-2 sm:p-4">
            <div>
              <CardTitle className="text-lg md:text-2xl font-bold text-gradient-gold">
                {invoices?.length > 0 ? 'Recent Invoices' : 'No Invoices Found'}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            {invoices?.length > 0 ? (
              <Table className="min-w-150 md:min-w-full">
                <TableHeader>
                  <TableRow className="bg-muted/40 text-xs md:text-sm">
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {invoices?.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-accent/10 transition text-xs md:text-sm">
                      <TableCell className="font-semibold text-gold hover:text-gold-light transition">{`INV-${invoice?.id?.split('-')[0]}`}</TableCell>
                      <TableCell>{invoice?.client.name}</TableCell>
                      <TableCell>{new Date(invoice?.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(invoice?.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell className="font-bold text-cream">Rs {invoice?.total?.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={invoice?.status.toLowerCase() as "paid" | "pending" | "overdue"} />
                      </TableCell>
                      <TableCell>
                          <button
                            onClick={() => generateInvoicePDF(invoice)}
                            className="flex items-center cursor-pointer gap-1 text-sm text-gold hover:text-gold-light">
                            <Download className="w-4 h-4" /> Download
                          </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="rounded-full bg-muted/20 p-4">
                  <FileX className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No invoices yet</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  You haven't created any invoices yet. Start by creating your first invoice to see it here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
  </div>
</div>
);

}