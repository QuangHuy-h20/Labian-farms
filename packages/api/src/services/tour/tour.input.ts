import { TourStatus } from "../../entities/Tour";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateTourInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field()
  slot: number;

  @Field(_return => TourStatus)
  status: TourStatus;
}

@InputType()
export class UpdateTourInput extends CreateTourInput{

  @Field((_type) => ID)
  id: number
}