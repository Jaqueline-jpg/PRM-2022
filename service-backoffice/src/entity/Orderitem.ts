import { Product } from './Product';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Brand} from "./Brand";
import { Order } from "./Order";


@Entity()
export class Orderitem extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, {eager: true, nullable: false} )
    order: Order;

    @ManyToOne(() => Product, {eager: true, nullable: true} )
    product: Product;

    @Column({nullable: false})
    amount: number;

    @Column({nullable: false})
    value: number;
}