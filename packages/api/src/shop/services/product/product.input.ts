import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProductInput{

    @Field()
    name: string
    
    @Field()
    description: string

    @Field()
    categoryId: number

    @Field()
    farmId: number

}