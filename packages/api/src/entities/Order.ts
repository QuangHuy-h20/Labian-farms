import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  // PrimaryColumn,
} from "typeorm";
import { CoreEntity } from "./CoreEntity";
import { Farm } from "./Farm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

export enum OrderStatus {
  PROCESSING = "processing",
  DELIVERY = "delivery",
  RECEIVED = "received",
  CANCELLED = "cancelled",
}

@Entity()
@ObjectType()
export class Order extends CoreEntity {

  @ManyToOne((_to) => User, (user) => user.orders)
  user!: User;

  @ManyToOne((_to) => Farm, (farm) => farm.orders)
  farm!: Farm;

  @Field()
  @Column()
  customerId!: number;

  @Field((_return) => User)
  @ManyToOne(() => User, (customer) => customer.orders)
  customer: User;

  @OneToMany(() => OrderItem, (item) => item.orderId)
  orderItems: Promise<OrderItem[]>;

  @Field()
  @Column()
  delivery_fee: number

  @Field()
  @Column()
  total: number;

  @Field()
  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: string;
}
