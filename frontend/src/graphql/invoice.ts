import { gql } from "@apollo/client";

export const ALL_INVOICES = gql`
    query {
        invoices{
        id,
        clientId,
        client {
           name
        },
        issueDate,
        dueDate,
        items { description, quantity, rate },
        total,
        status,
      }
    }
`

export const INVOICE_MUTATION = gql`
    mutation CreateInvoice($input: CreateInvoiceInput!, $clientId: String!) {
        createInvoice(createInvoiceInput: $input, clientId:$clientId) {
            id,
            issueDate,
            dueDate,
            items { description, quantity, rate },
            total,
            status,
        }
    }
`

export const UPDATE_INVOICE_MUTATION = gql`
    mutation UpdateMutation($input: UpdateInvoiceInput!) {
        updateInvoice(updateInvoiceInput: $input) {
            id,
            issueDate,
            dueDate,
            items { description, quantity, rate },
            total,
            status,
        }
    }
`


export const REMOVE_INVOICE = gql`
    mutation RemoveInvoice($id: String!) {
        removeInvoice(id: $id)
    }
`