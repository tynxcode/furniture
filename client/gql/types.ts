import { OrderInterface } from '../interface/order';
import { ProductInterface } from '../interface/product'
import { ProfileInterface } from '../interface/profile';

export interface GetProductsByCategoryVars {
  category: string,
  limit?: number
  skip?: number
}

export interface GetProductsByCategoryData {
  getProductsByCategory: ProductInterface[]
}

export interface GetShopProductsVars {
  name?: string
  price?: number
  category?: string
  limit?: number
}

export interface GetShopProductsData {
  getShopProducts: ProductInterface[]
}

export interface ProfileData {
 profile: ProfileInterface
}

export interface UpdateProfileData {
  updateProfile: ProfileInterface
}

export interface UpdateProfileVars {
  info: {
    fullname?: string,
    email?: string,
    image_path?: string,
    address?: string,
    phone?: string 
  }
}

export interface UpdatePasswordData {
  updatePassword: ProfileInterface
}

export interface UpdatePasswordVars {
  info: {
    currentPassword: string
    newPassword: string
  }
}

export interface CreateOrderArgs {
  order: {
    products: {
      product: {
        name: string
        brand: string
        price: number
        image_path: string
        discount: number
      }
      quantity: number
      total_price: number
    } []
    payment_amount: number
  }
}

export interface CreateOrderData {
  createOrder: {
    code: string
  }
}

export interface GetOrderByCodeData {
  getOrderByCode: OrderInterface
}

export interface GetOrderByCodeVars {
  code: string
}

export interface GetOrdersByCodeData {
  getOrdersByCode: OrderInterface[]
}

export interface GetOrdersByCodeVars {
  code: string[]
}