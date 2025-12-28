'use client'

import { DollarSign, FileText, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import StatCard from '../../components/StatusCard';
import StatusBadge from '../../components/StatsBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useState } from 'react';
import DashboardSkeleton from '../../components/skelton/homeSkelton';


const mockClients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94102',
    company: 'TechCorp Inc.',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@designstudio.com',
    phone: '+1 (555) 234-5678',
    address: '456 Design Ave, New York, NY 10001',
    company: 'Design Studio LLC',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@startupco.com',
    phone: '+1 (555) 345-6789',
    address: '789 Startup Blvd, Austin, TX 78701',
    company: 'StartupCo',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@consulting.com',
    phone: '+1 (555) 456-7890',
    address: '321 Business Rd, Boston, MA 02101',
    company: 'Davis Consulting',
  },
];

 const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    clientId: '1',
    client: mockClients[0],
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    status: 'paid',
    items: [
      {
        id: '1',
        description: 'Web Development Services',
        quantity: 40,
        rate: 150,
        amount: 6000,
      },
      {
        id: '2',
        description: 'UI/UX Design',
        quantity: 20,
        rate: 120,
        amount: 2400,
      },
    ],
    subtotal: 8400,
    tax: 840,
    total: 9240,
    notes: 'Thank you for your business!',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    clientId: '2',
    client: mockClients[1],
    issueDate: '2024-12-10',
    dueDate: '2025-01-10',
    status: 'pending',
    items: [
      {
        id: '1',
        description: 'Brand Identity Design',
        quantity: 1,
        rate: 5000,
        amount: 5000,
      },
      {
        id: '2',
        description: 'Marketing Materials',
        quantity: 10,
        rate: 200,
        amount: 2000,
      },
    ],
    subtotal: 7000,
    tax: 700,
    total: 7700,
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    clientId: '3',
    client: mockClients[2],
    issueDate: '2024-11-15',
    dueDate: '2024-12-15',
    status: 'overdue',
    items: [
      {
        id: '1',
        description: 'Mobile App Development',
        quantity: 80,
        rate: 180,
        amount: 14400,
      },
    ],
    subtotal: 14400,
    tax: 1440,
    total: 15840,
    notes: 'Payment overdue. Please remit payment immediately.',
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    clientId: '4',
    client: mockClients[3],
    issueDate: '2024-12-20',
    dueDate: '2025-01-20',
    status: 'pending',
    items: [
      {
        id: '1',
        description: 'Business Consulting',
        quantity: 15,
        rate: 250,
        amount: 3750,
      },
      {
        id: '2',
        description: 'Strategic Planning',
        quantity: 10,
        rate: 300,
        amount: 3000,
      },
    ],
    subtotal: 6750,
    tax: 675,
    total: 7425,
  },
  {
    id: '5',
    invoiceNumber: 'INV-005',
    clientId: '1',
    client: mockClients[0],
    issueDate: '2024-12-15',
    dueDate: '2025-01-15',
    status: 'paid',
    items: [
      {
        id: '1',
        description: 'Website Maintenance',
        quantity: 1,
        rate: 1500,
        amount: 1500,
      },
    ],
    subtotal: 1500,
    tax: 150,
    total: 1650,
  },
];


export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = mockInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = mockInvoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = mockInvoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total, 0);

  const recentInvoices = mockInvoices.slice(0, 5);

  if(loading) return <DashboardSkeleton />

return (
  <div className="min-h-screen bg-gradient-dark pb-16 lg:pb-0">
  <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">

    {/* Header */}
    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gradient-gold">Dashboard</h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground flex items-center gap-1 sm:gap-2">
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-gold" />
          Welcome back! Here's your invoice overview.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-10">
      <StatCard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        trend="+12.5% from last month"
        trendUp
        gradient="bg-gradient-gold"
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
            {recentInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-accent/10 transition text-xs md:text-sm">
                <TableCell className="font-semibold text-gold hover:text-gold-light transition">{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.client.name}</TableCell>
                <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                <TableCell className="font-bold text-cream">Rs {invoice.total.toLocaleString()}</TableCell>
                <TableCell> <StatusBadge status={invoice.status as "paid" | "pending" | "overdue"} /> </TableCell>
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