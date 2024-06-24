import {
    Column,
    Entity, JoinColumn, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn, RelationId, Unique
} from "typeorm";
import {TSocialLinkProvider} from "../merchant.interface";

import {Avatar} from "./property.entity";
import {Product} from "@app/modules/product/entities";
import {Template} from "@app/modules/template/entities";
import {User} from "@app/modules/user";

@Entity('merchants')
export class Merchant {
    @PrimaryColumn({type: 'uuid', nullable: false, name: 'id'})
    id: string;

    @Column({type: 'varchar', nullable: true, name: 'phone'})
    phone: string;

    @Column({type: 'varchar', nullable: true, name: 'address'})
    address: string;

    @Column({type: 'varchar', nullable: true, name: 'name', unique: true})
    name: string;

    @Column({type: 'varchar', nullable: true, name: 'email', unique: true})
    email: string;

    @Column({type: 'varchar', nullable: true, name: 'description'})
    description: string;

    @Column({type: 'varchar', nullable: true, name: 'slogan'})
    slogan: string;

    @Column({type: 'int', nullable: true, name: 'number_of_likes'})
    numberOfLikes: number;

    @Column({type: 'int', nullable: true, name: 'number_of_products'})
    numberOfProducts: number;

    @OneToMany(() => SocialLink, socialLink => socialLink.merchant, {cascade: true})
    socialLinks: SocialLink[];

    @OneToOne(() => Avatar, {cascade: true})
    @JoinColumn({name: 'avatar_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_merchants_avatar_id'})
    avatar: Avatar;

    @OneToMany(() => Product, product => product.merchant, {cascade: true})
    products: Product[];

    @ManyToMany(() => Product, product => product.likedBy)
    likedProducts: Product[];

    @RelationId((merchant: Merchant) => merchant.likedProducts)
    likedProductIds: number [];

    @RelationId((merchant: Merchant) => merchant.templates)
    templateIds: number[];

    @ManyToMany(() => User, user => user.followingMerchants, {cascade: true})
    @JoinTable({
        name: 'users_follow_merchants',
        joinColumn: {
            name: 'merchant_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'users_follow_merchants_merchant_id_fkey',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'users_follow_merchants_user_id_fkey'
        }
    })
    followers: User[];

    @RelationId((merchant: Merchant) => merchant.followers)
    followerIds: string[];

    @Column({type: 'timestamp', nullable: true, name: 'created_at'})
    createdAt: Date;

    @Column({type: 'timestamp', nullable: true, name: 'updated_at'})
    updatedAt: Date;

    @Column({
        type: 'int',
        nullable: true,
        name: 'using_template_profile_card_id',
        foreignKeyConstraintName: 'merchants_using_template_profile_card_id_fkey'
    })
    usingTemplateProfileCardId: number;

    @ManyToMany(() => Template, template => template, {cascade: true})
    @JoinTable({
        name: 'merchants_have_templates',
        joinColumn: {
            name: 'merchant_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'merchants_have_templates_merchant_id_fkey',
        },
        inverseJoinColumn: {
            name: 'template_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'merchants_have_templates_template_id_fkey'
        }
    })
    templates: Template[];
}

@Entity('social_links')
@Unique(['provider', 'merchantId'])
export class SocialLink {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: false, name: 'provider'})
    provider: TSocialLinkProvider;

    @Column({type: 'varchar', nullable: false, name: 'data'})
    data: string;

    @ManyToOne(() => Merchant, merchant => merchant.socialLinks)
    @JoinColumn({
        name: 'merchant_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_social_links_merchants'
    })
    merchant: Merchant;

    @Column({type: 'uuid', nullable: false, name: 'merchant_id', foreignKeyConstraintName: 'fk_social_links_merchants'})
    merchantId: string;
}




