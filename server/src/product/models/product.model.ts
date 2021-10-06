import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql'


@ObjectType()
export class Review {
    @Field(type => Int)
    total: number

    @Field(type => Float)
    review_point: number
}

@ObjectType()
export class Product {
    @Field(type => ID)
    id?: string;

    @Field()
    name: string;

    @Field(type => Int)
    price: number;

    @Field({ defaultValue: 'No brand' })
    brand: string;

    @Field({ defaultValue: 'No description' })
    description: string;

    @Field(type => Float, { defaultValue: 0 })
    discount: number

    @Field()
    image_path: string;

    @Field()
    category: string;

    @Field(type => Review)
    review: Review

    @Field(type => Date)
    create_date?: Date;
}
