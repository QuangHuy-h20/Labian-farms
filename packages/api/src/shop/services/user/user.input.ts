import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput{
    
    @Field()
    emailOrPhoneNumber: string

    @Field()
    password: string
}

@InputType()
export class RegisterInput{

    @Field()
    email: string

    @Field()
    phoneNumber: string
    
    @Field()
    password: string
}

