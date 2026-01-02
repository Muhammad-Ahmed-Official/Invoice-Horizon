'use client'

import { useEffect, useState } from 'react';
import { Search, Mail, Phone, User, Users, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '@/app/components/ui/button';
import CreateClientModel from '@/app/components/CreateClientModel';
import ClientsSkeleton from '../../components/skelton/clientSkelton';
import ClientEditModal from '@/app/components/ClientEditModel';
import { useMutation, useQuery } from '@apollo/client/react';
import { ALL_CLIENTS, REMOVE_CLIENT } from '@/graphql/client';
import { GetClientTypes } from '@/features/auth/types/client.Types';
import { ALL_INVOICES } from '@/graphql/invoice';
import { getInvoiceData } from '@/features/auth/types/invoiceType';


export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientModel, setClientModel] = useState(false);
  const [clients, setClients] = useState<any []>([]);

  const { data:invoice} = useQuery<getInvoiceData>(ALL_INVOICES);
  const Invoices = invoice ? invoice.invoices : [];  

  const { data, loading, } = useQuery<GetClientTypes>(ALL_CLIENTS, {
    fetchPolicy: 'cache-first',
  });
  
  
  useEffect(() => {
    if(data?.clients){
      setClients(data?.clients);
    }
  }, [data]);

  // console.log(clients)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const getClientInvoiceStats = (clientId: string) => {
    const clientInvoices = Invoices.filter((inv) => inv.clientId === clientId);
    const totalAmount = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const paidAmount = clientInvoices
      .filter((inv) => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0);
    return { total: clientInvoices.length, totalAmount, paidAmount };
  };

  const [removeClient] = useMutation(REMOVE_CLIENT)

  const handleDeleteClient = async(id:string) => {
    await removeClient({
      variables: { id },
    });
    setClients((prev) => prev.filter((c) => c.id !== id))
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
  className="
    bg-gradient-card 
    border border-border 
    shadow-md 
    hover:shadow-glow 
    transition 
    animate-scale-in
  "
>
  <CardHeader className="pb-4">
    <div className="flex items-center justify-between gap-4">

      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="
          h-11 w-11 
          rounded-full 
          bg-gradient-gold 
          flex items-center justify-center 
          text-primary-foreground 
          font-semibold 
          shadow-gold
          shrink-0
        ">
          {client.name
            .split(" ")
            .map((n:string) => n[0])
            .join("")
            .toUpperCase()}
        </div>

        {/* Name + Meta */}
        <div className="space-y-1">
          <div>
            <CardTitle className="text-base pb-1 font-semibold leading-none">
              {client.name}
            </CardTitle>

            <span
              className={`
                rounded-full px-2 py-0.5 
                text-[11px] font-medium border
                ${
                  client.role === "CUSTOMER"
                    ? "border-gold/40 text-gold bg-gold/10"
                    : "border-accent/40 text-accent bg-accent/10"
                }
              `}
            >
              {client.role}
            </span>
          </div>

        </div>
      </div>

      {/* Right: Actions */}
      <div className="relative">
        <Button
          size="icon"
          variant="ghost"
          className="
            h-8 w-8 
            text-muted-foreground
            hover:text-foreground 
            hover:bg-accent/10
          "
          onClick={() =>
            setOpenMenuId(openMenuId === client.id ? null : client.id)
          }
        >
          <MoreVertical className="h-4 w-4" />
        </Button>

        {openMenuId === client.id && (
          <div className="
            absolute right-0 mt-2 w-36 
            rounded-xl 
            border border-border 
            bg-popover 
            shadow-lg 
            z-50 
            overflow-hidden 
            animate-scale-in 
            origin-top-right
          ">
            <button
              className="
                flex items-center w-full px-4 py-2 text-sm 
                hover:bg-accent/10 transition
              "
              onClick={() => {
                handleEditClient(client);
                setOpenMenuId(null);
              }}
            >
              <Pencil className="mr-2 h-4 w-4 text-gold" />
              Edit
            </button>

            <button
              className="
                flex items-center w-full px-4 py-2 text-sm 
                text-destructive 
                hover:bg-destructive/10 transition
              "
              onClick={() => {
                handleDeleteClient(client.id);
                setOpenMenuId(null);
              }}
            >
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
        <CardContent className="space-y-5">

        <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <span className="truncate">{client.email}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-gold shrink-0" />
              <span>{client.phone}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-border pt-2">
            <div className="grid grid-cols-2 gap-5 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-foreground">
                  {stats.total}
                </p>
                <p className="text-xs text-muted-foreground">
                  Invoices
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl font-semibold text-gold">
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