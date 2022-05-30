import { Field, ObjectType } from "type-graphql";
import { Tour } from "../../entities/Tour";
import { IMutationResponse } from "../../types/MutationResponse";
import { FieldError } from "../../types/FieldError";

@ObjectType({ implements: IMutationResponse })
export class TourMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field({ nullable: true })
  tour?: Tour;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
