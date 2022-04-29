import { Field, ObjectType } from "type-graphql";
import { Product } from "../../entities/Product";
import { IMutationResponse } from "../../types/MutationResponse";
import { FieldError } from "../../types/FieldError";

@ObjectType({ implements: IMutationResponse })
export class ProductMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field()
  product?: Product;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
