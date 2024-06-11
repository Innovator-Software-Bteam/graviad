import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn, RelationId
} from "typeorm";
import {Merchant} from "@app/modules/user/entities";
import {ProductMediaFromSpline, ProductThumbnail2D} from "@app/modules/product/entities/productMedia.entity";

@Entity('products')
export class Product {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: false, name: 'price'})
    price: string;

    @Column({type: 'varchar', nullable: false, name: 'name'})
    name: string;

    @Column({type: 'varchar', nullable: true, name: 'description'})
    description: string;

    @Column({type: 'varchar', nullable: true, name: 'version'})
    version: string;

    @Column({type: 'varchar', nullable: true, name: 'link'})
    link: string;

    @Column({type: 'varchar', nullable: true, name: 'brief'})
    brief: string;

    @Column({type: 'date', nullable: true, name: 'date_release'})
    dateRelease: Date;

    @Column({type: 'varchar', nullable: true, name: 'highlight_label'})
    highlightLabel: string;

    @Column({type: 'int', nullable: true, name: 'number_of_likes'})
    numberOfLikes: number;

    @OneToOne(() => ProductThumbnail2D, thumbnail2D => thumbnail2D.product)
    thumbnail2D: ProductThumbnail2D;

    @Column({type: 'int', nullable: false, name: 'merchant_id'})
    merchantId: number;

    // Product belongs to a merchant
    @ManyToOne(() => Merchant, merchant => merchant.products)
    @JoinColumn({name: 'merchant_id'})
    merchant: Merchant;

    // ProductPage has many product_features
    @OneToMany(() => ProductFeature, ProductFeature => ProductFeature.product)
    features: ProductFeature[];

    @OneToOne(() => ProductMediaFromSpline, ProductMediaFromSpline => ProductMediaFromSpline.product)
    mediaFromSpline: ProductMediaFromSpline;

    @ManyToMany(() => Merchant, merchant => merchant.likedProducts, {cascade: true})
    @JoinTable({
        name: 'merchant_likes_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'merchant_id',
            referencedColumnName: 'id'
        }
    })
    likedBy: Merchant[];

    @RelationId((product: Product) => product.likedBy)
    likedByIds: string [];
}

@Entity('product_features')
export class ProductFeature {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    //Column name string
    @Column({type: 'varchar', nullable: false, name: 'name'})
    name: string;

    @Column({type: 'varchar', nullable: false, name: 'description'})
    description: string;


    @ManyToOne(() => Product, product => product.features)
    @JoinColumn({name: 'product_id'})
    product: Product;
}
