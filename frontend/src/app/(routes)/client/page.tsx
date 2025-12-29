'use client'

import { useState } from 'react';
import { Search, Mail, Phone, Building, User, Users, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '@/app/components/ui/button';
import CreateClientModel from '@/app/components/CreateClientModel';
import ClientsSkeleton from '../../components/skelton/clientSkelton';
import ClientEditModal from '@/app/components/ClientEditModel';


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


export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientModel, setClientModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientInvoiceStats = (clientId: string) => {
    const clientInvoices = mockInvoices.filter((inv) => inv.clientId === clientId);
    const totalAmount = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const paidAmount = clientInvoices
      .filter((inv) => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0);
    return { total: clientInvoices.length, totalAmount, paidAmount };
  };

  const handleDeleteClient = async(id:string) => {
    // setFilter(() => prev.filter((c) => c.id !== id))
  }

  const [selectedClient, setSelectedClient] = useState(null);
  const [showEditClientModal, setShowEditClientModal] = useState(false);

  const handleEditClient = async(data:any) => {
    setSelectedClient(data);
    setShowEditClientModal(true);
  }
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if(loading) return <ClientsSkeleton />    

  return (
    <div className="px-4 py-6 md:px-8 animate-fade-in">
      <div className="mx-auto mb-6 max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-gold"> Clients </h1>
          <p className="mt-1 flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
            <Users className="h-4 w-4 text-gold" /> Manage your client relationships
          </p>
        </div>
        <Button
          onClick={() => setClientModel(true)}
          className="w-full sm:w-auto bg-gradient-gold text-primary-foreground shadow-gold hover:shadow-glow transition">
          <User className="mr-2 h-4 w-4" /> New Client
        </Button>
      </div>

    <CreateClientModel clientModel={clientModel} setClientModel={setClientModel} />

  {/* Search */}
  <Card className="mb-6 bg-gradient-card border border-border shadow-md">
    <CardContent className="p-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
        <Input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-input border-border text-foreground focus:ring-gold"
        />
      </div>
    </CardContent>
  </Card>

  {/* Client Cards */}
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {filteredClients.map((client) => {
      const stats = getClientInvoiceStats(client.id);
      return (
        <Card
          key={client.id}
          className="bg-gradient-card border border-border shadow-md hover:shadow-glow transition animate-scale-in" >
<CardHeader>
  <div className="flex items-start justify-between">

    {/* Left: Avatar + Name */}
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold shadow-gold">
        {client.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()}
      </div>

      <div>
        <CardTitle className="text-lg text-foreground">
          {client.name}
        </CardTitle>

        {client.company && (
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <Building className="mr-1 h-3 w-3 text-gold" />
            {client.company}
          </p>
        )}
      </div>
    </div>

    {/* Right: Actions */}
    <div className="relative">
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8"
      onClick={() =>
        setOpenMenuId(openMenuId === client.id ? null : client.id)
      }>
      <MoreVertical className="h-4 w-4" />
    </Button>

    {openMenuId === client.id && (
      <div className="absolute right-0 mt-2 w-36 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden animate-scale-in origin-top-right">
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-accent/10 transition"
          onClick={() => {
            handleEditClient(client);
            setOpenMenuId(null);
          }}>
          <Pencil className="mr-2 h-4 w-4 text-gold" />
          Edit
        </button>

        <button
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 transition"
          onClick={() => {
            handleDeleteClient(client.id);
            setOpenMenuId(null);
          }}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </button>
      </div>
    )}
  </div>
  </div>

  <ClientEditModal
    open={showEditClientModal}
    onOpenChange={setShowEditClientModal}
    client={selectedClient}
  />
</CardHeader>


          <CardContent className="space-y-4">

            {/* Contact */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Mail className="mr-2 h-4 w-4 text-gold" />
                {client.email}
              </div>

              <div className="flex items-center text-muted-foreground">
                <Phone className="mr-2 h-4 w-4 text-gold" />
                {client.phone}
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-border pt-4">
              <div className="grid grid-cols-2 gap-4 text-center">

                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.total}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Invoices
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gold">
                    ${stats.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total Billed
                  </p>
                </div>

              </div>
            </div>

          </CardContent>
        </Card>
      );
    })}
  </div>

  {/* Empty State */}
  {filteredClients.length === 0 && (
    <Card className="mt-8 bg-gradient-card border border-border shadow-md">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <img
          src="https://mgx-backend-cdn.metadl.com/generate/images/864210/2025-12-26/deecd9de-fd2c-49e4-a125-08b86af55201.png"
          alt="No clients"
          className="mb-4 h-32 w-32 opacity-40"
        />
        <p className="text-lg font-medium text-foreground">
          No clients found
        </p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search
        </p>
      </CardContent>
    </Card>
  )}
</div>

  );
}