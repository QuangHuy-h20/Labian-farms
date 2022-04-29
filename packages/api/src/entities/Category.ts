import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { CoreEntity } from "./CoreEntity";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Category extends CoreEntity {

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ unique: true })
  slug!: string;

  @Field()
  @Column({ nullable: true })
  image: string
    
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

}
