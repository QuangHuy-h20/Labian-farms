import { Field, ObjectType } from "type-graphql";
import { UserRole } from "../../../entities/UserRole";
import { IMutationResponse } from "../../types/MutationResponse";
import { FieldError } from "../../types/FieldError";

@ObjectType({ implements: IMutationResponse })
export class RoleMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field()
  role?: UserRole;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
