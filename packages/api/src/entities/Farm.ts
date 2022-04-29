import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { CoreEntity } from "./CoreEntity";
import { Product } from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
export class Farm extends CoreEntity {
  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ unique: true })
  slug!: string;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column({nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logoImage: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coverImage: string;

  @Field()
  @Column({ default: false })
  isActive: boolean;

  @Field()
  @Column()
  ownerId!: number;

  @Field((_return) => User)
  @ManyToOne(() => User, (owner) => owner.farms)
  owner: User;
  
  @Field(_type => [Product], { nullable: true })
  @OneToMany(()=> Product, product => product.farm)
  products: Product[]
  @RelationId((farm: Farm) => farm.products)
  productFarmIds: number[]

}
