import { ArgsType, Field, ID, Int } from '@nestjs/graphql'

@ArgsType()
export class FilterProductsArgs {
    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    category?: string
    
    @Field(type => Int, { nullable: true })
    price?: number
}

@ArgsType()
export class GetProductOptionsArgs {
    @Field(type => Int ,{ nullable: true })
    limit?: number
}