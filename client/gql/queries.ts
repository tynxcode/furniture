import { gql } from '@apollo/client'

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query Products($category: String!, $limit: Int, $skip: Int) {
    getProductsByCategory(category: $category, limit: $limit, skip: $skip) {
      id
      name
      brand
      price
      discount
      review {
        review_point
      }
      image_path
    }
  }
`

export const GET_SHOP_PRODUCTS = gql`
  query Products($name: String, $price: Int, $category: String, $limit: Int) {
    getShopProducts(name: $name, price: $price, category: $category, limit: $limit) {
      id
      name
      brand
      price
      discount
      review {
        review_point
      }
      image_path
      create_date
    }
  }
`

export const GET_LATEST_PRODUCT = gql`
  query Products{
    getLatestProduct {
      id
      name
      brand
      price
      discount
      review {
        review_point
      }
      image_path
      description
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query Product($_id: ID!) {
    getProductById(id: $_id) {
      id
      name
      brand
      price
      discount
      review {
        total
        review_point
      }
      image_path
      description
    }
  }
`

export const SIGN_IN = gql`
  query SignIn($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      user {
        name
        email
        image
        roles
      }
      access_token
    }
  }
`

export const PROFILE = gql`
  query Profile {
    profile {
      username
      email
      address
      phone
      fullname
      orders
      image_path
    }
  }
`
export const GET_ORDER_BY_CODE = gql`
  query Order($code: String!) {
    getOrderByCode(code: $code) {
      code
      customer {
        fullname
        address
        phone
        email
      }
      products {
        product {
        name
        price
        brand
        discount
        image_path
      }
      quantity
      total_price
      }
      payment_amount
      status
      transport_fee
      purchase_time
    }
  }
`

export const GET_ORDERS_BY_CODE = gql`
  query Orders($code: [String!]!) {
    getOrdersByCode(code: $code) {
      code
      customer {
        fullname
        address
        phone
        email
      }
      products {
        product {
        name
        price
        brand
        discount
        image_path
      }
      quantity
      total_price
      }
      payment_amount
      status
      transport_fee
      purchase_time
    }
  }
`