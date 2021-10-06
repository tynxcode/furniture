import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
    mutation updateProfile($info: UpdateProfileInput!) {
        updateProfile(info: $info) {
            username
            email
            address
            phone
            fullname
            image_path
            orders
        }
    }
`

export const UPDATE_PASSWORD = gql`
    mutation profile($info: UpdatePasswordInput!) {
        updatePassword(info: $info) {
            username
            email
            address
            phone
            fullname
            image_path
            orders
        }
    }
`

export const CREATE_NEW_ORDER = gql`
    mutation order($order: NewOrderInput!) {
        createOrder(order: $order) {
            code
        }
    }
`