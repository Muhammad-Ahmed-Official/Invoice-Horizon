type FetchOptions = {
  query: string;
  variables?: Record<string, any>;
};

// import { gql } from "@apollo/client";
// export const LOGIN_MUTATION = gql`
//   mutation Login($input: LoginUserInput!) {
//     login(loginUserInput: $input) {
//       user {
//         id
//         name
//         email
//         role
//       }
//     }
//   }`;


class ApiClient {
  private async fetch<T>({ query, variables }: FetchOptions): Promise<T> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  }

    async isUser(){
        return this.fetch({
            query: `
                query me {
                    me {
                    id
                    email
                }
            }`,
        })
    }

    async logout(){
        return this.fetch({
            query: `
                mutation  {
                   logout
                }
            `
        })
    }

  
    async signUp(data:any){
        return this.fetch({
            query: `
                mutation SignUp($input: SignupUserInput!) {
                signUp(signupUserInput: $input) {
                    name
                    email
                    role
                    isVerified
                }
             }`,
            variables: {
                input: data,
            },
        });
    };

    async verifyEmail(email: string, otp: number) {
        return this.fetch({
            query: `
            mutation VerifyEmail($email: String!, $otp: Int!) {
                verifyEmail(email: $email, otp: $otp){
                    isVerified
                }
            }`,
            variables: { email, otp },
        });
    }

    async resendOtp(email: string,){
        return this.fetch({
           query: `
            mutation resendOtp($email: String!) {
                resendOtp(email: $email){
                    success
                    message
                }
            }`,
            variables: { email }, 
        });
    }


    async signIn(data:any){
        return this.fetch({
            query: `
            mutation Login($input: LoginUserInput!) {
                login(loginUserInput: $input) {
                    user {
                        id
                        name
                        email
                        role
                    }
                }
            }`,
            variables: { input: data },
        })
    };

    



    async forgotPassword({email} : {email:string}){
        return this.fetch({
            query:  `
            mutation resendOtp($email: String!) {
                resendOtp(email: $email){
                    success
                    message
                }
            }`,
            variables: { email }, 
        })
    };


    async updatePassword(oldPassword:string, newPassword:string){
        return this.fetch({
            query: `
            mutation updatePassword($oldPassword: String!, $newPassword: String!) {
                updatePassword(oldPassword:$oldPassword, newPassword:$newPassword){
                    success
                    message
                }
            }`,
            variables: { oldPassword, newPassword }
        })
    };


    async createClient(data:any){
        
    }

    async setting(data:any){
        
    }

    async createSetting(data:any){
        
    }

}

export const apiClient = new ApiClient();