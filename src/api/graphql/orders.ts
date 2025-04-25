import { gql } from '@apollo/client';

export const GET_ORDERS_QUERY = gql`
  query GetOrders {
    orders {
      id
      products {
        id
        name
        price
        image
        quantity
      }
      status
      total
      createdAt
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      products {
        id
        name
        price
        image
        quantity
      }
      status
      total
      createdAt
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