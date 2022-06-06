import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { CoreEntity } from "./CoreEntity";
import { Farm } from "./Farm";
import { OrderItem } from "./OrderItem";

@ObjectType()
@Entity()
export class Product extends CoreEntity {
  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  unAccentName!: string;

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
  originalPrice!: number;

  @Field()
  @Column({ default: 0 })
  stock!: number;

  @Field()
  @Column({ default: "" })
  unit!: string;

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
  @Column({ default: false })
  isActive: boolean;

  @Field()
  @Column()
  categoryId!: string;

  @Field((_type) => Category)
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Field()
  @Column()
  farmId!: number;

  @Field((_type) => Farm)
  @ManyToOne(() => Farm, (farm) => farm.products)
  farm: Farm;

  @OneToMany(() => OrderItem, (item) => item.productId)
  orderItems: Promise<OrderItem[]>;
}
