import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSignIn {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    image: string

    @Field(type => [ID])
    roles: string[]
}

@ObjectType()
export class SignIn {
    @Field()
    user: UserSignIn

    @Field()
    access_token: string
}

