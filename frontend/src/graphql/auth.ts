import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query {
    me {
      id
      email
      companyInfo {
        taxRate
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        id
        name
        email
        role
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignupUserInput!) {
    signUp(signupUserInput: $input) {
      name
      email
      role
      isVerified
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($email: String!, $otp: Int!) {
    verifyEmail(email: $email, otp: $otp) {
      isVerified
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email){
            success
            message
        }
    },
`

export const RESEND_OTP_MUTATION = gql`
  mutation resendOtp($email: String!) {
    resendOtp(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation updatePassword(
    $oldPassword: String!
    $newPassword: String!
    $token: String!
  ) {
    updatePassword(
      oldPassword: $oldPassword
      newPassword: $newPassword
      token: $token
    ) {
      success
      message
    }
  }
`;