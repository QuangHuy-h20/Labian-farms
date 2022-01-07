import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { Farm } from "./Farm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
