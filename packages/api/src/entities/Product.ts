import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";
import { CoreEntity } from "./CoreEntity";
import { Farm } from "./Farm";

@ObjectType()
@Entity()
export class Product extends CoreEntity {
  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  slug!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ default: 0 })
  price!: number;

  @Field()
  @Column({ default: 0 })
  inventoryTotal!: number;

  @Field()
  @Column({ nullable: true })
  image: string;

  @Field()
  @Column()
  categoryId!: number;

  @Field((_type) => Category)
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Field()
  @Column()
  farmId!: number;

  @Field(_type => Farm)
  @ManyToOne(() => Farm, (farm) => farm.products)
  farm: Farm;

}
