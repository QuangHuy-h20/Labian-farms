import { Gender } from "../../entities/User";
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
    phone: string

    @Field()
    password: string
}

@InputType()
export class ProfileInput {

    @Field({ nullable: true })
    fullName?: string

    @Field({ nullable: true })
    nickname?: string

    @Field(_type => Gender, { nullable: true })
    gender: Gender

    @Field({ nullable: true })
    dateOfBirth?: Date

    @Field({ nullable: true })
    address?: string
}

@InputType()
export class ForgotPasswordInput {
    @Field()
    email: string
}

@InputType()
export class ResetPasswordInput {
    @Field()
    newPassword: string

    @Field()
    confirmPassword: string
}

@InputType()
export class ChangePasswordInput extends ResetPasswordInput {
    @Field()
    oldPassword: string
}

