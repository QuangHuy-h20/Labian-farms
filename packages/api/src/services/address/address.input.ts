import { Field, InputType } from "type-graphql";


@InputType()
export class AddressInput {

	@Field()
	fullName: string

	@Field()
	phone: string

	@Field()
	email: string

	@Field()
	address: string

}
@InputType()
export class UpdateAddressInput extends AddressInput {
	fullName: string;
	phone: string;
	email: string;
	address: string;

	@Field()
	id: string
}
