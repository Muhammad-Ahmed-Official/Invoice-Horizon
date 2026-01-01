import { gql } from "@apollo/client";

export const ME_SETTING = gql`
    query {
        getSetting {
            companyName
            email
            phone
            address
            taxRate
            paymentTerms
         }
    }
`

export const SETTING_MUTATION = gql`
    mutation CreateSetting($input: CreateSettingInput!) {
        createSetting(createSettingInput: $input) {
            companyName  
            email       
            phone     
            address 
            taxRate  
            paymentTerms
        }
    }
`

export const UPDATE_SETTING = gql`
    mutation UpdateSetting($input: UpdateSettingInput!) {
        updateSetting(updateSettingInput: $input) {
            companyName  
            email       
            phone     
            address 
            taxRate  
            paymentTerms
        }
    }
`