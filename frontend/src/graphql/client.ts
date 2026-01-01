import { gql } from "@apollo/client";

export const ALL_CLIENTS = gql`
    query {
        clients{
        id,
        name,
        email,
        phone,
        role
      }
    }
`

export const CLIENT_MUTATION = gql`
    mutation CreateClient($input: CreateClientInput!) {
        createClient(createClientInput: $input) {
            name,
            email,
            phone,
            role
        }
    }
`

export const UPDATE_CLIENT_MUTATION = gql`
    mutation UpdateMutation($input: UpdateClientInput!) {
        updateClient(updateClientInput: $input) {
            id,
            name,
            email,
            phone,
            role
        }
    }
`


export const REMOVE_CLIENT = gql`
    mutation RemoveClient($id: String!) {
        removeClient(id: $id)
    }
`