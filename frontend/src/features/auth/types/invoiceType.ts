type InvoiceItem = {
  description: string;
  quantity: number;
  rate: number;
}

export type Invoice = {
    id: string,
    clientId: string,
    client: {
        name: string
    },
    issueDate: string,
    dueDate: string,
    items: InvoiceItem[]
    total: number,
    status: string,
}

export type getInvoiceData = {
    invoices: Invoice[]
}