import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($input: ProductGetManyInput!) {
    products {
      getMany(input: $input) {
        data {
          id
          name
          photo
          desc
          price
          category {
            id
            name
          }
        }
        pagination {
          pageSize
          pageNumber
          total
        }
        sorting {
          type
          field
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      photo
      desc
      price
      oldPrice
      category {
        id
        name
        photo
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      photo
      desc
      price
      oldPrice
      category {
        id
        name
        photo
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      photo
      desc
      price
      oldPrice
      category {
        id
        name
        photo
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      getMany {
        data {
          id
          name
          photo
          createdAt
          updatedAt
        }
      }
    }
  }
`; 