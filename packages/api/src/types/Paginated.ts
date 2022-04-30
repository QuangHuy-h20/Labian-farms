
import { Product } from "../entities/Product";
import { Field, ObjectType } from "type-graphql";
import { Farm } from "../entities/Farm";

@ObjectType()
export class Paginated {
  @Field()
  totalCount!: number;

  @Field((_type) => Date)
  cursor!: Date;

  @Field()
  hasMore!: boolean;

}
@ObjectType()
export class PaginatedProducts extends Paginated {
  @Field((_type) => [Product])
  paginatedProducts!: Product[];
}

@ObjectType()
export class PaginatedFarms extends Paginated {
  
  @Field((_type) => [Farm])
  paginatedFarms!: Farm[];
}
