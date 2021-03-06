
import { Product } from "../entities/Product";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedProducts {
  @Field()
  totalCount!: number;

  @Field((_type) => Date)
  cursor!: Date;

  @Field()
  hasMore!: boolean;

  @Field((_type) => [Product])
  paginatedProducts!: Product[];
}
