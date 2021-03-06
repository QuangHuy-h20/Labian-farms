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

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ default: 0 })
  price!: number;

  @Field()
  @Column({ default: 0 })
  priceRoot!: number;

  @Field()
  @Column({ default: 0 })
  totalInventory!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  unit: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  image1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image2: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image3: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image4: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image5: string;

  @Field()
  @Column()
  categoryId!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryQuery: string;

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
