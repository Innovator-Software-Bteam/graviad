import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {Product} from "@app/modules/product/entities/product.entity";

@Entity('product_thumbnail_2d')
export class ProductThumbnail2D {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: true, name: 'alt_texts', array: true})
    altTexts: string[];

    @Column({type: 'bytea', nullable: false, name: 'data'})
    data: any;
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

    @RelationId((productMediaFromSpline: ProductMediaFromSpline) => productMediaFromSpline.product)
    productId: number;

}