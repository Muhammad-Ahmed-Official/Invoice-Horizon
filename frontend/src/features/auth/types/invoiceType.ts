export type getInvoiceData = {
     invoices: {
        id: string,
        clientId: string,
        client: {
           name: string
        },
        issueDate: string,
        dueDate: string,
        items: {
            description: string, 
            quantity: number, 
            rate: number 
        },
        total: number,
        status: string,
    }
}