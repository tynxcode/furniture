import { Field, Float, Int ,ObjectType } from "@nestjs/graphql"

@ObjectType()
export class OrderProductDetail {
    @Field()
    name: string;

    @Field(type => Int)
    price: number;

    @Field({ defaultValue: 'No brand' })
    brand: string;

    @Field(type => Float, { defaultValue: 0 })
    discount: number

    @Field()
    image_path: string;
}

@ObjectType()
export class OrderProduct {
    @Field(type => OrderProductDetail)
    product: OrderProductDetail

    @Field(type => Int)
    quantity: number

    @Field(type => Float)
    total_price: number
}

@ObjectType()
export class OrderCustomer {
    @Field()
    fullname: string

    @Field()
    address: string

    @Field()
    phone: string

    @Field()
    email: string
}

@ObjectType()
export class Order {
    @Field()
    code: string

    @Field(type => OrderCustomer)
    customer: OrderCustomer

    @Field(type => [OrderProduct])
    products: OrderProduct[]

    @Field(type => Float)
    payment_amount: number

    @Field()
    status: string

    @Field(type => Float)
    transport_fee: number

    @Field(type => Date)
    purchase_time: Date
}