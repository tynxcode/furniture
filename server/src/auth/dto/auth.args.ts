import { Field, ArgsType } from "@nestjs/graphql";

@ArgsType()
export class SigninArgs {
    @Field()
    username: string
    
    @Field()
    password: string
}