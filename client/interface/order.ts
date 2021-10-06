export interface OrderProductInterface {
    product: {
        name: string
        price: number
        brand: string
        discount: number
        image_path: string
    }
    quantity: number
    total_price: number
}

export interface OrderCustomerInterface {
    fullname: string
    address: string
    phone: string
    email: string
}

export interface OrderInterface {
    code: string
    customer: OrderCustomerInterface
    products: OrderProductInterface[]
    payment_amount: number
    transport_fee: number
    status: string
    purchase_time: Date
}