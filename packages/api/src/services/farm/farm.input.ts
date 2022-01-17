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

@InputType()
export class UpdateFarmInput {

  @Field()
  id: string

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  description: string;
}