import { ObjectType, Field } from "type-graphql";
import { IMutationResponse } from "../../types/MutationResponse";
import { FieldError } from "../../types/FieldError";
import { Category } from "../../entities/Category";

@ObjectType({ implements: IMutationResponse })
export class CategoryMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field({ nullable: true })
  category?: Category;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
