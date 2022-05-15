import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
@ObjectType()
export class OrderItem extends BaseEntity {
  @PrimaryColumn()
  orderId!: number;

  @PrimaryColumn()
  productId!: number;

  @ManyToOne((_to) => Product, (product) => product.orderItems)
  @JoinColumn({ name: "productId" })
  product!: Promise<Product>;

  @ManyToOne((_to) => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId" })
  order!: Promise<Order>;

  @Field()
  @Column()
  qty: number;

  @Field()
  @Column()
  subTotal: number
}
