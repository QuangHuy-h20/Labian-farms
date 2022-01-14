import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { CoreEntity } from "./CoreEntity";
import { Farm } from "./Farm";
import { UserRole } from "./UserRole";

@ObjectType()
@Entity()
export class User extends CoreEntity {

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  phoneNumber!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ nullable: true })
  nickname: string

  @Field()
  @Column({ nullable: true })
  fullName: string;
  
  @Field()
  @Column({ nullable: true })
  gender: string;

  @Field()
  @Column({ nullable: true })
  dateOfBirth: Date;

  @Field()
  @Column({ nullable: true })
  address: string;

  @Field()
  @Column({ nullable: true })
  avatar: string;

  @Field()
  @Column({ default: "customer" })
  roleId!: string;

  @Field(_return => UserRole)
  @ManyToOne(() => UserRole, (role) => role.users)
  role: UserRole;

  @OneToMany(()=> Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Farm, (farm) => farm.owner)
  farms: Farm[];

  @Field()
  @Column({ default: 1 })
  status: number;

}
