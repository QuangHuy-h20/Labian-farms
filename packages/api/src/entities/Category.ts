import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Category extends BaseEntity{

  @Field()
  @PrimaryColumn({ unique: true })
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

}
