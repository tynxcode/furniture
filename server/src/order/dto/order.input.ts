import { Field, InputType, Int, Float } from "@nestjs/graphql";

@InputType()
export class OrderProductDetailInput {
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

@InputType()
export class OrderProductInput {
    @Field(type => OrderProductDetailInput)
    product: OrderProductDetailInput

    @Field(type => Int)
    quantity: number

    @Field(type => Float)
    total_price: number
}

@InputType()
export class NewOrderInput {
    @Field(type => [OrderProductInput])
    products: OrderProductInput[]

    @Field(type => Float)
    payment_amount: number

}