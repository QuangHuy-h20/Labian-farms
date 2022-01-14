import { Field, ObjectType } from "type-graphql";
import { Farm } from "../../entities/Farm";
import { IMutationResponse } from "../../types/MutationResponse";
import { FieldError } from "../../types/FieldError";

@ObjectType({ implements: IMutationResponse })
export class FarmMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field({ nullable: true })
  farm?: Farm;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
