import { gql } from '@apollo/client';

export const GET_ORDERS_QUERY = gql`
  query GetOrders($input: OrderGetManyInput!) {
    orders {
      getMany(input: $input) {
        data {
          id
          products {
            _id
            quantity
            product {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation AddOrder($input: OrderAddInput!) {
    orders {
      add(input: $input) {
        id
        products {
          _id
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`;

export const REMOVE_ORDER_MUTATION = gql`
  mutation RemoveOrder($id: ID!) {
    orders {
      remove(id: $id) {
        id
        products {
          _id
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`;

export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatus($id: ID!, $status: OrderStatus!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
    }
  }
`; 