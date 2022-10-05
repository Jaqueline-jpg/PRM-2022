import { Customer } from './Customer';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Brand} from "./Brand";


@Entity()
export class Order extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, {eager: true, nullable: false} )
    customer: Customer;

    @Column({nullable: false})
    orderDate: Date;

    @Column({nullable: true})
    invoicedDate: Date;

    @Column({nullable: true})
    canceledDate: Date;
}