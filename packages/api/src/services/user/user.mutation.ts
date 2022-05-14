import { IMutationResponse } from "../../types/MutationResponse";
import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";
import { FieldError } from "../../types/FieldError";

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field(_type => [String], { nullable: true })
  permissions?: string[] | undefined

  @Field({ nullable: true })
  user?: User;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
