import { TourStatus } from "../../entities/Tour";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTourInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  slot: number;

  @Field(_return => TourStatus)
  status: TourStatus;
}

@InputType()
export class UpdateTourInput extends CreateTourInput{

  @Field()
  id: string
}