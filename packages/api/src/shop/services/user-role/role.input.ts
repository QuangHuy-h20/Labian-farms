import { Field, InputType } from "type-graphql";

@InputType()
export class CreateRoleInput{

    @Field()
    id: string
    
    @Field()
    roleName: string

}