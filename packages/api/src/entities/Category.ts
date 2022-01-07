import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ unique: true })
  slug!: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;
}
