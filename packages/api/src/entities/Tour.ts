import { Field, ObjectType } from "type-graphql";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany
} from "typeorm";
import { ApplyTour } from "./ApplyTour";
import { CoreEntity } from "./CoreEntity";
import { Farm } from "./Farm";

export enum TourStatus {
  OPEN = "open",
  CLOSED = "closed",
}
@Entity()
@ObjectType()
export class Tour extends CoreEntity {
  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ unique: true })
  slug!: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ default: new Date() })
  startDate?: Date;

  @Field()
  @Column({ default: new Date() })
  endDate?: Date;

  @Field()
  @Column()
  slot: number;

  @Field()
  @Column({ type: "enum", enum: TourStatus, default: TourStatus.OPEN })
  status: string;

  @Field()
  @Column()
  farmId!: number;

  @Field((_return) => Farm)
  @ManyToOne(() => Farm, (farm) => farm.tours)
  farm: Farm;

  @OneToMany(() => ApplyTour, apply => apply.tour)
  applyTour: Promise<ApplyTour[]>
}
