import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {Product} from "@app/modules/product/entities/product.entity";

@Entity('product_thumbnail_2d')
export class ProductThumbnail2D {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: false, name: 'alt_texts', array: true})
    altTexts: string[];

    @Column({type: 'bytea', nullable: false, name: 'data'})
    data: any;

    @OneToOne(() => Product, product => product.thumbnail2D)
    @JoinColumn({name: 'product_id'})
    product: Product;
}

@Entity('product_media_from_spline')
export class ProductMediaFromSpline {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    @Column({type: 'text', nullable: false, name: 'data'})
    data: any;

    @OneToOne(() => Product, product => product.mediaFromSpline)
    @JoinColumn({name: 'product_id'})
    product: Product;

}