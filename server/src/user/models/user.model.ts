import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class User {
    @Field(type => ID)
    _id?: string

    @Field()
    username: string

    @Field()
    password: string

    @Field()
    email: string

    @Field()
    address: string

    @Field()
    phone: string

    @Field()
    image_path: string

    @Field()
    fullname: string

    @Field(type => [ID])
    orders: string[]

    @Field(type => [String])
    roles: string[]
}

@ObjectType()
export class Profile {
    @Field()
    username: string

    @Field()
    email: string

    @Field()
    address: string

    @Field()
    phone: string

    @Field()
    image_path: string

    @Field()
    fullname: string

    @Field(type => [ID])
    orders: string[]
}
