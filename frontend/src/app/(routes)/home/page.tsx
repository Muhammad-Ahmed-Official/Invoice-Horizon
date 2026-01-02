'use client'

import { DollarSign, FileText, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import StatCard from '../../components/StatusCard';
import StatusBadge from '../../components/StatsBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import DashboardSkeleton from '../../components/skelton/homeSkelton';
import { useQuery } from '@apollo/client/react';
import { getInvoiceData } from '@/features/auth/types/invoiceType';
import { ALL_INVOICES, INVOICE_STATS } from '@/graphql/invoice';
import { invoiceStatsData } from '@/features/auth/types/invoiceStatsType';


export default function Dashboard() {
  const { data, loading } = useQuery<getInvoiceData>(ALL_INVOICES);
  const { data:statsData } = useQuery<invoiceStatsData>(INVOICE_STATS)
  if(loading) return <DashboardSkeleton />

  const invoices = data?.invoices ?? [];

  const { totalRevenue, paidAmount, pendingAmount, overdueAmount } = statsData?.stats as any;

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
        value={`$${totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        // trend="+12.5% from last month"
        // trendUp
        gradient="bg-black"
      />
      <StatCard
        title="Paid Invoices"
        value={`$${paidAmount.toLocaleString()}`}
        icon={FileText}
        gradient="from-success to-emerald-500"
      />
      <StatCard
        title="Pending"
        value={`$${pendingAmount.toLocaleString()}`}
        icon={Clock}
        gradient="from-gold-dark to-gold"
      />
      <StatCard
        title="Overdue"
        value={`$${overdueAmount.toLocaleString()}`}
        icon={AlertCircle}
        gradient="from-wine to-red-600"
      />
    </div>

    {/* Recent Invoices */}
    <Card className="glass shadow-lg overflow-hidden animate-slide-up">
      <CardHeader className="bg-gradient-card border-b border-border p-2 sm:p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-2xl font-bold text-gradient-gold">Recent Invoices</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
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
                <TableCell className="font-bold text-cream">Rs {invoice?.total.toLocaleString()}</TableCell>
                <TableCell> <StatusBadge status={invoice?.status.toLowerCase() as "paid" | "pending" | "overdue"} /> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</div>
);

}