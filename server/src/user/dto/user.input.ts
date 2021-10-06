import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class SignUpInput {
    @Field()
    username: string

    @Field()
    password: string

    @Field()
    fullname: string

    @Field()
    email: string

    @Field()
    address: string

    @Field()
    image_path: string

    @Field()
    phone: string
}

@InputType()
export class UpdateProfileInput {
    @Field({ nullable: true })
    fullname?: string

    @Field({ nullable: true })
    email?: string

    @Field({ nullable: true })
    image_path?: string

    @Field({ nullable: true })
    address?: string

    @Field({ nullable: true })
    phone?: string
}

@InputType()
export class UpdatePasswordInput {
    @Field()
    currentPassword: string

    @Field()
    newPassword: string
}