import { ProductInterface } from "./product";

export interface CartItemInterface {
    product: ProductInterface
    quantity: number
    total_price?: number
}