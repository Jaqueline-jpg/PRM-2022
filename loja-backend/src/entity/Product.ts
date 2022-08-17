import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Brand} from "./Brand";


@Entity()
export class Product extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column( {nullable: false, length: 50})
    name: string;

    @Column('text', {nullable: true})
    description: string;

    @Column({nullable: false})
    price: number;

    @Column( {nullable: false, length: 1})
    active: string;

    @ManyToOne(() => Category, {eager: true, nullable: false} )
    category: Category;

    @ManyToOne(() => Brand, {eager: true, nullable: true} )
    brand: Brand;

    @CreateDateColumn()
    createdAT: Date;

    @UpdateDateColumn()
    updatedAT: Date;
}