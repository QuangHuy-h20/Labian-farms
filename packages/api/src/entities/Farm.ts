import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Field()
  @Column({ nullable: true })
  image: string;

  @Field()
  @Column({ default: 1 })
  status: number;

  @Field()
  @Column()
  ownerId!: number;

  @Field((_return) => User)
  @ManyToOne(() => User, (owner) => owner.farms)
  owner: User;

  @OneToMany(()=> Product, product => product.farm)
  products: Product[]

}
