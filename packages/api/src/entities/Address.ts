import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from "./CoreEntity";
import { User } from './User'

@ObjectType()
@Entity()
export class Address extends CoreEntity {

	@Field()
	@Column()
	name!: string

	@Field()
	@Column()
	phone!: string

	@Field()
	@Column()
	email!: string

	@Field()
	@Column()
	address!: string

	@Field()
	@Column()
	userId!: number;

	@Field(_return => User)
	@ManyToOne(() => User, user => user.addresses)
	user: User
}