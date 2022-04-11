import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { Address } from "./Address";
import { CoreEntity } from "./CoreEntity";
import { Farm } from "./Farm";
import { UserRole } from "./UserRole";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

@ObjectType()
@Entity()
export class User extends CoreEntity {

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  phone!: string;

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: "" })
  nickname?: string

  @Field({ nullable: true })
  @Column({ nullable: true, default: "" })
  fullName?: string;

  @Field({ nullable: true })
  @Column({ type: "enum", enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Field({ nullable: true })
  @Column({ nullable: true, default: new Date() })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: "" })
  address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: "" })
  avatar?: string;

  @Field()
  @Column({ default: "customer" })
  roleId!: string;

  @Field(_return => UserRole)
  @ManyToOne(() => UserRole, (role) => role.users)
  role: UserRole;

  @Field((_type) => [Address], { nullable: true })
  @OneToMany(() => Address, (address) => address.customer, { cascade: true })
  addresses: Address[];
  @RelationId((user: User) => user.addresses)
  userAddressIds: number[]

  @Field(_type => [Farm], { nullable: true })
  @OneToMany(() => Farm, (farm) => farm.owner, { cascade: true })
  farms: Farm[];
  @RelationId((user: User) => user.farms)
  userFarmIds: number[]

  @Field()
  @Column({ default: 1 })
  status: number;

  @Field()
  @Column({ default: false })
  isActiveEmail: boolean

}
