import { InputType, Field, Int, ID, Float } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
    @Field()
    name: string;

    @Field(type => Int)
    price: number;

    @Field({ defaultValue: 'No brand' })
    brand: string;

    @Field()
    category: string;

    @Field()
    image_path: string;

    @Field({ nullable: true })
    description?: string;

}

@InputType()
export class UpdateProductInput {
    @Field(type => ID)
    id: string

    @Field({ nullable: true })
    name?: string;

    @Field(type => Int, { nullable: true })
    price?: number;

    @Field({ nullable: true })
    brand?: string;

    @Field({ nullable: true })
    image_path?: string;

    @Field({ nullable: true })
    description?: string;
}

@InputType()
class ReviewInput {
    @Field(type => Int)
    total: number

    @Field(type => Float)
    review_point: number
}

@InputType()
export class RatingProductInput {
    @Field(type => ID)
    id: string

    @Field(type => ReviewInput)
    review: ReviewInput
}