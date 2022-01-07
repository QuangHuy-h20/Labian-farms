import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Farm } from "./Farm";
import { UserRole } from "./UserRole";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

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
  fullName: string;

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

  @Field()
  @ManyToOne(() => UserRole, (role) => role.users)
  role: UserRole;

  @OneToMany(() => Farm, (farm) => farm.user)
  farms: Farm[];

  @Field()
  @Column({ default: 1 })
  status: number;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
