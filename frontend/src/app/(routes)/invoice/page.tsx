'use client';

import { useState } from 'react';
import { Search, Filter, Download, PlusCircle, FileText } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import StatusBadge from '@/app/components/StatsBadge';
import InvoiceModel from '@/app/components/InvoiceModel';
import InvoiceEditModal from '@/app/components/EditInvoiceModel';
import InvoicesSkeleton from '@/app/components/skelton/invoiceSkelton';
import { asyncHandlerFront } from '@/utils/asyncHandler';
import toast from 'react-hot-toast';


export const mockClients = [
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

export const mockInvoices = [
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


export default function Invoices() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteInvoice = async(id:string) => {
    await asyncHandlerFront(
      async() => {

      },
      (error) => toast.error(error.message)
    )
  }

  if(loading) return <InvoicesSkeleton />

  return (
    <div className="px-4 py-4 sm:py-6 md:px-6 lg:px-8 animate-fade-in pb-20">
  <div className="mx-auto mb-6 max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-gold">
        Invoices
      </h1>
      <p className="mt-1 flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
        <FileText className="h-4 w-4 text-gold" />
        Manage and track all your invoices
      </p>
    </div>

    <Button
      onClick={() => setShowModal(true)}
      className="w-full sm:w-auto bg-gradient-gold text-primary-foreground shadow-gold hover:shadow-glow transition"
    >
      <PlusCircle className="mr-2 h-4 w-4" /> New Invoice
    </Button>
  </div>

      <InvoiceModel showModal={showModal} setShowModal={setShowModal} />

      <Card className="mx-auto mb-6 max-w-6xl bg-gradient-card shadow-md border border-border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 bg-input text-foreground border-border focus:ring-gold"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-44 bg-input border-border text-foreground">
                  <Filter className="mr-2 h-4 w-4 text-gold" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border text-foreground hover:bg-accent/10"> 
              <Download className="mr-2 h-4 w-4" /> Export 
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
<Card className="mx-auto max-w-6xl bg-gradient-card shadow-lg border border-border overflow-hidden">
  <CardContent className="p-0">

    {/* Enable scroll only on small screens */}
    <div className="overflow-x-auto md:overflow-visible">

      <Table className="w-full text-xs sm:text-sm">
        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="whitespace-nowrap">Invoice #</TableHead>
            <TableHead>Client</TableHead>

            {/* Hide on mobile */}
            <TableHead className="hidden sm:table-cell">
              Issue Date
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Due Date
            </TableHead>

            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* TABLE BODY */}
        <TableBody>
          {filteredInvoices.length ? (
            filteredInvoices.map((invoice: any) => (
              <TableRow
                key={invoice.id}
                className="hover:bg-accent/5 transition"
              >
                {/* Invoice Number */}
                <TableCell className="font-semibold text-gold whitespace-nowrap">
                  {invoice.invoiceNumber}
                </TableCell>

                {/* Client */}
                <TableCell>
                  <div className="font-semibold text-foreground leading-tight">
                    {invoice.client.name}
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {invoice.client.company}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell whitespace-nowrap"> {new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                <TableCell className="hidden md:table-cell whitespace-nowrap"> {new Date(invoice.dueDate).toLocaleDateString()} </TableCell>
                <TableCell className="font-bold text-gold whitespace-nowrap"> Rs {invoice.total.toLocaleString()} </TableCell>
                <TableCell> <StatusBadge status={invoice.status} /> </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gold hover:bg-accent/10 px-2"
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setShowEditModal(true);
                    }}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-500/10 px-2"
                    onClick={() => handleDeleteInvoice(invoice.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-48 text-center">
                <p className="text-muted-foreground">
                  No invoices found
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  </CardContent>

  {/* Edit Modal */}
  <InvoiceEditModal
    showEditModal={showEditModal}
    setShowEditModal={setShowEditModal}
    invoice={selectedInvoice}
  />
</Card>

    </div>
  )
}