// 'use client'

import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';
import { invoiceSchema } from '@/features/auth/schemas/invoiceSchema';
import { asyncHandlerFront } from '@/utils/asyncHandler';
import { useMutation } from '@apollo/client/react';
import { ALL_INVOICES, INVOICE_MUTATION } from '@/graphql/invoice';

export const mockClients = [
  {
    id: '590d0736-1736-4ad2-bd09-7cc017f9e23e',
    name: 'Aleeza',
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



export default function InvoiceModel({showModal, setShowModal} : any) {
  const {register, control, reset, handleSubmit, watch, formState: { isSubmitting, errors } } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientId: "",
      issueDate: undefined,
      dueDate: undefined,
      status: "PENDING",
      total: 1,
      items: [{ description: "", quantity: 1, rate: 0 }],
    }
  })

    const { fields, append, remove } = useFieldArray({
      control,
      name: "items"
    });

    const items = watch("items") as any;

    const subtotal = items.reduce((sum:any, item:any) => sum + item.quantity * item.rate, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const [invoiceMutation] = useMutation<any>(INVOICE_MUTATION, {
      update(cache, { data }) {
        if (!data?.createInvoice) return;

        const existing = cache.readQuery<any>({
          query: ALL_INVOICES,
        });

        if (!existing?.invoices) return;

        cache.writeQuery({
          query: ALL_INVOICES,
          data: {
            invoices: [...existing.invoices, data.createInvoice],
          },
        });
      },
    });

    const onsubmit = async(data:z.infer< typeof invoiceSchema>) => {
      console.log(data);
      await asyncHandlerFront(
        async() => {
          await invoiceMutation({
            variables: {
              clientId: data.clientId,  
              input: {
                issueDate: data.issueDate,
                dueDate: data.dueDate,
                items: data.items,
                total: Number(total),
                status: data.status, 
              },
            },
          }); 
        }
      )
      reset();
      setShowModal(false);
    }

  return (
    (showModal && 

    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full sm:max-w-3xl lg:max-w-5xl bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto p-4 sm:p-6 animate-fade-in">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-lg sm:text-2xl font-bold text-gradient-gold">
            Create New Invoice
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
            ✕
          </Button>
        </div>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">

          {/* Invoice Details */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">

              {/* Client */}
              <div className="space-y-2">
                <Label>Client</Label>
                <Controller
                  control={control}
                  name="clientId"
                  rules={{ required: 'Client is required' }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClients.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.clientId && ( <p className="text-xs text-red-500"> {errors.clientId.message as string} </p> )}
              </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-foreground/80">Client Type</Label>
                    <Controller
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <Select value={field.value ?? undefined} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full h-10 sm:h-11">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PAID">Paid</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="OVERDUE">Overdue</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

              {/* Issue Date */}
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input type="date" {...register('issueDate')} />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" {...register('dueDate')} />
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
         <Card className="border-0 shadow-md">
  <CardHeader>
    <CardTitle className="text-muted-foreground">
      Line Items
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    {/* Desktop/Large Screen Layout */}
    <div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center md:pb-2 md:px-2 text-sm text-muted-foreground">
      <div className="md:col-span-5">Description</div>
      <div className="md:col-span-2">Quantity</div>
      <div className="md:col-span-2">Rate</div>
      <div className="md:col-span-2">Total</div>
      <div className="md:col-span-1">Actions</div>
    </div>

    {fields.map((field, index) => (
      <div
        key={field.id}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-2 md:p-0 border md:border-0 rounded-lg md:rounded-none"
      >
        {/* Description - Full width on mobile, 5 columns on desktop */}
        <div className="md:col-span-5">
          <label className="md:hidden text-xs text-muted-foreground mb-1">
            Description
          </label>
          <Input
            placeholder="Enter description"
            className="w-full"
            {...register(`items.${index}.description`)}
          />
        </div>

        {/* Quantity and Rate - Grid on mobile, separate columns on desktop */}
        <div className="grid grid-cols-2 gap-4 md:contents">
          <div className="md:col-span-2">
            <label className="md:hidden text-xs text-muted-foreground mb-1">
              Quantity
            </label>
            <Input
              type="number"
              min="1"
              placeholder="Qty"
              className="w-full"
              {...register(`items.${index}.quantity`, {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="md:hidden text-xs text-muted-foreground mb-1">
              Rate
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="Rate"
              className="w-full"
              {...register(`items.${index}.rate`, {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        {/* Total - Full width on mobile, 2 columns on desktop */}
        <div className="md:col-span-2">
          <label className="md:hidden text-xs text-muted-foreground mb-1">
            Total
          </label>
          <Input
            disabled
            className="w-full font-semibold bg-muted/50"
            value={`Rs ${(items[index].quantity * items[index].rate).toFixed(2)}`}
          />
        </div>

        {/* Actions - Full width on mobile, 1 column on desktop */}
        <div className="flex justify-end md:col-span-1">
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() =>
                append({ description: '', quantity: 1, rate: 0 })
              }
              className="flex-1 md:flex-none"
              aria-label="Add item"
            >
              +
            </Button>
            
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                className="flex-1 md:flex-none"
                aria-label="Remove item"
              >
                −
              </Button>
            )}
          </div>
        </div>
      </div>
    ))}

    {/* Add First Item Button (when no items exist) */}
    {fields.length === 0 && (
      <div className="text-center py-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ description: '', quantity: 1, rate: 0 })}
          className="mx-auto"
        >
          + Add First Item
        </Button>
      </div>
    )}
  </CardContent>  
          </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Subtotal</div>
                <div className="text-right font-medium">Rs {subtotal}</div>
                
                <div className="text-muted-foreground">Tax (18%)</div>
                <div className="text-right font-medium">Rs {tax}</div>
              </div>
              
              <div className="border-t border-dashed my-2"></div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Total</div>
                  <div className="text-xs text-muted-foreground">All taxes included</div>
                </div>
                <div className="text-2xl font-bold bg-gold bg-clip-text text-transparent">
                  Rs {total}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gold text-charcoal"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  Creating <Loader className="animate-spin h-4 w-4" />
                </span>
              ) : (
                'Create Invoice'
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
)
}