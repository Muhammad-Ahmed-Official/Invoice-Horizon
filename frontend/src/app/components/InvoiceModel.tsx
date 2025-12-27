''

import { useState } from 'react'
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
import { Loader, Plus, Trash2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';
import { invoiceSchema } from '@/features/auth/schemas/invoiceSchema';
import { asyncHandlerFront } from '@/utils/asyncHandler';
import { apiClient } from '@/lib/apiClient';

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



export default function InvoiceModel({showModal, setShowModal} : any) {
  const {register, control, reset, handleSubmit, watch, setValue, formState: { isSubmitting, errors } } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      client: "",
      issueDate: undefined,
      dueDate: undefined,
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


    const onsubmit = async(data:z.infer< typeof invoiceSchema>) => {
      console.log(data);
      await asyncHandlerFront(
        async() => {
          // await apiClient
        }
      )
      reset();
    }

  return (
    showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    <div className="w-full max-w-5xl  rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] p-6 animate-fade-in">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <h2 className="text-2xl font-bold text-gradient-gold">Create New Invoice</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
          ✕
        </Button>
      </div>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
        {/* Invoice Details */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-muted-foreground">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client" className='text-sm font-medium text-foreground/80' >Client</Label>
                  <Controller
                    control={control}
                    name="client"
                    rules={{ required: "Client is required" }}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockClients.map((c) => (
                            <SelectItem key={c.id} value={c.name}>
                              {c.name} - {c.company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                { errors.client && ( <p className="text-sm text-red-500">{errors.client.message}</p> )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate" className='text-sm font-medium text-foreground/80'>Issue Date</Label>
                <Input id="issueDate" type="date" {...register("issueDate")}  required />
                { errors.issueDate && ( <p className="text-sm text-red-500">{errors.issueDate.message}</p> )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate" className='text-sm font-medium text-foreground/80'>Due Date</Label>
                <Input id="dueDate" type="date" {...register("dueDate")} required />
                { errors.dueDate && ( <p className="text-sm text-red-500">{errors.dueDate.message}</p> )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card className="shadow-lg border-0">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-muted-foreground">Line Items</CardTitle>
           <Button type="button" onClick={() => append({ description: "", quantity: 1, rate: 0 })}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
          </CardHeader>
         <CardContent>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start mb-2">
                  <Input placeholder="Description" {...register(`items.${index}.description` as const)} />
                  <Input type="number" min="1" {...register(`items.${index}.quantity` as const, { valueAsNumber: true })} />
                  <Input type="number" min="0" step="0.01" {...register(`items.${index}.rate` as const, { valueAsNumber: true })} />
                  <Input value={`$${(items[index].quantity * items[index].rate).toFixed(2)}`} disabled />
                  <Button type="button" onClick={() => remove(index)}> <Trash2 className='h-4 w-4' /> </Button>
                </div>
              ))}
            </CardContent>
        </Card>

        {/* Summary */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-muted-foreground">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (18%):</span>
              <span>Rs {tax}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold ">Total:</span>
              <span className="text-xl font-bold text-gradient-gold">Rs {total}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting} className="bg-gold hover:bg-gold-light text-charcoal font-semibold">
            {isSubmitting ? <span className='flex items-center gap-1'> Creating.... <Loader className='animate-spin' /> </span> : 
            (<span className='flex items-center gap-1'> Create Invoice</span>)}
          </Button>
         
        </div>
      </form>
    </div>
  </div>
)
)
}


{/* <Button type="submit" className="bg-gradient-gold text-primary-foreground shadow-gold hover:shadow-glow">
Create Invoice
</Button> */}