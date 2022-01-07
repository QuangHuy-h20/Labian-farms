import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
export class Farm extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ unique: true })
  slug!: string;

  @Field()
  @Column()
  address!: string;

  @Field({ nullable: true })
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
  userId!: number;

  @Field((_return) => User)
  @ManyToOne(() => User, (user) => user.farms)
  user: User;

  @OneToMany(()=> Product, produtc => produtc.farm)
  products: Product[]

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
