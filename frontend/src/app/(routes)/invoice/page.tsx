'use client';

import { useEffect, useState } from 'react';
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
import { useMutation, useQuery } from '@apollo/client/react';
import { ALL_INVOICES, REMOVE_INVOICE } from '@/graphql/invoice';
import { getInvoiceData } from '@/features/auth/types/invoiceType';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { ALL_CLIENTS } from '@/graphql/client';
import { GetClientTypes } from '@/features/auth/types/client.Types';

type InvoiceTableColumn = {
key: string;
label: string;
className?: string;
};

const invoiceTableColumns: InvoiceTableColumn[] = [
{ key: "invoice", label: "Invoice #", className: "whitespace-nowrap" },
{ key: "client", label: "Client" },
{ key: "issueDate", label: "Issue Date", className: "table-cell" },
{ key: "dueDate", label: "Due Date", className: "table-cell" },
{ key: "amount", label: "Amount" },
{ key: "status", label: "Status" },
{ key: "action", label: "Action", className: "text-center" },
] as const;

const statusOptions = [
{ value: "all", label: "All" },
{ value: "paid", label: "Paid" },
{ value: "pending", label: "Pending" },
{ value: "overdue", label: "Overdue" },
] as const;



export default function Invoices() {
const [invoices, setInvoices] = useState<any>([]);
const [showModal, setShowModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const filteredInvoices = invoices?.filter((invoice:any) => {
const matchesSearch =
  invoice?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) || invoice?.client?.name?.toLowerCase().includes(searchTerm?.toLowerCase() );
  const matchesStatus = statusFilter === 'all' || invoice?.status.toLowerCase() === statusFilter;
  return matchesSearch && matchesStatus;
});

const { data, loading } = useQuery<getInvoiceData>(ALL_INVOICES, {
  fetchPolicy: "cache-first",
});

useEffect(() => {
  if(data?.invoices){
    setInvoices(data?.invoices)
  }
}, [data])

  const { data:client} = useQuery<GetClientTypes>(ALL_CLIENTS);
  const clients = client ? client.clients: []
  
  const [removeInvoice] = useMutation(REMOVE_INVOICE)
  const handleDeleteInvoice = async(id:string) => {
    await asyncHandlerFront(
      async() => {
        await removeInvoice({
          variables: { id }
        });
        setInvoices((prev:any) => prev.filter((c:any) => c.id !== id))
      },
      (error) => toast.error(error.message)
    )
  }


  const handleDownload = () => {
    if (!invoices || !invoices.length) {
      toast.error("No invoices to download!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoices Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableColumn = ["Invoice #", "Client", "Issue Date", "Due Date", "Amount", "Status"];
    const tableRows: any[] = [];

    invoices.forEach((invoice: any) => {
      const invoiceData = [
        `INV-${invoice.id.split("-")[0]}`,
        invoice.client?.name,
        new Date(invoice.issueDate).toLocaleDateString(),
        new Date(invoice.dueDate).toLocaleDateString(),
        `Rs ${invoice.total.toLocaleString()}`,
        invoice.status,
      ];
      tableRows.push(invoiceData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 215, 0], textColor: 0 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      columnStyles: {
        4: { halign: "justify" },
        5: { halign: "justify" },
      },
    });

    doc.save("Invoices_Report.pdf");
  };


  if(loading) return <InvoicesSkeleton />

  return (
    <div className="px-4 py-4 sm:py-6 md:px-6 lg:px-8 animate-fade-in pb-20">
      <div className="mx-auto mb-6 max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-gold"> Invoices </h1>
          <p className="mt-1 flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
            <FileText className="h-4 w-4 text-gold" /> Manage and track all your invoices
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-gradient-gold text-primary-foreground shadow-gold hover:shadow-glow transition">
          <PlusCircle className="mr-2 h-4 w-4" /> New Invoice
        </Button>
      </div>

      <InvoiceModel showModal={showModal} setShowModal={setShowModal} clients={clients} />

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
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}> {status.label} </SelectItem>
                  ))}
              </SelectContent>
              </Select>
              <Button onClick={handleDownload} variant="outline" className="border-border text-foreground hover:bg-accent/10"> 
                <Download className="mr-2 h-4 w-4" /> Export 
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="mx-auto max-w-6xl bg-gradient-card shadow-lg border border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto md:overflow-visible">
            <Table className="w-full text-xs sm:text-sm">
              {/* TABLE HEADER */}
              <TableHeader>
                <TableRow className="bg-muted/40">
                  {invoiceTableColumns.map((col) => (
                    <TableHead key={col.key} className={col.className}>
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* TABLE BODY */}
              <TableBody>
                {filteredInvoices?.length ? (
                  filteredInvoices?.map((invoice: any) => (
                    <TableRow key={invoice?.id} className="hover:bg-accent/5 transition" >
                      <TableCell className="font-semibold text-gold whitespace-nowrap"> {`INV-${invoice?.id?.split('-')[0]}`} </TableCell>
                      <TableCell> <div className="font-semibold text-foreground leading-tight"> {invoice?.client?.name} </div> </TableCell>
                      <TableCell className="table-cell whitespace-nowrap"> {new Date(invoice?.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell className="table-cell whitespace-nowrap"> {new Date(invoice?.dueDate).toLocaleDateString()} </TableCell>
                      <TableCell className="font-bold text-gold whitespace-nowrap"> Rs {invoice?.total.toLocaleString()} </TableCell>
                      <TableCell> <StatusBadge status={invoice?.status?.toLowerCase()} /> </TableCell>

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
                          onClick={() => handleDeleteInvoice(invoice?.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center"> <p className="text-muted-foreground"> No invoices found </p> </TableCell>
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