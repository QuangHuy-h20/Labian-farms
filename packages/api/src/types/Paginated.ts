
import { Product } from "../entities/Product";
import { Field, Int, ObjectType } from "type-graphql";
import { Farm } from "../entities/Farm";
import { Tour } from "../entities/Tour";

@ObjectType()
export class Pagination {
  @Field(() => Int)
  first?: number = 15;
  @Field(() => Int)
  page?: number = 1;
}

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
export class PaginatorInfo {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  firstItem: number;

  hasMorePages: boolean;

  @Field(() => Int)
  lastItem: number;

  @Field(() => Int)
  lastPage: number;

  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class ProductPaginator {
  @Field((_type) => [Product])
  data: Product[];

  @Field()
  paginatorInfo: PaginatorInfo;
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

@ObjectType()
export class PaginatedTours extends Paginated {

  @Field((_type) => [Tour])
  paginatedTours!: Tour[];
}
