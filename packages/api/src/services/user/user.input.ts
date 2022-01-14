import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {

    @Field()
    loginField: string

    @Field()
    password: string
}

@InputType()
export class RegisterInput {

    @Field()
    email: string

    @Field()
    phoneNumber: string

    @Field()
    password: string
}

@InputType()
export class ProfileInput {

    @Field()
    fullName: string
    
    @Field()
    nickname: string

    @Field()
    gender: string

    @Field()
    dateOfBirth: Date

    @Field()
    address: string
}

@InputType()
export class ChangePasswordInput {

    @Field()
    oldPassword: string

    @Field()
    newPassword: string

    @Field()
    confirmPassword: string
}

