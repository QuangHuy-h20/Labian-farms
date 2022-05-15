import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CoreEntity } from "./CoreEntity";
import { Tour } from "./Tour";
import { User } from "./User";

@Entity()
@ObjectType()
export class ApplyTour extends CoreEntity {
  @PrimaryColumn()
  tourId!: number;

  @PrimaryColumn()
  customerId!: number;

  @ManyToOne((_to) => Tour, (tour) => tour.applyTour)
  @JoinColumn({ name: "tourId" })
  tour!: Promise<Tour>;

  @ManyToOne((_to) => User, (customer) => customer.applyTour)
  @JoinColumn({ name: "customerId" })
  customer!: Promise<User>;

  @Field()
  @Column({ default: 0 })
  active: number;
}
