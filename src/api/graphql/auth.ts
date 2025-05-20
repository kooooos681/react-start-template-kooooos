import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
        profile {
          id
          email
          name
          signUpDate
          commandId
        }
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        token
        profile {
          id
          email
          name
          signUpDate
          commandId
        }
      }
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    profile {
      id
      email
      name
      signUpDate
      commandId
    }
  }
`; 