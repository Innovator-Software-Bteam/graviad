import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn, PrimaryGeneratedColumn, RelationId
} from "typeorm";
import {User} from "@app/modules/user";
import {ProductMediaFromSpline, ProductThumbnail2D} from "@app/modules/product/entities/productMedia.entity";
import {Merchant} from "@app/modules/merchant";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: true, name: 'price'})
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

    @OneToOne(() => ProductThumbnail2D, {cascade: true})
    @JoinColumn({name: 'thumbnail_id'})
    thumbnail2D: ProductThumbnail2D;

    @RelationId((product: Product) => product.thumbnail2D)
    thumbnail2DId: number;

    @Column({type: 'uuid', nullable: false, name: 'merchant_id'})
    merchantId: string;

    @ManyToOne(() => Merchant, merchant => merchant.products)
    @JoinColumn({name: 'merchant_id'})
    merchant: Merchant;

    @OneToMany(() => ProductFeature, ProductFeature => ProductFeature.product, {cascade: true})
    features: ProductFeature[];

    @RelationId((product: Product) => product.features)
    featureIds: number[];

    @OneToOne(() => ProductMediaFromSpline, ProductMediaFromSpline => ProductMediaFromSpline.product, {cascade: true})
    mediaFromSpline: ProductMediaFromSpline;

    @ManyToMany(() => User, user => user.likedProducts, {cascade: true})
    @JoinTable({
        name: 'users_like_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    likedBy: User[];

    @RelationId((product: Product) => product.likedBy)
    likedByIds: string[];
}

@Entity('product_features')
export class ProductFeature {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;

    //Column name string
    @Column({type: 'varchar', nullable: false, name: 'name'})
    name: string;

    @Column({type: 'varchar', nullable: false, name: 'description'})
    description: string;

    @ManyToOne(() => Product, product => product.features)
    @JoinColumn({name: 'product_id'})
    product: Product;

    @RelationId((feature: ProductFeature) => feature.product)
    productId: number;
}
