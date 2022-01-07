import { Field, InputType } from "type-graphql";

@InputType()
export class CreateFarmInput {
  @Field()
  name: string;
  
  @Field()
  address: string;
  
  @Field()
  description: string;
}
