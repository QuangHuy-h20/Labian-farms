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

  @Field({ nullable: true })
  @Column({ nullable: true, default: new Date() })
  startDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: new Date() })
  endDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image1: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image2: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image3: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image4: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image5: string;

  @Field()
  @Column()
  slot: number;

  @Field()
  @Column({ default: 0 })
  numberOfVisitor!: number

  @Field()
  applyTourStatus!: number

  @Field()
  @Column({ default: false })
  isActive: boolean;

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
