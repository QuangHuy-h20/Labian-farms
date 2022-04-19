import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  originalPrice: number;

  @Field()
  price: number;

  @Field()
  totalInventory: number;

  @Field()
  unit: string;

  @Field()
  categoryQuery: string;

  @Field()
  categoryId: number;

  @Field()
  farmId: string;
}

@InputType()
export class UpdateProductInput extends CreateProductInput {
  @Field()
  id: string;
}

@InputType()
export class SearchInput {
  @Field({ nullable: true })
  name?: string;
  
  @Field({ nullable: true })
  unAccentName?: string;
}
