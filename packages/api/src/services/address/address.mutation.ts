import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types/MutationResponse";
import { FieldError } from "../../types/FieldError";
import { Address } from "../../entities/Address";

@ObjectType({ implements: IMutationResponse })
export class AddressMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field({ nullable: true })
  address?: Address;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
